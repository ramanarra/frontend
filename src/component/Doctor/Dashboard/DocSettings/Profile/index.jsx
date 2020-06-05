import React, { Component } from "react";
import { Input, Switch } from "antd";
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

class Profile extends Component {
  state = {
    data: {
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
    },
    edit_fee: false,
    edit_consult: false,
  };

  handleDateChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => {
      return {
        pre_consult_time: {
          ...prev.pre_consult_time,
          [name]: value,
        },
      };
    });
  };

  handleEdit = (name) => {
    this.setState((prev) => {
      return {
        [name]: !prev[name],
      };
    });
  };

  render() {
    const { data, edit_fee, edit_consult, pre_consult } = this.state;
    const editBtn = (name) => (
      <span
        className={"ctrl-btn " + (this.state[name] ? "done-btn" : "edit-btn")}
        onClick={this.handleEdit.bind(this, name)}
      >
        {this.state[name] ? <GoCheck /> : <MdEdit />}
      </span>
    );
    const DateField = () => (
      <span className="date-field-wrap">
        <Input
          name="hrs"
          className="date-field hrs-field"
          value={data.pre_consult_time.hrs}
          disabled={!edit_consult}
          onChange={this.handleDateChange}
          addonAfter="Hrs"
        />
        <Input
          name="mins"
          className="date-field mins-field"
          value={data.pre_consult_time.mins}
          disabled={!edit_consult}
          onChange={this.handleDateChange}
          addonAfter="Mins"
        />
        {editBtn("edit_consult")}
      </span>
    );
    return (
      <div className="doc-profile">
        <h1 className="doc-head">Doctor Details</h1>
        <div className="prof-area">
          <div className="prof-img">
            <img src={data.profile} alt={data.fname} />
          </div>
          <div className="prof-fields">
            <div className="fields">
              <Input
                className="set-field fname-field"
                value={data.fname}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/avatar.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field lname-field"
                value={data.lname}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/avatar.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field id-field"
                value={data.id}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/id.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field spec-field"
                value={data.specality}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/job.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field edu-field"
                value={data.edu}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/certificate.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field exp-field"
                value={data.exp}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/exp.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field phone-field"
                value={data.phone}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/phone.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                className="set-field email-field"
                value={data.email}
                // size="small"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/mail.svg")}
                    alt="icon"
                  />
                }
                disabled
              />
              <Input
                name="fees"
                className="set-field fees-field"
                prefix="INR"
                suffix={
                  <img
                    src={require("../../../../../assets/img/icons/rupee.svg")}
                    alt="icon"
                  />
                }
                value={data.fee}
                // size="small"
                disabled={!edit_fee}
                // addonAfter={editBtn('edit_fee')}
                placeholder="Fees"
                onChange={this.handleChange}
              />
              <div className="edit-btn-wrap">{editBtn("edit_fee")}</div>
            </div>
            <div className="sign-box">
              {!!data.sign && <img src={data.sign} alt="signature" />}
            </div>
            <div className="pre-consult">
              Pre-consultancy
              <Switch
                className="consult-toggle"
                checked={pre_consult}
                onClick={this.handleEdit.bind(this, "pre_consult")}
              />
            </div>
            {pre_consult && (
              <div className="consult-time-wrap">
                <div className="consult-time">
                  Patient Pre-Consultancy Time:
                  {DateField()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
