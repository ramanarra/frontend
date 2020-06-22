import React, { useState } from "react";
import { Input, Switch } from "antd";
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./reschedule.scss";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import PatientCancellation from "./patientCancellation"
import { useEffect } from "react";
const key = { doctorKey: "Doc_5" };
const Reschedule = (props) => {
  const [patientCancellationAllowed, setpatientCancellationAllowed] = useState(
    null
  );
  let [responseData, reFetch, loading, error] = useCustomFetch(
    "POST",
    "calendar/doctorSettingsPersonalView",
    key
  );
  
  if (!responseData) {
    responseData = {}
  }


  const { configDetails } = responseData;
  const [data, setData] = useState({
    cancellation: true,
    cancel_period: {
      days: null,
      hrs: null,
      mins: null,
    },
    reschedule: true,
    reschedule_period: {
      days: null,
      hrs: null,
      mins: null,
    },
    auto_cancel_period: {
      days: null,
      hrs: null,
      mins: null,
    },
  });
  useEffect(() => {

    if (configDetails && configDetails.cancellationDays) {
      console.log(configDetails)
      setpatientCancellationAllowed();
      setData({
        ...data,
        cancellation: configDetails.isPatientCancellationAllowed,
        cancel_period: {
          days: configDetails.cancellationDays,
          hrs: configDetails.cancellationHours,
          mins: configDetails.cancellationMins,
        },
        reschedule: configDetails.isPatientRescheduleAllowed,
        reschedule_period: {
          days: configDetails.rescheduleDays,
          hrs: configDetails.rescheduleHours,
          mins: configDetails.rescheduleMins,
        },
        auto_cancel_period: {
          days: configDetails.autoCancelDays,
          hrs: configDetails.autoCancelHours,
          mins: configDetails.autoCancelMins,
        },
      });
    }
  }, [configDetails]);

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

  const handleToggle = (name) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
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
        type="number"
        maxLength="2"
        className="date-field days-field"
        value={data[name].days}
        disabled={!edit[name]}
        onChange={handleDateChange}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={data[name].hrs}
        disabled={!edit[name]}
        onChange={handleDateChange}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        type="number"
        maxLength="2"
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
        <PatientCancellation 
        patientCancelationData={configDetails} 
        doctorKey={key}
        reFetch={reFetch}
        />
        <div className="option-sec sec-2">
          <div className="o3 qus-wrap">
            <span className="qus">Patient Reschedule</span>
            <Switch
              className="reschedule-toggle toggle-btn"
              checked={data.reschedule}
              onClick={handleToggle.bind(this, "reschedule")}
            />
          </div>
          {data.reschedule && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
