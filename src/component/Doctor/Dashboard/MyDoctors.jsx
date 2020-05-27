import React, { Component } from "react";

class MyDoctor extends Component {
  state = {
    data: [
      {
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30 pm", "6:30 pm", "7:30 pm"],
        availability: 12,
        checked: false,
      },
    ],
  };
  render() {
    return (
      <div class="user-card">
        <div class="user-row">
          <img src={require('../../../assets/img/user-img.jpg')} class="usr-img" />
          <div class="user-detail">
            <h1 class="user-name">Rohit Sharma</h1>
            <p class="name-desg">physiotherapy</p>
          </div>
        </div>
        <div class="user-meet-detail">
          <div class="user-fees">
            <p class="title-light">Fees</p>
            <p class="card-text">₹5000</p>
          </div>
          <div class="user-appt">
            <p class="title-light">Today's Appointment</p>
            <div class="card-tag">
              <span class="time-tag">4:30 pm</span>
              <span class="time-tag">6:30 pm</span>
              <span class="time-tag">7:30 pm</span>
            </div>
          </div>
          <div class="user-slot">
            <p class="title-light">Today Available slots</p>
            <p class="card-text">12</p>
          </div>
        </div>
        <div class="user-btn-row">
          <div class="select-check">
            <input
              class="styled-checkbox"
              id="select-card"
              type="checkbox"
              value="value4"
            />
            <label for="select-card"></label>
          </div>
          <button class="settings-btn">Settings</button>
        </div>
      </div>
    );
  }
}

export default MyDoctor;
