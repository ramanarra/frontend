import React, { useState } from "react";
import { Input, Switch } from "antd";
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./reschedule.scss";

const Reschedule = (props) => {
  const [data, setData] = useState({
    cancellation: true,
    cancel_period: {
      days: 0,
      hrs: 2,
      mins: 0,
    },
    reschedule: true,
    reschedule_period: {
      days: 0,
      hrs: 2,
      mins: 0,
    },
    auto_cancel_period: {
      days: 0,
      hrs: 2,
      mins: 0,
    },
  });

  const [edit, setEdit] = useState({
    cancel_period: false,
    reschedule_period: false,
    auto_cancel_period: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    const field = e.target.name.split(" ");
    const name = field[0];
    const period = field[1];

    setData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          [period]: value,
        },
      };
    });
  };

  const handleEdit = (name) => {
    setEdit((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  const dateField = (name) => (
    <span className="date-field-wrap">
      <Input
        name={`${name} days`}
        className="date-field days-field"
        value={data[name].days}
        disabled={!edit[name]}
        onChange={handleDateChange}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        className="date-field hrs-field"
        value={data[name].hrs}
        disabled={!edit[name]}
        onChange={handleDateChange}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        className="date-field mins-field"
        value={data[name].mins}
        disabled={!edit[name]}
        onChange={handleDateChange}
        addonAfter="Mins"
      />
      <span
        className={"ctrl-btn " + (edit[name] ? "done-btn" : "edit-btn")}
        onClick={handleEdit.bind(this, name)}
      >
        {edit[name] ? <GoCheck /> : <MdEdit />}
      </span>
    </span>
  );

  return (
    <div className="doctor-preference">
      <h4 className="pref-head">Cancellation/Reschedule Options</h4>
      <div className="options">
        <div className="option-sec sec-1">
          <div className="o1 qus-wrap">
            <span className="qus">Patient Cancellation Allowed</span>
            <Switch className="cancel-toggle toggle-btn" />
          </div>
          <div className="o2 qus-wrap">
            <span className="qus">
              How long before patient is allowed to cancel
            </span>
            {dateField("cancel_period")}
          </div>
          <div className="note-box">
            <span className="info-icon">
              <AiOutlineInfoCircle />
            </span>
            <span className="context">
              <span className="note">Note:</span>
              Cancellation within the allowed timings, the payments will be
              refunded to the original payment method. If paid through VIRUJH
            </span>
          </div>
        </div>
        <div className="option-sec sec-2">
          <div className="o3 qus-wrap">
            <span className="qus">Patient Reschedule</span>
            <Switch className="reschedule-toggle toggle-btn" />
          </div>
          <div className="o4 qus-wrap">
            <span className="qus">
              How long before patient is allowed to re-schedule
            </span>
            {dateField("reschedule_period")}
          </div>
          <div className="q5 qus-wrap">
            <span className="ques">
              Automatic Cancellation of appointments for unpaid bookings
            </span>
            {dateField("auto_cancel_period")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
