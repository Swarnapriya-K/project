import React from "react";

function WeekDays() {
  // Function to generate times from 10 AM to 8 PM with an interval of 1 hour
  const generateTimes = () => {
    // Start at 10:00 AM and end at 8:00 PM (10 - 20 in 24-hour format)
    return Array.from({ length: 11 }, (_, index) => {
      const hour = 10 + index; // Start from 10 AM and go until 8 PM
      const formattedTime = new Date(0, 0, 0, hour).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      return formattedTime;
    });
  };

  const timesList = generateTimes();

  return (
    <div className="App">
      <ul style={{ listStyle: "none" }}>
        {timesList.map((time, index) => (
          <button
            style={{
              display: "flex",
              width: "130px",
              height: "30px",
              backgroundColor:"white",
              border: "1px solid #f6526d ",
              marginTop:"10px",
              padding:"0px 0px 0px 10px"
            }}
          >
            <li key={index}>{time}</li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default WeekDays;
