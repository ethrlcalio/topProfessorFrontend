import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';

const EmptyBox = ({ratingKey, comment, commenter, professorID}) => {
  const commentVal = comment;
  const [student, setStudent] = useState(null);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem("role")));
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://topprofessor.onrender.com/api/student-data/?studentID=${commenter}`)
      const data = await response.json();
      setStudent(data);
    }
    fetchData();
  }, [])

  const handleRowClick = (ratingID) => async () => {
    if(ratingID){
        if(confirm("This will delete the comment & rating of the user")){
          try {
            const response = await fetch(`https://topprofessor.onrender.com/api/rating/${ratingID}/`, {
              method: 'DELETE',
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data.message); // Log success message
            } else if (response.status === 404) {
              const errorData = await response.json();
              console.error(errorData.error); // Log error message
            } else {
              console.error('Failed to delete rating'); // Log generic failure message
            }
          } catch (error) {
            console.error('An error occurred:', error); // Log any unexpected errors
          }
          window.location.href = `/professor/admin/${professorID}`
        };
    }
}
  return (
    <div className="relative flex flex-row items-center gap-2 justify-end bg-white p-4 rounded-lg font-montserrat">
      {role == "admin" && <div className='absolute top-0 right-0 text-stone-400 mx-3 my-2 cursor-pointer hover:text-red-300' onClick={handleRowClick(ratingKey)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>}
      <div className="absolute inset-y-0 left-0 w-1/12"> {/* Width for user icon */}
        <div className="h-full w-full bg-penn-blue flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-anti-flash" />
        </div>
      </div>
      <div className="w-11/12 flex flex-col gap-4"> {/* Width for comment */}
        {/* Space for text, you can add any text or children components here */}
        <div>
          <p className="text-black text-base/5 font-bold">{student ? `${student.firstName} ${student.lastName}` : ""}</p>
          <p className="text-black text-xs/3 italic">{student ? `${student.program}` : ""}</p>
        </div>
        <p className="text-black text-sm">{`${commentVal}`}</p>
      </div>
    </div>
  );
}

export default EmptyBox;
