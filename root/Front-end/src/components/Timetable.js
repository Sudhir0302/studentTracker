import React from 'react';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const subjects=['CD','DSA','EE','MERN','EVS'];
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-center text-2xl font-bold mb-6">Teacher's Timetable</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Time</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period,index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{period}</td>
                {subjects.map((sub,index)=>(
                    <td key={index}>{sub}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timetable;
