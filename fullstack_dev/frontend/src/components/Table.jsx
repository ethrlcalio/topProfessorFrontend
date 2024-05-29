import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const Table = ({id}) => {
  let studentID = id;
  const [subjects, setSubjects] = useState(null);
  const [classObj, setClassObj] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`https://topprofessor.onrender.com/api/schedule-data/?studentID=${studentID}`);
    let data = await response.json();
    setSubjects(data);
  }

  const filterData = async () => {
    if(subjects && subjects.length > 0){
      const dataArray = [];
      await Promise.all(subjects.map(async (subject) => {
        const response = await fetch(`https://topprofessor.onrender.com/api/class-data/?classID=${subject.classID}`);
        const data = await response.json();
        dataArray.push(data);
      }));
      setClassObj(dataArray);
    }
  }
  const insertData = async () => {
    await Promise.all(classObj.map( async (class_obj) => {
      const response = await fetch(`https://topprofessor.onrender.com/api/professor-data/?professorID=${class_obj.professorID}`);
      const data = await response.json();
      class_obj.professorName = data.firstName + " " + data.lastName;
      
    }));
    await Promise.all(classObj.map( async (class_obj) => {
      const response = await fetch(`https://topprofessor.onrender.com/api/days-data/?classID=${class_obj.classID}`);
      const data = await response.json();
      const daysArray = data.map(obj => obj.day.slice(0,2));
      class_obj.days = daysArray.toString();
    }));
    setSchedule(classObj);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [subjects]);

  useEffect(() => {
    insertData();
  }, [classObj])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm/3 font-light">
              <thead className="font-montserrat text-anti-flash bg-penn-blue">
                <tr>
                  <th scope="col" className="w-1/12 px-4 py-3">
                    Class Code
                  </th>
                  <th scope="col" className="w-1/2 px-4 py-3">
                    Course
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Time Slot
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {
                  schedule && schedule.map((schedule_obj, index) => (
                    <TableRow key= {index}
                    id={schedule_obj.professorID}
                    classCode={schedule_obj.classID}
                    course={schedule_obj.className}
                    instructor={schedule_obj.professorName}
                    timeSlot={`${new Date(`01/01/2000 ${schedule_obj.startTime.slice(0, 5)}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    ${new Date(`01/01/2000 ${schedule_obj.endTime.slice(0, 5)}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                    ${schedule_obj.days}`}
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

const TableRow = ({ id, classCode, subjectCode, course, instructor, timeSlot }) => {
  return (
    <tr className="bg-neutral-100 hover:bg-gray-200 cursor-pointer text-sm/4" onClick={() => window.location.href = `/professor/${id}/${classCode}`}>
      <td className="font-montserrat whitespace-nowrap px-4 py-3">{classCode}</td>
      <td className="font-montserrat whitespace-nowrap px-4 py-3">
        <span>{course} <br /></span>
        <span className="font-montserrat text-xs/3 italic">{instructor}</span>
      </td>
      <td className="font-montserrat whitespace-nowrap px-4 py-3">{timeSlot}</td>
    </tr>
  );
};

export default Table;
