import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';

const Notifications = () => {
  const [msg, setMsg] = useState("");
  const [post, setPost] = useState([]);
  // const [current,setCurrent]=useState([]);
  useEffect(() =>{
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:3003/note');
        setPost(res.data);
        // setCurrent(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error); 
      }
    };
    fetch();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msg.trim()) {
      try {
        const res = await axios.post('http://localhost:3003/note', {
          msg: msg
        });
        // console.log(res);
        const newNotification = res.data; 
        // setCurrent(prevPost => [...prevPost, newNotification]); 
        setPost(prevPost => [...prevPost, newNotification]);
        setMsg(''); 
      } catch (error) {
        console.error(error);
      } finally {
        setMsg('')
      }
    }
  };
  
  const handledelete=async (id)=>{
    const data=post.filter((item)=>item._id!==id);
    setPost(data)
    try {
      const res=await axios.delete(`http://localhost:3003/note/delete/${id}`);
      // console.log("deleteddd!!!")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex justify-center items-center flex-col text-xl w-full h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold mb-4'>Notifications</h1>
      
      <div className='text-xl mt-5 flex justify-center items-center flex-col w-full'>
        <h2 className='text-2xl font-semibold mb-4'>Post a Notification</h2>
        <form onSubmit={handleSubmit} className='w-full max-w-lg'>
          <textarea 
            className='bg-gray-700 text-white h-40 w-full p-3 rounded-md shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={msg} 
            onChange={(e) => setMsg(e.target.value)} 
            placeholder='Write your notification here...'
          />
          <button 
            type='submit' 
            className='mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-300'>
            Post
          </button>
        </form>
      </div>
      
      <div className='border-4 border-gray-300 rounded-lg w-3/6 h-96 mt-6 p-4 bg-white shadow-lg'>
        <div className='w-full h-full p-2 overflow-y-auto'>
          <h2 className='bg-gray-300 text-center text-2xl font-semibold p-3 rounded-md'>Notifications</h2>
          {post.length > 0 ? (
            <ul className='mt-4'>
              {post.map((data, index) => (
                <div key={data._id} className='flex justify-between items-center gap-2'>
                  <li  className='border-b py-2 text-xl text-gray-700'>
                    {index + 1}. {data.msg}
                  </li>
                  <div className="flex-shrink-0">
                    <FaTrash
                      className="text-red-500 cursor-pointer transition-transform transform duration-300 hover:scale-110"
                      size={23} // Fixed size for the icon
                      onClick={() => handledelete(data._id)}
                    />
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <h2 className='text-center text-gray-500 mt-6'>No Notifications</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;