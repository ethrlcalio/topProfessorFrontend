import React from 'react'

const MajorRating = ({rating}) => {
  const value =  !rating || isNaN(rating) ? "-" : rating;
  return (
    <div className="relative flex flex-col gap-2 justify-center items-center">
        <div className="mx-8">
          <div className={`w-24 h-24 flex items-center justify-center bg-mustard rounded-xl`}>
              <p className={`font-montserrat font-bold text-penn-blue text-4xl`}>
                  {value}
              </p>
          </div>
        </div>
        <div className="w-2/3">
          <p className="font-montserrat font-bold text-penn-blue text-2xl/6 text-center">Overall Rating</p>
        </div>
    </div>
  )
}

export default MajorRating