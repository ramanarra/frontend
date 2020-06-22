import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Upload } from "antd";
import {
  SettingOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { paths } from "../../../../config";
import userImage from "../../../../assets/img/user-img.jpg";
import useCustomFetch from "../../../../hooks/useCustomFetch";
import "./myDoctor.scss";
import api from "../../../../api";
import { useState } from "react";
import { useEffect } from "react";
import * as actions from "../../../../actions/sampleActions";
import { OmitProps } from "antd/lib/transfer/renderListBody";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";

const MyDoctor = (props) => {
  const [responseData, loading, error] = useCustomFetch(
    "GET",
    "calendar/doctor_List"
  );


  const passingKey = (doctorKey) => {
    props.sampleAction(doctorKey);
    props.history.push(paths.hospital.doctor.default);
  };
  if (!responseData) {
    return null;
  }

  const { doctorList } = responseData;

  const mapDoctorList = [doctorList];
  console.log(mapDoctorList);

  const uploadButton = (
    <div>
      {false ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Add New Doctor</div>
    </div>
  );

  return (
    <div className="tab-pane active my-doctors-sec" id="tab_default_1">
      <div className="user-cards-wrap">
        {doctorList.map((value) => (
          <div key={value.id} className="user-card">
            
             <SettingOutlined className="setting-Outlined" />
            
            <div className="user-row">
              <img src={userImage} className="usr-img" alt="userImage" />
              <div className="user-detail">
                <h1 className="user-name">{value.doctorName}</h1>
                <p className="name-desg">{value.speciality}</p>
              </div>
            </div>
            <div className="user-meet-detail">
              <div className="user-fees">
        <p className="title-light">Fees</p>
        <p className="card-text display"><FaRupeeSign className="fa-rupees-sign"/>{value.fees}</p>
              </div>
              <div className="user-appt">
                <p className="title-light">Today's Appointment</p>
                <div className="card-tag">
                  {value.todaysAppointment.map((a, index) => (
                    <span key={index} className="time-tag">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="user-slot">
                <p className="title-light">Today Available slots</p>
                <p className="card-text">{value.todaysAvailabilitySeats}</p>
              </div>
            </div>
            <div className="user-btn-row">
              <div className="select-check">
                <input
                  className="styled-checkbox"
                  id={"select-card" + value.id}
                  type="checkbox"
                  value="false"
                />
                <label for={"select-card" + value.id}></label>
              </div>
              <Button
                className="settings-btn"
                onClick={() =>
                  props.history.push({
                    pathname: paths.hospital.doctor.default,
                    state: { key: value.doctorKey },
                  })
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
};

export default withRouter(MyDoctor);
