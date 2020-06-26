import React, { useState } from "react";
import { Input, Switch } from "antd";

import EditSave from "../../../../EditSave";
import useSaveDoctorConfig from "../../../hooks/useSaveDoctorConfig";
import DataField from "./DataField";

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

  const handleDayChangeForReschedule = (e) => {
    if(e.target.value <= 365){
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
  }
  };

  const handleHrsChangeForReschedule = (e) => {
    if(e.target.value <= 12){
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
  }
  };

  const handleMinsChangeForReschedule = (e) => {
    if(e.target.value <= 60){
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
  }
  };

  const handleDayChangeForAutoCancellation = (e) => {
    if(e.target.value <= 365){
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
  }
  };

  const handleHrsChangeForAutoCancellation = (e) => {
    if(e.target.value <= 12){
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
  }
  };

  const handleMinsChangeForAutoCancellation = (e) => {
    if(e.target.value <= 60){
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
  }
  };

  const handleOnChnage = () => {
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      isPatientRescheduleAllowed: !isRescheduleAllowed.reschedule
    };

    saveDoctorConfig(params)
    setIsRescheduleAllowed(!isRescheduleAllowed.reschedule);

  }

  return (
    <div className="option-sec sec-2">
      <div className="o3 qus-wrap">
        <span className="qus">Patient Reschedule</span>
        <Switch
          className="reschedule-toggle toggle-btn"
          checked={isRescheduleAllowed.reschedule}
          onClick={handleOnChnage}
        />
      </div>
      {isRescheduleAllowed.reschedule && (
        <>
          <div className="o4 qus-wrap">
            <span className="qus reduce-top">
              How long before patient is allowed to re-schedule
            </span>
            <DataField
              name="reschedule_period"
              days={patientRescheduleValues.reschedule_period.days}
              hours={patientRescheduleValues.reschedule_period.hrs}
              minutes={patientRescheduleValues.reschedule_period.mins}
              edit={editPatientReschedule}
              handleDayChange={handleDayChangeForReschedule}
              handleHrsChange={handleHrsChangeForReschedule}
              handleMinsChange={handleMinsChangeForReschedule}
              handleEdit={editPatientRescheduleData}
              handleSave={savePatientRescheduleData}
              handleCancel={cancelPatientRescheduleData}
              toolTip={addToolTipReschedule()}
            />
          </div>
          <div className="q5 qus-wrap reduce-top">
            <span className="ques">
              Automatic Cancellation of appointments for unpaid bookings
            </span>

            <DataField
              name="auto_cancel_period"
              days={patientAutoCancellationValues.auto_cancel_period.days}
              hours={patientAutoCancellationValues.auto_cancel_period.hrs}
              minutes={patientAutoCancellationValues.auto_cancel_period.mins}
              edit={editPatientAutomaticCancelation}
              handleDayChange={handleDayChangeForAutoCancellation}
              handleHrsChange={handleHrsChangeForAutoCancellation}
              handleMinsChange={handleMinsChangeForAutoCancellation}
              handleEdit={editAutoCancelData}
              handleSave={saveAutoCancelData}
              handleCancel={cancelPatientAutoCancelData}
              toolTip={addToolTipAutoCancelation()}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default PatientReschedule;
