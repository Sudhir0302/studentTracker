import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from 'axios';


const Attendance = () => {
  // States
  const [stud, setStud] = useState([]);
  const [filteredStud, setFilteredStud] = useState([]);
  const [class1, setClass1] = useState("");
  const [subject, setSubject] = useState("");
  const [add, setAdd] = useState("");
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [regno,setRegno]=useState("");
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/student');
        const modifiedData = response.data.map(student => {
          return {
            ...student,
            present: false, 
          };
        });
        // const sortedData = modifiedData.sort((a, b) => {
        //   return a.regno.localeCompare(b.regno); // Assuming regno is a string
        // });
        setStud(modifiedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error.message);
      }
    };
    fetchAttendanceData(); 
    console.log(stud);
  }, []);

  useEffect(() => {
   if (class1.trim()) {
      const filteredData = stud.filter(student => student.className.toLowerCase() === class1.toLowerCase());
      setFilteredStud(filteredData);
      setAbsentCount(filteredData.length);
      console.log(filteredData)
    }
  }, [class1]);

  function post(){
    if (stud.length > 0) {
      const attendanceData = stud
        .map(s => ({
          name: s.name,
          className: s.className,
          subject: subject,
          regno:s.regno,
          present: s.present !== undefined ? s.present : false,
          date: new Date().toISOString(),
        }))
        .filter(s => s.className && s.present !== undefined);

      console.log('Attendance Data:', attendanceData);

      axios.post('http://localhost:3003/attendance', attendanceData)
        .then(response => {
          console.log('Data sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error saving attendance:', error.message);
          if (error.errors) {
            console.error('Validation errors:', error.errors);
          }
        });

    }
  }

  function handlePresent(regno) {
    const index = stud.findIndex(s => s.regno === regno);
    if (stud[index].present === false || stud[index].present === null) {
      stud[index].present = true;
      setPresentCount(presentCount+1);
      if(absentCount>0){
         setAbsentCount(absentCount-1);
      }
      setStud([...stud]);
    }
  }

  function handleAbsent(regno) {
    const index = stud.findIndex(s => s.regno === regno);
    if (stud[index].present === true || stud[index].present === null) {
      stud[index].present = false;
      if(presentCount>0){
      setPresentCount(presentCount-1);
      }
      setAbsentCount(absentCount+1);
      setStud([...stud]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let data of stud) {
      if (data.regno === regno && data.subject.toLowerCase() === subject.toLowerCase()) {
        alert("This regno already exists for the selected subject");
        return;
      }
    }
    const newId = stud.length + 1;
    const newStud = {
      id: newId,
      name: add.toUpperCase(),
      present: false,
      className: class1.toUpperCase(),
      subject: subject.toUpperCase(),
      regno: regno
    };
    if (add.trim() && class1.trim() && subject.trim()) {
      setStud([...stud, newStud]);
      setAbsentCount(prev => prev + 1);
      setAdd("");
      setRegno("");
    } else {
      console.error("All fields must be filled");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className='flex flex-col items-center gap-6'>
        <form onSubmit={handleSubmit} className='w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-6'>
          <h1 className='text-2xl font-bold text-gray-700'>Attendance Management</h1>
          <div className='flex flex-col'>
            <label className='text-sm font-semibold text-gray-600'>Enter Class & Section:</label>
            <input
              placeholder='eg. CSE-C'
              type='text'
              value={class1}
              onChange={(e) => setClass1(e.target.value)}
              className='bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-semibold text-gray-600'>Enter Subject:</label>
            <input
              placeholder='eg. Mathematics'
              type='text'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className='bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>
          {/* <div className='flex flex-col'>
            <label className='text-sm font-semibold text-gray-600'>Add Students:</label>
            <input
              placeholder='Add student name'
              type='text'
              value={add}
              onChange={(e) => setAdd(e.target.value)}
              className='bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div> */}
          {/* <div className='flex flex-col'>
            <label className='text-sm font-semibold text-gray-600'>Add Regno:</label>
            <input
              placeholder='Enter Student Regno'
              type='text'
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
              className='bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div> */}
          <button className='bg-green-400 text-white p-2 rounded-md hover:bg-green-700 transition duration-300'>
            ADD
          </button>
        </form>
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex justify-center bg-white text-xl p-4 mt-6 rounded-lg shadow-md'>
          <h1 className='mr-2 text-gray-700'>NO. OF STUDENTS PRESENT:</h1>
          <span className='font-bold'>{presentCount}</span>
        </div>
        <div className='flex justify-center bg-white text-xl p-4 mt-6 rounded-lg shadow-md'>
          <button
            className='bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300'
            onClick={() => setShowModal(true)}>
            Show Pie Chart
          </button>
        </div>
      </div>
      <div>
        <button
          className='bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300'
          onClick={post}>
          POST
        </button>
      </div>
      <div className='flex justify-center flex-col items-center bg-white w-full max-w-lg h-60 m-1 text-xl p-4 overflow-auto rounded-lg shadow-md'>
        <ol className='list-decimal space-y-4 w-full text-center'>
          {filteredStud.length >0 ? (
            filteredStud.map((data,index) => (
              <li key={index} className='flex justify-between items-center'>
                <span className='text-lg text-gray-800'>{data.regno} - {data.name} </span>
                <div className='flex gap-4'>
                  <button
                    className={`${
                      data.present ? 'bg-green-400 text-white' : "bg-gray-300 text-gray-700"
                    } px-3 py-1 rounded-md transition duration-300`}
                    onClick={() => handlePresent(data.regno)}>
                    Present
                  </button>
                  <button
                    className={`${
                      !data.present && data.present !== null ? 'bg-red-500 text-white' : "bg-gray-300 text-gray-700"
                    } px-3 py-1 rounded-md transition duration-300`}
                    onClick={() => handleAbsent(data.regno)}>
                    Absent
                  </button>
                </div>
              </li>
            ))
          ) : (
            <h1 className='text-xl text-gray-600'>No students</h1>
          )}
        </ol>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Attendance Pie Chart</h2>
            <PieChart presentCount={presentCount} absentCount={absentCount} />
            <button
              className='mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300'
              onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ presentCount, absentCount }) => {
  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Present Absent Chart",
        data: [presentCount, absentCount],
        backgroundColor: [
          "rgba(144, 238, 144, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default Attendance;
