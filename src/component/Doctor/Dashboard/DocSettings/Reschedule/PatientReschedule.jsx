import React, { useState } from "react";
import { Input, Switch } from "antd";
import EditSave from "../../../../EditSave";
import useSaveDoctorConfig from "../../../hooks/useSaveDoctorConfig";

const PatientReschedule = (props) => {
  const [editPatientReschedule, setEditPatientReschedule] = useState(false);
  const [
    editPatientAutomaticCancelation,
    setEditPatientAutomaticCancelation,
  ] = useState(false);
  const [saveDoctorConfig] = useSaveDoctorConfig();
  const [isRescheduleAllowed, setIsRescheduleAllowed] = useState({
    reschedule: props.patientRescheduleData.isPatientRescheduleAllowed,
  });
  const [
    patientAutoCancellationValues,
    setPatientAutoCancellationValues,
  ] = useState({
    auto_cancel_period: {
      days: props.patientRescheduleData.autoCancelDays,
      hrs: props.patientRescheduleData.autoCancelHours,
      mins: props.patientRescheduleData.autoCancelMins,
    },
  });

  const [patientRescheduleValues, setPatientRescheduleValues] = useState({
    reschedule_period: {
      days: props.patientRescheduleData.rescheduleDays,
      hrs: props.patientRescheduleData.rescheduleHours,
      mins: props.patientRescheduleData.rescheduleMins,
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
        patientRescheduleValues.reschedule_period.days ||
        patientRescheduleValues.reschedule_period.days === "") &&
      (props.patientRescheduleData.rescheduleHours ===
        patientRescheduleValues.reschedule_period.hrs ||
        patientRescheduleValues.reschedule_period.hrs === "") &&
      (props.patientRescheduleData.rescheduleMins ===
        patientRescheduleValues.reschedule_period.mins ||
        patientRescheduleValues.reschedule_period.mins === "")
    ) {
      return;
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      rescheduleDays: patientRescheduleValues.reschedule_period.days,
      rescheduleHours: patientRescheduleValues.reschedule_period.hrs,
      rescheduleMins: patientRescheduleValues.reschedule_period.mins,
    };
    saveDoctorConfig(params);
    setEditPatientReschedule(false);
    props.reFetch();
  };

  const saveAutoCancelData = () => {
    if (
      (props.patientRescheduleData.autoCancelDays ===
        patientAutoCancellationValues.auto_cancel_period.days ||
        patientAutoCancellationValues.auto_cancel_period.days === "") &&
      (props.patientRescheduleData.autoCancelHours ===
        patientAutoCancellationValues.auto_cancel_period.hrs ||
        patientAutoCancellationValues.auto_cancel_period.hrs === "") &&
      (props.patientRescheduleData.autoCancelMins ===
        patientAutoCancellationValues.auto_cancel_period.mins ||
        patientAutoCancellationValues.auto_cancel_period.mins === "")
    ) {
      return;
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      autoCancelDays: patientAutoCancellationValues.auto_cancel_period.days,
      autoCancelHours: patientAutoCancellationValues.auto_cancel_period.hrs,
      autoCancelMins: patientAutoCancellationValues.auto_cancel_period.mins,
    };
    saveDoctorConfig(params);
    setEditPatientAutomaticCancelation(false);
    props.reFetch();
  };

  const addToolTipReschedule = () => {
    if (
      (props.patientRescheduleData.rescheduleDays ===
        patientRescheduleValues.reschedule_period.days ||
        patientRescheduleValues.reschedule_period.days === "") &&
      (props.patientRescheduleData.rescheduleHours ===
        patientRescheduleValues.reschedule_period.hrs ||
        patientRescheduleValues.reschedule_period.hrs === "") &&
      (props.patientRescheduleData.rescheduleMins ===
        patientRescheduleValues.reschedule_period.mins ||
        patientRescheduleValues.reschedule_period.mins === "")
    ) {
      return "you have not made any changes";
    }

    return "";
  };

  const addToolTipAutoCancelation = () => {
    if (
      (props.patientRescheduleData.autoCancelDays ===
        patientAutoCancellationValues.auto_cancel_period.days ||
        patientAutoCancellationValues.auto_cancel_period.days === "") &&
      (props.patientRescheduleData.autoCancelHours ===
        patientAutoCancellationValues.auto_cancel_period.hrs ||
        patientAutoCancellationValues.auto_cancel_period.hrs === "") &&
      (props.patientRescheduleData.autoCancelMins ===
        patientAutoCancellationValues.auto_cancel_period.mins ||
        patientAutoCancellationValues.auto_cancel_period.mins === "")
    ) {
      return "you have not made any changes";
    }

    return "";
  };

  const cancelPatientRescheduleData = () => {
    setPatientRescheduleValues({
      ...patientRescheduleValues,
      reschedule_period: {
        days: props.patientRescheduleData.rescheduleDays,
        hrs: props.patientRescheduleData.rescheduleHours,
        mins: props.patientRescheduleData.rescheduleMins,
      },
    });
    setEditPatientReschedule(false);
  };

  const cancelPatientAutoCancelData = () => {
    setPatientAutoCancellationValues({
      ...patientAutoCancellationValues,
      auto_cancel_period: {
        days: props.patientRescheduleData.autoCancelDays,
        hrs: props.patientRescheduleData.autoCancelHours,
        mins: props.patientRescheduleData.autoCancelMins,
      },
    });
    setEditPatientAutomaticCancelation(false);
  };

  const handleDateChangeForReschedule = (e) => {
    const value = e.target.value;
    const field = e.target.name.split(" ");
    const name = field[0];
    const period = field[1];

    setPatientRescheduleValues((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          [period]: value,
        },
      };
    });
  };

  const handleDateChangeForAutoCancellation = (e) => {
    const value = e.target.value;
    const field = e.target.name.split(" ");
    const name = field[0];
    const period = field[1];

    setPatientAutoCancellationValues((prev) => {
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
        value={patientRescheduleValues.reschedule_period.days}
        disabled={!editPatientReschedule}
        onChange={handleDateChangeForReschedule}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={patientRescheduleValues.reschedule_period.hrs}
        disabled={!editPatientReschedule}
        onChange={handleDateChangeForReschedule}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        type="number"
        maxLength="2"
        className="date-field mins-field"
        value={patientRescheduleValues.reschedule_period.mins}
        disabled={!editPatientReschedule}
        onChange={handleDateChangeForReschedule}
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
        value={patientAutoCancellationValues.auto_cancel_period.days}
        disabled={!editPatientAutomaticCancelation}
        onChange={handleDateChangeForAutoCancellation}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={patientAutoCancellationValues.auto_cancel_period.hrs}
        disabled={!editPatientAutomaticCancelation}
        onChange={handleDateChangeForAutoCancellation}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        type="number"
        maxLength="2"
        className="date-field mins-field"
        value={patientAutoCancellationValues.auto_cancel_period.mins}
        disabled={!editPatientAutomaticCancelation}
        onChange={handleDateChangeForAutoCancellation}
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
    setIsRescheduleAllowed((prev) => {
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
          checked={isRescheduleAllowed.reschedule}
          onClick={handleToggle.bind(this, "reschedule")}
        />
      </div>
      {isRescheduleAllowed.reschedule && (
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
