import React from 'react'
import Table from '../../components/Table'
import Profile from '../../components/Profile'
import { useParams } from 'react-router-dom';

const Home = () => {
  const {id} = useParams();
  
  return (
    <div className="bg-anti-flash min-h-full">
        <div id="content" className="w-full flex justify-center items-center pt-12">
          <div className="w-2/3 flex flex-col-2 gap-8">
            <div className="w-2/3 h-min bg-white rounded-xl overflow-x-hidden shadow-md">
              <Table id={id}/>
            </div>
            <div className="w-1/3 h-min bg-white rounded-xl overflow-x-hidden shadow-md">
              <Profile id={id}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home