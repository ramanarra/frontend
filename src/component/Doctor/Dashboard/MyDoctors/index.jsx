import React, { Component } from "react";
import { Button } from "antd";
import { paths } from "../../../../config";
import { withRouter } from "react-router-dom";
import './myDoctor.scss'

class MyDoctor extends Component {
  state = {
    data: [
      {
        id: 0,
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30pm", "6:30pm", "7:30pm"],
        availability: 12,
        checked: false,
      },
      {
        id: 1,
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30pm", "6:30pm", "7:30pm"],
        availability: 12,
        checked: false,
      },
      {
        id: 2,
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30pm", "6:30pm", "7:30pm"],
        availability: 12,
        checked: false,
      },
      {
        id: 3,
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30pm", "6:30pm", "7:30pm"],
        availability: 12,
        checked: false,
      },
      {
        id: 4,
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30pm", "6:30pm", "7:30pm"],
        availability: 12,
        checked: false,
      },
      {
        id: 5,
        name: "Rohit Sharma",
        job: "Physiotherapy",
        fees: "5000",
        appointment: ["4:30pm", "6:30pm", "7:30pm"],
        availability: 12,
        checked: false,
      },
    ],
  };

  handleChecked = (id) => {
    this.setState((prev) => {
      const data = prev.data.map((i) => {
        if (i.id === id) {
          i.checked = !i.checked;
        }
        return i;
      });
      return {
        data,
      };
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="tab-pane active my-doctors-sec" id="tab_default_1">
        <div className="user-cards-wrap">
          {data.map((i) => (
            <div key={i.id} className="user-card">
              <div className="user-row">
                <img
                  src={require("../../../../assets/img/user-img.jpg")}
                  className="usr-img"
                  alt={i.name}
                />
                <div className="user-detail">
                  <h1 className="user-name">{i.name}</h1>
                  <p className="name-desg">{i.job}</p>
                </div>
              </div>
              <div className="user-meet-detail">
                <div className="user-fees">
                  <p className="title-light">Fees</p>
                  <p className="card-text">₹{i.fees}</p>
                </div>
                <div className="user-appt">
                  <p className="title-light">Today's Appointment</p>
                  <div className="card-tag">
                    {i.appointment.map((a, index) => (
                      <span key={index} className="time-tag">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="user-slot">
                  <p className="title-light">Today Available slots</p>
                  <p className="card-text">{i.availability}</p>
                </div>
              </div>
              <div className="user-btn-row">
                <div className="select-check">
                  <input
                    className="styled-checkbox"
                    id={"select-card" + i.id}
                    type="checkbox"
                    value={i.checked}
                    onClick={this.handleChecked.bind(this, i.id)}
                  />
                  <label for={"select-card" + i.id}></label>
                </div>
                <Button
                  className="settings-btn"
                  onClick={() =>
                    this.props.history.push(paths.hospital.doctor.default)
                  }
                >
                  Settings
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(MyDoctor);
