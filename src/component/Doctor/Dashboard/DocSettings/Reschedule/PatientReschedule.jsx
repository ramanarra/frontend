import React, { useState } from "react";
import { Input, Switch } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect } from "react";
import EditSave from "../../../../EditSave";
import useSaveDoctorConfig from "../../../hooks/useSaveDoctorConfig";

const PatientReschedule = (props) => {
  const [editPatientReschedule, setEditPatientReschedule] = useState(false);
  const [
    editPatientAutomaticCancelation,
    setEditPatientAutomaticCancelation,
  ] = useState(false);
  const [saveDoctorConfig] = useSaveDoctorConfig();

  const [data, setData] = useState({
    reschedule: props.patientRescheduleData.isPatientRescheduleAllowed,
    reschedule_period: {
      days: props.patientRescheduleData.rescheduleDays,
      hrs: props.patientRescheduleData.rescheduleHours,
      mins: props.patientRescheduleData.rescheduleMins,
    },
    auto_cancel_period: {
      days: props.patientRescheduleData.autoCancelDays,
      hrs: props.patientRescheduleData.autoCancelHours,
      mins: props.patientRescheduleData.autoCancelMins,
    },
  });

  const editPatientRescheduleData = () => {
    setEditPatientReschedule(!editPatientReschedule);
  };

  const editAutoCancelData = () => {
    setEditPatientAutomaticCancelation(!editPatientAutomaticCancelation);
  };
  const savePatientRescheduleData = () => {
    if (
      (props.patientRescheduleData.rescheduleDays ===
        data.reschedule_period.days ||
        data.reschedule_period.days === "") &&
      (props.patientRescheduleData.rescheduleHours ===
        data.reschedule_period.hrs ||
        data.reschedule_period.hrs === "") &&
      (props.patientRescheduleData.rescheduleMins ===
        data.reschedule_period.mins ||
        data.reschedule_period.mins === "")
    ) {
      return;
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      rescheduleDays: data.reschedule_period.days,
      rescheduleHours: data.reschedule_period.hrs,
      rescheduleMins: data.reschedule_period.mins,
    };
    saveDoctorConfig(params);
    setEditPatientReschedule(false);
    props.reFetch();
  };

  const saveAutoCancelData = () => {
    if (
      (props.patientRescheduleData.autoCancelDays ===
        data.auto_cancel_period.days ||
        data.auto_cancel_period.days === "") &&
      (props.patientRescheduleData.autoCancelHours ===
        data.auto_cancel_period.hrs ||
        data.auto_cancel_period.hrs === "") &&
      (props.patientRescheduleData.autoCancelMins ===
        data.auto_cancel_period.mins ||
        data.auto_cancel_period.mins === "")
    ) {
      return;
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      autoCancelDays: data.auto_cancel_period.days,
      autoCancelHours: data.auto_cancel_period.hrs,
      autoCancelMins: data.auto_cancel_period.mins,
    };
    saveDoctorConfig(params);
    setEditPatientAutomaticCancelation(false);
    props.reFetch();
  };

  const addToolTipReschedule = () => {
    if (
      (props.patientRescheduleData.rescheduleDays ===
        data.reschedule_period.days ||
        data.reschedule_period.days === "") &&
      (props.patientRescheduleData.rescheduleHours ===
        data.reschedule_period.hrs ||
        data.reschedule_period.hrs === "") &&
      (props.patientRescheduleData.rescheduleMins ===
        data.reschedule_period.mins ||
        data.reschedule_period.mins === "")
    ) {
      return "you have not made any changes";
    }

    return "";
  };

  const addToolTipAutoCancelation = () => {
    if (
      (props.patientRescheduleData.autoCancelDays ===
        data.auto_cancel_period.days ||
        data.auto_cancel_period.days === "") &&
      (props.patientRescheduleData.autoCancelHours ===
        data.auto_cancel_period.hrs ||
        data.auto_cancel_period.hrs === "") &&
      (props.patientRescheduleData.autoCancelMins ===
        data.auto_cancel_period.mins ||
        data.auto_cancel_period.mins === "")
    ) {
      return "you have not made any changes";
    }

    return "";
  };

  const cancelPatientRescheduleData = () => {
    setData({
      ...data,
      reschedule_period: {
        days: props.patientRescheduleData.rescheduleDays,
        hrs: props.patientRescheduleData.rescheduleHours,
        mins: props.patientRescheduleData.rescheduleMins,
      },
    });
    setEditPatientReschedule(false);
  };

  const cancelPatientAutoCancelData = () => {
    setData({
      ...data,
      auto_cancel_period: {
        days: props.patientRescheduleData.autoCancelDays,
        hrs: props.patientRescheduleData.autoCancelHours,
        mins: props.patientRescheduleData.autoCancelMins,
      },
    });
    setEditPatientAutomaticCancelation(false);
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

  const dateField1 = (name) => (
    <span className="date-field-wrap">
      <Input
        name={`${name} days`}
        type="number"
        maxLength="2"
        className="date-field days-field"
        value={data.reschedule_period.days}
        disabled={!editPatientReschedule}
        onChange={handleDateChange}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={data.reschedule_period.hrs}
        disabled={!editPatientReschedule}
        onChange={handleDateChange}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        type="number"
        maxLength="2"
        className="date-field mins-field"
        value={data.reschedule_period.mins}
        disabled={!editPatientReschedule}
        onChange={handleDateChange}
        addonAfter="Mins"
      />
      <EditSave
        isEdit={editPatientReschedule}
        handleOnEdit={editPatientRescheduleData}
        handleOnSave={savePatientRescheduleData}
        handleOnCancel={cancelPatientRescheduleData}
        tooltipText={addToolTipReschedule()}
      />
    </span>
  );

  const dateField2 = (name) => (
    <span className="date-field-wrap">
      <Input
        name={`${name} days`}
        type="number"
        maxLength="2"
        className="date-field days-field"
        value={data.auto_cancel_period.days}
        disabled={!editPatientAutomaticCancelation}
        onChange={handleDateChange}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={data.auto_cancel_period.hrs}
        disabled={!editPatientAutomaticCancelation}
        onChange={handleDateChange}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        type="number"
        maxLength="2"
        className="date-field mins-field"
        value={data.auto_cancel_period.mins}
        disabled={!editPatientAutomaticCancelation}
        onChange={handleDateChange}
        addonAfter="Mins"
      />
      <EditSave
        isEdit={editPatientAutomaticCancelation}
        handleOnEdit={editAutoCancelData}
        handleOnSave={saveAutoCancelData}
        handleOnCancel={cancelPatientAutoCancelData}
        tooltipText={addToolTipAutoCancelation()}
      />
    </span>
  );

  const handleToggle = (name) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  return (
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
            {dateField1("reschedule_period")}
          </div>
          <div className="q5 qus-wrap">
            <span className="ques">
              Automatic Cancellation of appointments for unpaid bookings
            </span>
            {dateField2("auto_cancel_period")}
          </div>
        </>
      )}
    </div>
  );
};
export default PatientReschedule;
