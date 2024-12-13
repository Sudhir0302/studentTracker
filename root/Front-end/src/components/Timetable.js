import React, { useState } from "react";

const Timetable = () => {
  const [timetable, setTimetable] = useState({
    branch: "III CSE C",
    semester: "V (ODD SEM)",
    classroom: "LH 40",
    slots: [
      "8:30-9:15", "9:15-10:00", "10:00-10:45", "11:05-11:50", 
      "11:50-12:35", "Lunch", "1:20-2:05", "2:05-2:50", "3:05-3:50", "3:50-4:35"
    ],
    days: [
      { name: "Monday", subjects: ["MAD LAB - LAB 2", "MAD LAB - LAB 2", "MAD LAB - LAB 2", "SE", "DSA", "Lunch", "SE", "MSWD", "EVS", "DSA"] },
      { name: "Tuesday", subjects: ["DSA", "MSWD", "CD", "DSA", "MCA",  "MSWD", "SE", "QUANTS", "QUANTS"] },
      { name: "Wednesday", subjects: ["MCA", "CD", "MSWD", "MCA", "CD", "VERBAL", "VERBAL", "EVS", "EVS"] },
      { name: "Thursday", subjects: ["SE", "EVS", "MCA", "MSWD", "EVS", "CD", "MSWD LAB - LAB 1", "MSWD LAB - LAB 1", "MSWD LAB - LAB 1"] },
      { name: "Friday", subjects: ["EVS", "DSA", "SE", "DSA LAB - LAB 1", "DSA LAB - LAB 1", "DSA LAB - LAB 1", "MCA", "SE", "CD"] },
      // { name: "Saturday", subjects: [
      //   "Engineering Exploration-V", "Engineering Exploration-V", "Engineering Exploration-V", "Engineering Exploration-V", // First 4 periods
      //   "Engineering Exploration-V", "Engineering Exploration-V", "Engineering Exploration-V", "Engineering Exploration-V",
      //   "Engineering Exploration-V" // Last 4 periods after lunch
      // ] },
    ],
  });

  const [editing, setEditing] = useState(false);
  const [editDayIndex, setEditDayIndex] = useState(null);
  const [editSubjects, setEditSubjects] = useState([]);

  const handleEdit = (dayIndex) => {
    setEditDayIndex(dayIndex);
    setEditSubjects(timetable.days[dayIndex].subjects);
    setEditing(true);
  };

  const handleChange = (slotIndex, value) => {
    const updatedSubjects = [...editSubjects];
    updatedSubjects[slotIndex] = value;
    setEditSubjects(updatedSubjects);
  };

  const handleSave = () => {
    const updatedDays = [...timetable.days];
    updatedDays[editDayIndex].subjects = editSubjects;
    setTimetable({ ...timetable, days: updatedDays });
    setEditing(false); // Close modal after saving
  };

  const handleClose = () => {
    setEditing(false); // Close modal without saving
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Branch: {timetable.branch}</h1>
        <h2 className="text-lg">Semester: {timetable.semester}</h2>
        <h3 className="text-lg">Classroom: {timetable.classroom}</h3>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Day/Time</th>
            {timetable.slots.map((slot, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.days.map((day, dayIndex) => (
            <tr key={dayIndex} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {day.name}
                <button
                  onClick={() => handleEdit(dayIndex)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              </td>
              {day.subjects.map((subject, slotIndex) => {
                if (subject === "Lunch") {
                  return (
                    <td
                      key={slotIndex}
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={6}
                    >
                      {subject}
                    </td>
                  );
                }

                if (day.name === "Saturday") {
                  if (slotIndex < 4 || (slotIndex > 5 && slotIndex < 9)) {
                    return (
                      <td key={slotIndex} className="border border-gray-300 px-4 py-2">
                        {subject}
                      </td>
                    );
                  }
                }

                return (
                  <td key={slotIndex} className="border border-gray-300 px-4 py-2">
                    {subject || "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing */}
      {editing && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit {timetable.days[editDayIndex].name} Timetable</h2>
            <div className="space-y-4">
              {editSubjects.map((subject, slotIndex) => (
                <div key={slotIndex} className="flex items-center space-x-2">
                  <span className="w-32">{timetable.slots[slotIndex]}</span>
                  <input
                    type="text"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    value={subject}
                    onChange={(e) => handleChange(slotIndex, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
