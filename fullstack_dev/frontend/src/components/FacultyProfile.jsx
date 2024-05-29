import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const FacultyProfile = ({id, ratingCount, commentCount}) => {
  const professorID = id;
  const ratings = ratingCount ? ratingCount : 0;
  const comments = commentCount ? commentCount : 0;
  const [professorData, setProfessorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await  fetch(`https://topprofessor.onrender.com/api/professor-data/?professorID=${professorID}`);
      const data = await response.json();
      setProfessorData(data);
    };
    fetchData();
  },[]);

  return (
    <div className="flex flex-col">
      <div className="bg-penn-blue w-full flex justify-center">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-anti-flash h-28 w-28 m-4"
        />
      </div>
      <div className="flex flex-col align-center m-2 items-center">
        <h2 className="font-montserrat text-xl text-jet font-semibold pt-2">
        {professorData ? `${professorData.firstName} ${professorData.lastName}` : ""}
        </h2>
      </div>
      <div className=" flex flex-col text-left m-2 -mt-1 p-2 gap-6">
        <div>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            ID Number: <span className="font-normal">{professorData ? `${professorData.professorCode}` : ""}</span>
          </h2>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            School: <span className="font-normal">{professorData ? `${professorData.division}` : ""}</span>
          </h2>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            Department: <span className="font-normal">{professorData ? `${professorData.program}` : ""}</span>
          </h2>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            Position:{" "}
            <span className="font-normal">{professorData ? `${professorData.position}` : ""}</span>
          </h2>
        </div>
        <div className="flex flex-row justify-center gap-2 w-full px-16 font-montserrat">
            <p className="font-normal text-xs">{`${ratings}`} ratings</p>
            <p className="font-normal text-xs">:</p>
            <p className="font-normal text-xs">{professorData ? `${comments}` : ""} comments</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
