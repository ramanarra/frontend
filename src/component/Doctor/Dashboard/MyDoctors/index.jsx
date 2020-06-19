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
        {mapDoctorList.map((i) => (
          <div key={i.id} className="user-card">
            <div>
              <SettingOutlined />
            </div>
            <div className="user-row">
              <img src={userImage} className="usr-img" alt="userImage" />
              <div className="user-detail">
                <h1 className="user-name">{i.doctorName}</h1>
                <p className="name-desg">{i.speciality}</p>
              </div>
            </div>
            <div className="user-meet-detail">
              <div className="user-fees">
                <p className="title-light">Fees</p>
                <p className="card-text">5000</p>
              </div>
              <div className="user-appt">
                <p className="title-light">Today's Appointment</p>
                <div className="card-tag">
                  {["4:30pm", "6:30pm", "7:30pm"].map((a, index) => (
                    <span key={index} className="time-tag">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="user-slot">
                <p className="title-light">Today Available slots</p>
                <p className="card-text">12</p>
              </div>
            </div>
            <div className="user-btn-row">
              <div className="select-check">
                <input
                  className="styled-checkbox"
                  id={"select-card" + i.id}
                  type="checkbox"
                  value="false"
                />
                <label for={"select-card" + i.id}></label>
              </div>
              <Button
                className="settings-btn"
                onClick={() =>
                  props.history.push({
                    pathname: paths.hospital.doctor.default,
                    state: { key: i.doctorKey },
                  })
                }
                // onClick = {()=>passingKey(i.doctorKey)}
              >
                Settings
              </Button>
            </div>
          </div>
        ))}

        {/* <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // beforeUpload={beforeUpload}
          // onChange={this.handleChange}
        >
          {uploadButton}
        </Upload> */}
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   bindActionCreators({...actions}, dispatch)
// }

export default withRouter(MyDoctor);
