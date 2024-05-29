import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

const RatingModal = ({ isOpen, onClose, cID, pID }) => {
  const [formData, setFormData] = useState({
    classID: parseInt(cID),
    studentID: JSON.parse(localStorage.getItem('id')),
    teachingProficiency: '',
    availabilityResponsiveness: '',
    attendance: '',
    additionalComments: ''
  });
  const [csrfToken, setCsrfToken] = useState(null);

  const handleChange = (event, metric) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [metric]: metric === 'additionalComments' ? value : parseInt(value)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {additionalComments, ...formDataWithoutComments} = formData;
    const isNotEmpty = Object.values(formDataWithoutComments).some(value => value !== '');

    if(!isNotEmpty){
      return;
    }
    try{
      const response = await fetch(`https://topprofessor.onrender.com/api/save-rating-data/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          classID: formData.classID,
          studentID: formData.studentID,
          teachingProficiency: formData.teachingProficiency,
          availabilityResponsiveness: formData.availabilityResponsiveness,
          attendance: formData.attendance,
          additionalComments: formData.additionalComments
        })
      });
      console.log(pID, parseFloat(formData.classID))
      window.location.href = `/professor/${pID}/${parseFloat(formData.classID)}`
    }catch (error){
      console.error('Error:', error);
    }
    console.log('Form submitted with:', formData);
    onClose();
  };

  const renderStars = (metric) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <label key={i} className="mr-2 cursor-pointer">
          <input
            type="radio"
            name={metric}
            value={i}
            onChange={(e) => handleChange(e, metric)}
            checked={formData[metric] === i}
            className="hidden"
          />
          <FontAwesomeIcon icon={faStar} className={`text-penn-blue text-3xl ${formData[metric] >= i ? 'text-yellow-400' : 'text-gray-300'}`} />
        </label>
      );
    }
    return stars;
  };

  useEffect(() => {
    async function fetchCsrfToken(){
      const response = await fetch('https://topprofessor.onrender.com/csrf_token/');
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    }
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const reset = () => {
    setFormData({
      teachingProficiency: '',
      availabilityResponsiveness: '',
      attendance: '',
      additionalComments: ''
    })
  }

  return (
    <>
      {isOpen && (
        <div className="modal-overlay"> {/* Use a unique class name for overlay */}
          <div className="modal p-6 font-montserrat"> {/* Use a unique class name for modal */}
            <div className="modal-header flex justify-between items-center mb-4">
              <h2 className="text-penn-blue text-xl font-bold">Please rate your professor honestly.</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-jet hover:text-gray p-1"
                onClick={() => {
                  onClose();
                  reset();
                }}
              />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-4">
                <div>Teaching Proficiency:</div>
                <div className="grow">{renderStars('teachingProficiency')}</div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div>Availability & Responsiveness</div>
                <div className="grow">{renderStars('availabilityResponsiveness')}</div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div>Attendance:</div>
                <div className="grow">{renderStars('attendance')}</div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="additionalComments" className="block text-sm">Additional Comments:</label>
                <textarea id="additionalComments" name="additionalComments" rows="4" cols="50" value={formData.additionalComments} onChange={(e) => handleChange(e, 'additionalComments')} className="border rounded px-4 py-2 w-full text-sm"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-penn-blue text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-3 py-2 rounded-md text-md font-semibold">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingModal;
