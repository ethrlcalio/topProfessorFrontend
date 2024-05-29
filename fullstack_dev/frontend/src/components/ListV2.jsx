import React, {useState, useContext, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ListV2 = () => {
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
        data.forEach(datum => {
            switch(String(datum.division)){
                case "Accountancy":
                    datum.division =  'ACC';
                    break;
                case "Business & Management":
                    datum.division =  'B&M';
                    break;
                case "Engineering & Architecture":
                    datum.division =  'SEA';
                    break;
                case "Nursing":
                    datum.division =  'SON';
                    break;
                case "Education":
                    datum.division =  'SOE';
                    break;
                case "Arts & Sciences":
                    switch(String(datum.program)){
                        case "Natural Sciences & Mathematics":
                            datum.division =  "NSM";
                            break;
                        case "Social Sciences":
                            datum.division =  "SS";
                            break;
                        case "Humanities & Letters":
                            datum.division =  "HumLet";
                            break;
                        case "Computer Studies":
                            datum.division =  "CS";
                            break;
                        default:
                            datum.division =  "-";
                            break;
                    }
                default:
                    return "-";
                    break;
            }
        });
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
            let totalMinRating1 = 0;
            let totalMinRating2 = 0;
            let totalMinRating3 = 0;
            let numRatings = 0;
            const flatArray = classArray.flat()
            await flatArray.map(async (rating) => {
              totalRating += parseFloat(rating.rating1);
              totalMinRating1 += parseFloat(rating.rating2);
              totalMinRating2 += parseFloat(rating.rating3);
              totalMinRating3 += parseFloat(rating.rating4);
              numRatings++;
            })
            const aveRating = numRatings > 0 ? totalRating / numRatings : 0;
            const aveMinRating1 = numRatings > 0 ? totalMinRating1 / numRatings : 0;
            const aveMinRating2 = numRatings > 0 ? totalMinRating2 / numRatings : 0;
            const aveMinRating3 = numRatings > 0 ? totalMinRating3 / numRatings : 0;
            return {
                overallRating: aveRating !== 0 ? parseFloat(aveRating.toFixed(2)) : "-",
                rating2: aveMinRating1 !== 0 ? parseFloat(aveMinRating1.toFixed(2)) : "-",
                rating3: aveMinRating2 !== 0 ? parseFloat(aveMinRating2.toFixed(2)) : "-",
                rating4: aveMinRating3 !== 0 ? parseFloat(aveMinRating3.toFixed(2)) : "-",
            }
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
              overallRating: ratings[index].overallRating,
              rating2: ratings[index].rating2,
              rating3: ratings[index].rating3,
              rating4: ratings[index].rating4,
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
    <div className="flex flex-col border border-penn-blue rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-xs/4 font-light">
              <thead className="font-montserrat text-anti-flash bg-penn-blue">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    Faculty Name
                  </th>
                  <th scope="col" className="w-1/12 px-2 py-3">
                    Department
                  </th>
                  <th scope="col" className="w-1/12 px-2 py-3 text-center">
                    Overall Rating
                  </th>
                  <th scope="col" className="w-1/12 px-2 py-3 text-center">
                    Teaching Proficiency
                  </th>
                  <th scope="col" className="w-1/12 px-2 py-3 text-center">
                    Availability & Responsiveness
                  </th>
                  <th scope="col" className="w-1/12 px-2 py-3 text-center">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {
                  isRatingDone && professors.map((professorEntry) => (
                    <TableRow
                      key={professorEntry.professorID}
                      rowKey={professorEntry.professorID}
                      facultyName={professorEntry.firstName + " " + professorEntry.lastName}
                      department={professorEntry.division}
                      overallRating={professorEntry.overallRating}
                      rating2={professorEntry.rating2}
                      rating3={professorEntry.rating3}
                      rating4={professorEntry.rating4}
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

const TableRow = ({rowKey, facultyName, department, overallRating, rating2, rating3, rating4 }) => {
    const handleRowClick = (profID) => () => {
        if(profID){
            window.location.href = `/professor/admin/${profID}`
        }
    }
  return (
    <tr className="cursor-pointer" onClick={handleRowClick(rowKey)}>
      <td className="flex flex-row gap-2 items-center font-montserrat whitespace-nowrap px-2 py-3">
        <div><FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 text-penn-blue" /></div>
        <div>{facultyName}</div>
      </td>
      <td className="font-montserrat whitespace-nowrap px-2 py-3">{department}</td>
      <td className="font-montserrat whitespace-nowrap px-2 py-3 text-center">{overallRating}</td>
      <td className="font-montserrat whitespace-nowrap px-2 py-3 text-center">{rating2}</td>
      <td className="font-montserrat whitespace-nowrap px-2 py-3 text-center">{rating3}</td>
      <td className="font-montserrat whitespace-nowrap px-2 py-3 text-center">{rating4}</td>
    </tr>
  );
};

export default ListV2;
