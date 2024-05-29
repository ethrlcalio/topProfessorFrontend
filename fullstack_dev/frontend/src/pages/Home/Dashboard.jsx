import React, {useState} from 'react'
import Profile from '../../components/Profile'
import ListV2 from '../../components/ListV2';
import BarGraph from '../../components/BarGraph';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Overall Rating");

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
  return (
    <div className="bg-anti-flash min-h-full">
        <div id="content" className="w-full flex justify-center items-center pt-12">
          <div className="w-3/4 flex flex-col-2 gap-4">
            <div className="w-3/5 h-min flex flex-col gap-2 bg-white rounded-xl overflow-x-hidden shadow-md px-8 py-6">
                <p className="font-montserrat text-penn-blue text-lg font-bold">Faculty Leaderboard</p>
                <ListV2/>
            </div>
            <div className="w-2/5 h-max flex flex-col justify-center items-center">
                <div className="w-full flex flex-col gap-2 bg-white rounded-xl overflow-x-hidden shadow-md px-8 py-6">
                    <p className="font-montserrat text-penn-blue text-lg font-bold">Average Department Ratings
                    </p>
                    <div className="flex flex-wrap">
                        {["Overall Rating", "Teaching Proficiency", "Availability & Responsiveness", "Attendance"].map(option => (
                            <button
                                key={option}
                                className={`px-3 py-2 text-xs font-montserrat rounded-full bg-gray-200 ${selectedOption === option ? 'bg-mustard text-penn-blue font-bold' : 'hover:outline hover:outline-mustard hover:outline-1 hover:text-penn-blue'}`}
                                onClick={() => handleOptionChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <BarGraph type={selectedOption}/>
                </div>
            </div>
            {/*<div className="w-1/3 h-min bg-white rounded-xl overflow-x-hidden shadow-md">
              <Profile id={id}/>
  </div>*/}
          </div>
        </div>
    </div>
  )
}

export default Dashboard