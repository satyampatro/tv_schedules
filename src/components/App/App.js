import React from 'react';
import './App.css';
import ScheduleList from "../ScheduleList/ScheduleList"

function App() {
  return (
    <div className="App">
      <h5 className="pageHead">TV shows schedule for today</h5>
      <ScheduleList />
    </div>
  );
}

export default App;
