import React, {useContext,useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import FacultyProfile from "../../components/FacultyProfile";
import MajorRating from "../../components/MajorRating";
import MinorRating from "../../components/MinorRating";
import AddButton from "../../components/AddButton";
import EmptyBox from "../../components/EmptyBox";
import {MetricContext} from '../../context/MetricContext'

const ProfessorProfile = () => {
  const {id, classCode} = useParams();
  const [classObj, setClassObj] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [ratings, setRatings] = useState({
    overallRating: null,
    teachingProficiency: null,
    availabilityResponsiveness: null,
    attendance: null,
  });
  const [ratingCount, setRatingCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [flatRatings, setFlatRatings] = useState(null);
  const [commentArray, setCommentArray] = useState(null);
  const [isDataDone, setIsDataDone] = useState(false);
  const [isRatingsDone, setIsRatingsDone] = useState(false);
  const [isCalculateDone, setIsCalculateDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    console.log(isHidden);
    const fetchData = async () => {
      const response = await fetch(`https://topprofessor.onrender.com/api/classes/`);
      let data = await response.json();
      const filteredData  = data.filter(class_obj => class_obj.professorID == id);
      setClassObj(filteredData);
      setIsDataDone(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if(classObj && classObj.length > 0){
      const fetchRatings = async () => {
        const dataArray = [];
        await Promise.all(classObj.map(async (class_obj) => {
          const response = await fetch(`https://topprofessor.onrender.com/api/rating-data/?classID=${class_obj.classID}`);
          let data = await response.json();
          dataArray.push(data);
        }));
        setRatingData(dataArray);
        setIsRatingsDone(true);
      }
      fetchRatings();
    }
  }, [isDataDone]);

  useEffect(() => {
    if(ratingData){
      const calculateRatings = async () => {
        const flattenedData = ratingData.flat();
        const sum1 = flattenedData.reduce((data, obj) => data + parseFloat(obj.rating1), 0);
        const ave1 = parseFloat((sum1 / flattenedData.length).toFixed(2));
        const sum2 = flattenedData.reduce((data, obj) => data + parseFloat(obj.rating2), 0);
        const ave2 = parseFloat((sum2 / flattenedData.length).toFixed(2));
        const sum3 = flattenedData.reduce((data, obj) => data + parseFloat(obj.rating3), 0);
        const ave3 = parseFloat((sum3 / flattenedData.length).toFixed(2));
        const sum4 = flattenedData.reduce((data, obj) => data + parseFloat(obj.rating4), 0);
        const ave4 = parseFloat((sum4 / flattenedData.length).toFixed(2));
        setRatings((ratings) => ({
          ...ratings,
          overallRating: ave1,
          teachingProficiency: ave2,
          availabilityResponsiveness: ave3,
          attendance: ave4,
        }));
      }
      calculateRatings();
      setIsCalculateDone();
    }
  }, [isRatingsDone])

  useEffect(() => {
    if(ratingData){
      const flatArray = ratingData.flat();
      setFlatRatings(flatArray);
      setRatingCount(flatArray.length);
      const filteredArray = flatArray.filter((rating) => rating.classID == classCode && rating.studentID == JSON.parse(localStorage.getItem('id')));
      if(filteredArray && filteredArray.length > 0){
        setIsHidden(true);
      }
      const commentArray = flatArray.filter((rating) => rating.comments);
      setCommentArray(commentArray);
      setCommentCount(commentArray.length);
    }
  }, [isCalculateDone]);

  const {metrics, setMetrics} = useContext(MetricContext);
  
  return (
    <div className="bg-anti-flash min-h-full">
      <div id="content" className="w-full flex justify-center items-center pt-12">
        <div className="w-2/3 flex flex-col-2 gap-8">
          <div className="w-2/3 h-full flex flex-col gap-4">
            {/* First Row */}
            <div className="w-full flex flex-row gap-4">
              <div className="h-full bg-white rounded-xl shadow-md py-6">
                {ratings && <MajorRating rating={ratings.overallRating}/>}
              </div>
              <div className="grow grow-y flex flex-col justify-center bg-white rounded-xl shadow-md">
                {ratings && metrics.map((metricEntry, index) =>(
                  <MinorRating key={index} metric={metricEntry} rating={ratings}/>
                ))}
              </div>
            </div>
            {/* Second Row */}
            <div className="flex flex-col gap-4">
              <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
                {!isHidden && <AddButton classID={classCode} profID={id}/>}
              </div>
              {isHidden && commentArray && commentArray.map((rating, index) => (
                <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
                  <EmptyBox 
                    key = {index}
                    ratingKey={rating.ratingID}
                    comment={rating.comments}
                    commenter={rating.studentID}
                    professorID={id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3 h-min bg-white rounded-xl overflow-x-hidden shadow-md">
            <FacultyProfile id={id} ratingCount={ratingCount} commentCount={commentCount}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorProfile;
