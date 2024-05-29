// Default.jsx

import React, {useEffect} from 'react'
import DefaultDisplay from '../../components/DefaultDisplay'

const Default = () => {
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("role")) == "professor"){
      alert('Professors do not have access! Only students and admins');
      localStorage.removeItem("role");
    }
  }, []);
  return (
    <div className="bg-anti-flash min-h-full flex justify-center items-center">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between gap-6 "> {/* Add gap */}
          <div className="w-1/3 rounded-xl overflow-hidden">
            {/* Pass 'star' as icon prop */}
            <DefaultDisplay icon="star" />
          </div>
          <div className="w-1/3 rounded-xl overflow-hidden">
            {/* Pass 'chalkboard' as icon prop */}
            <DefaultDisplay icon="chalkboard" />
          </div>
          <div className="w-1/3 rounded-xl overflow-hidden">
            {/* Pass 'user' as icon prop */}
            <DefaultDisplay icon="user" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Default
