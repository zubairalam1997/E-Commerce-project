import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full max-w-screen-md mx-auto flex mt-6 flex-col items-center justify-start h-screen'>
  <div className='text-center mt-4'>
    <div className='font-bold'>
      No data available
    </div>
    <div className="mt-4">
      <button onClick={()=>navigate(-1)} className="px-4 py-2 bg-blue-500 font-bold text-white rounded flex items-center">
        Go back
        <FaArrowLeft className="ml-2 animate-bounce" />
      </button>
    </div>
  </div>
</div>
    
  );
};

export default YourComponent;
