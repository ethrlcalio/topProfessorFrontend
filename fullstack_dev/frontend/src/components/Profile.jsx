import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Profile = ({id}) => {
  let studentID = id;
  const [studentData, setStudentData] = useState(null);
  const [professorCode, setProfessorCode] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://topprofessor.onrender.com/api/student-data/?studentID=${studentID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Professor not found');
        }
        return response.json();
      })
      .then(data => setStudentData(data))
      .catch(error => console.error('Error fetching professor data:', error));
  };

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
          {studentData ? `${studentData.firstName} ${studentData.lastName}` : ''}
        </h2>
      </div>
      <div className="text-left m-2 -mt-1 p-2">
        <div>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            ID Number: <span className="font-normal">{studentData ? studentData.studentID : ''}</span>
          </h2>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            Division: <span className="font-normal">{studentData ? studentData.division : ''}</span>
          </h2>
          <h2 className="font-montserrat text-sm text-jet py-1 font-bold">
            Program: <span className="font-normal">{studentData ? studentData.program : ''}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
