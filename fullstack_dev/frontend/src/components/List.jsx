import React, {useState, useContext, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const List = () => {
  const [professors, setProfessors] = useState(null);
  const [classObj, setClassObj] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [isClassDone, setIsClassDone] = useState(false);
  const [isDataDone, setIsDataDone] = useState(false);
  const [isCalculateDone, setIsCalculateDone] = useState(false);
  const [isRatingDone, setIsRatingDone] = useState(false);

  useEffect(() =>{
    if(!isCalculateDone){
      const fetchProfessors = async() => {
        const response = await fetch(`https://topprofessor.onrender.com/api/professors/`);
        const data = await response.json();
        setProfessors(data);
      }
      fetchProfessors();
    }
  }, []);

   useEffect(() => {
    if(professors && professors.length > 0){
      const fetchData = async () => {
        const dataArray = [];
        await Promise.all(professors.map(async (professor) => {
          const response = await fetch(`https://topprofessor.onrender.com/api/classes/`);
          let data = await response.json();
          const filteredData  = data.filter(class_obj => class_obj.professorID == professor.professorID);
          dataArray.push(filteredData);
        }));
        setClassObj(dataArray); 
        setIsClassDone(true);
      }
      fetchData();
    }
  }, [professors]);

  useEffect(() => {
    if(classObj){
      const fetchRatings = async () => {
        const dataArray = await Promise.all(classObj.map(async (classArray) => {
          const professorRatings = await Promise.all(classArray.map(async (class_obj) => {
            const response = await fetch(`https://topprofessor.onrender.com/api/rating-data/?classID=${class_obj.classID}`);
            return await response.json();
          }));
          return professorRatings;
        }));
        setRatingData(dataArray);
        setIsDataDone(true);
      }
      fetchRatings();
    }
  }, [isClassDone]);

  useEffect(() => {
    if(ratingData && ratingData.length > 0){
      const calculateRatings = async () => {
        if(ratingData && ratingData.length > 0){
          const dataArray = await Promise.all(ratingData.map(async (classArray) => {
            let totalRating = 0;
            let numRatings = 0;
            const flatArray = classArray.flat()
            await flatArray.map(async (rating) => {
              totalRating += parseFloat(rating.rating1);
              numRatings++;
            })
            const aveRating = numRatings > 0 ? totalRating / numRatings : 0;
            return aveRating !== 0 ? parseFloat(aveRating.toFixed(2)) : "-";
          }));
          setRatings(dataArray);
          setIsCalculateDone(true);
        }
      }
      calculateRatings();
    }
  }, [isDataDone]);
  
  useEffect(() => {
    if(ratings && ratings.length > 0){
      const injectData = async () => {
        if(ratings && ratings.length > 0){
          const professorRatings = professors.map((professor,index) => {
            return{
              ...professor,
              overallRating: ratings[index]
            };
          });
          setProfessors(professorRatings);
          setIsRatingDone(true);
        }
      }
      injectData();
    }
  }, [isCalculateDone])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm/4 font-light border rounded-lg overflow-hidden">
              <thead className="font-montserrat text-anti-flash bg-penn-blue">
                <tr>
                  <th scope="col" className="w-3/5 px-4 py-3">
                    Faculty Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Department
                  </th>
                  <th scope="col" className="w-1/12 px-4 py-3 text-center">
                    Overall Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  isRatingDone && professors.map((professorEntry, index) => (
                    <TableRow
                      key={index}
                      facultyName={professorEntry.firstName + " " + professorEntry.lastName}
                      department={professorEntry.program}
                      overallRating={professorEntry.overallRating}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ facultyName, department, overallRating }) => {
  return (
    <tr className="border-b border-cursor-pointer">
      <td className="flex flex-row gap-2 items-center font-montserrat whitespace-nowrap px-4 py-3">
        <div><FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 text-penn-blue" /></div>
        <div>{facultyName}</div>
      </td>
      <td className="font-montserrat whitespace-nowrap px-4 py-3">{department}</td>
      <td className="font-montserrat whitespace-nowrap px-4 py-3 text-center">{overallRating}</td>
    </tr>
  );
};

export default List;
