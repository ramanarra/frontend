import React, { Component } from "react";
import { Input, Switch, Row, Col } from "antd";
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import {
  AiOutlineUser,
  AiOutlineIdcard,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import "./profile.scss";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const data = {
  fname: "Arul",
  lname: "Prakash",
  id: "#12345678",
  specality: "Gastroenterology",
  edu: "MBBS, Gastroenterology",
  exp: "2+ years",
  phone: 987654321,
  email: "arul1998@gmail.com",
  fee: 2000.0,
  profile: require("../../../../../assets/img/user-img.jpg"),
  sign: require("../../../../../assets/img/sign.jpg"),
  pre_consult: false,
  pre_consult_time: {
    hrs: 0,
    mins: 15,
  },
};
let edit_fee = false;
let edit_consult = false;

const key = { doctorKey: "Doc_5" };
const Profile = (props) => {
  const [preConsult, setPreConsult] = useState(null);
  const [editConsultationBaseFees, setEditConsultationBaseFees] = useState(
    false
  );
  const [editConsult, setEditConsult] = useState(false);
  const [consultationBaseFees, setConsultationBaseFees] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const docKey = useMemo(() => {
    return { doctorKey: props.location.state.key };
  }, [props.location]);

  const [responseData, loading, error] = useCustomFetch(
    "POST",
    "calendar/doctorSettingsPersonalView",
    docKey
  );
  const { doctorDetails, configDetails } = responseData;
  useEffect(() => {
    if (configDetails && configDetails.consultationCost) {
    setConsultationBaseFees(configDetails.consultationCost)
    setHours(configDetails.preconsultationHours)
    setMinutes(configDetails.preconsultationMins)
    setPreConsult(configDetails.isPreconsultationAllowed)
  }
  }, [configDetails])

  console.log(responseData)

  const handleOnBaseFeesEdit = () => {
    setEditConsultationBaseFees(!editConsultationBaseFees);
    var element = document.getElementById("consultationBaseFees");
    element.classList.add("border-display");
  };

  const handleOnEditConsult = () => {
    setEditConsult(!editConsult);
  };

  const handleOnBaseFeesChange = (event) => {
    setConsultationBaseFees(event.target.value);
  };
  const handleHourChange = (event) => {
    setHours(event.target.value);
  };
  const handleMinuteChange = (event) => {
    setMinutes(event.target.value);
  };

  

  const editBtn = (isEdit, handleOnEdit) => {
    return (
      <span
        className={"ctrl-btn " + (isEdit ? "done-btn" : "edit-btn")}
        onClick={handleOnEdit}
      >
        {isEdit ? <GoCheck /> : <MdEdit />}
      </span>
    );
  };

  const viewPreConsult = () => {
    setPreConsult(!preConsult);
  };

  const doctorName = doctorDetails ? doctorDetails.doctorName.split(" "): '';
  const DateField = () => (
    <span className="date-field-wrap">
      <Input
        name="hrs"
        className="date-field hrs-field"
        type="number"
        maxLength="2"
        value={hours}
        disabled={!editConsult}
        onChange={handleHourChange}
        addonAfter="Hrs"
      />
      <Input
        name="mins"
        className="date-field mins-field"
        type="number"
        value={minutes}
        maxLength="2"
        disabled={!editConsult}
        onChange={handleMinuteChange}
        addonAfter="Mins"
      />
      <span>{editBtn(editConsult, setEditConsult)}</span>{" "}
    </span>
  );
  return (
    <div className="doc-profile">
      <h1 className="doc-head">Doctor Details</h1>
      <div className="prof-area">
        <div className="prof-img align">
          <img src={data.profile} alt={doctorDetails && doctorDetails.doctorName} />
        </div>
        <div className="prof-fields">
          <div className="fields">
            <div>
              <Row>
                <Col span={12}>
                  <p>
                    <span className="font-styles"> First Name</span>
                  </p>
                  <Input
                    style={{ width: "94%" }}
                    className="set-field fname-field"
                    value={doctorName && doctorName[0]}
                    disabled
                  />
                </Col>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Last Name</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field lname-field"
                    value={doctorName && doctorName[1]}
                    // size="small"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Registation Number</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field id-field"
                    value={doctorDetails && doctorDetails.doctor_id}
                    // size="small"
                    disabled
                  />
                </Col>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Specialization</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field spec-field"
                    value={doctorDetails && doctorDetails.speciality}
                    // size="small"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Qualification</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field edu-field"
                    value={doctorDetails && doctorDetails.qualification}
                    // size="small"
                    disabled
                  />
                </Col>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Year Of Experience</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field exp-field"
                    value={doctorDetails && doctorDetails.experience.concat(" +years")}
                    // size="small"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Contact Number</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field phone-field"
                    value={doctorDetails && doctorDetails.number}
                    // size="small"

                    disabled
                  />
                </Col>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Email Id</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    className="set-field email-field"
                    value={data.email}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <p>
                    <span className="font-styles">Consultation Base Fees</span>
                  </p>

                  <Input
                    style={{ width: "94%" }}
                    addonAfter={editBtn(
                      editConsultationBaseFees,
                      handleOnBaseFeesEdit
                    )}
                    name="fees"
                    id="consultationBaseFees"
                    className="set-field fees-field"
                    prefix="INR"
                    type="number"
                    value={consultationBaseFees}
                    disabled={!editConsultationBaseFees}
                    placeholder="Fees"
                    onChange={handleOnBaseFeesChange}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div className="sign-box">
            {!!data.sign && <img src={data.sign} alt="signature" />}
          </div>
          <div className="pre-consult">
            Pre-consultancy
            <Switch
              className="consult-toggle"
              checked={preConsult}
              onClick={viewPreConsult}
            />
          </div>
          {preConsult && (
            <div className="consult-time-wrap">
              <div className="consult-time">
                Patient Pre-Consultancy Time:
                {DateField()}
              </div>
              <br />
              <span className="font-color">*</span>
              <span className="font-size">
                patient has to make him self avaliable to even before the slot
                time based on time provider
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
