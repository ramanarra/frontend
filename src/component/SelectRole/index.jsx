import React, { useState } from "react";
import "./selectRole.scss";

const SelectRole = (props) => {
  const [option, setOption] = useState("doctor");
  return (
    <div className="select-role-page">
      <div className="select-role-view">
        <div className="select-role-logo"></div>
        <div className="select-role-control">
          <h1 className="select-role-head">Select your Role</h1>
          <div className="select-role-option">
            <div
              className={
                "doctor-option option-btn-container" +
                (option === "doctor" ? " selected-option" : "")
              }
              onClick={setOption.bind(this, "doctor")}
            >
              <div className="doctor-logo option-btn">
                <object
                  className="btn-img"
                  data={require("../../assets/img/icons/doctor.svg")}
                  alt="Doctor"
                  type="image/svg+xml"
                />
              </div>
              <div className="option-title">Doctor</div>
            </div>
            <div
              className={
                "patient-option option-btn-container" +
                (option === "patient" ? " selected-option" : "")
              }
              onClick={setOption.bind(this, "patient")}
            >
              <div className="patient-logo option-btn">
                <img
                  className="btn-img"
                  src={require("../../assets/img/icons/patient.svg")}
                  alt="Doctor"
                />
              </div>
              <div className="option-title">Patient</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
