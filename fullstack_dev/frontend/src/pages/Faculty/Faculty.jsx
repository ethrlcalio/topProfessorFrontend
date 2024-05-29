import React from "react";
import List from '../../components/List'
import Profile from '../../components/Profile'
import { useParams } from 'react-router-dom';


const Faculty = () => {
  const {id} = useParams();
  return (
    <div className="bg-anti-flash min-h-full">
      <div id="content" className="w-full flex justify-center items-center pt-12">
        <div className="w-2/3 flex flex-col-2 gap-8">
            <div className="w-2/3 h-fit bg-white rounded-xl overflow-x-hidden shadow-md">
              <List/>
            </div>
          <div className="w-1/3 h-min bg-white rounded-xl overflow-x-hidden shadow-md">
              <Profile id={id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
