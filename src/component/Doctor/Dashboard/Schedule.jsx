import React, { Component } from "react";

class Schedule extends Component {
  state = {
    data: [
      {
        name: 'Annie',
        booked: [{
          date: '01 may 2020'
        }]
      }
    ],
  };
  render() {
    return (
      <div className="tab-pane-2" id="tab_default_2">
        <div className="schedule-container">
          <div className="doctor-sidebar">

          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
