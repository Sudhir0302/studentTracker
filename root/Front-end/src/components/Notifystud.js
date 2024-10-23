import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Notifystud = () => {

  const [post, setPost] = useState([]);
  
  useEffect(() =>{
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:3003/note');
        setPost(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error); 
      }
    };
    fetch();
  },[])
  
  return (
    <div className='flex justify-center items-center flex-col text-xl w-full h-screen bg-gray-100'>
      <div className='border-4 border-gray-300 rounded-lg w-3/6 h-96 mt-6 p-4 bg-white shadow-lg'>
        <div className='w-full h-full p-2 overflow-y-auto'>
          <h2 className='bg-gray-300 text-center text-2xl font-semibold p-3 rounded-md'>Notifications</h2>
          {post.length > 0 ? (
            <ul className='mt-4'>
              {post.map((data, index) => (
                <li key={data._id} className='border-b py-2 text-lg text-gray-700'>
                  {index + 1}. {data.msg}
                </li>
              ))}
            </ul>
          ) : (
            <h2 className='text-center text-gray-500 mt-6'>No Notifications</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifystud 