import React, { useState, useEffect } from "react";
import { Input, Switch } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import EditSave from "../../../../EditSave";
import useSaveDoctorConfig from "../../../hooks/useSaveDoctorConfig";

const PatientCancellation = (props) => {
  const [editPatientCancellation, setEditPatientCancellation] = useState(false);
  const [saveDoctorConfig] = useSaveDoctorConfig();

  const [data, setData] = useState({
    cancellation: null,
    cancel_period: {
      days: null,
      hrs: null,
      mins: null,
    },
  });

  useEffect(() => {
    if (
      props.patientCancelationData &&
      props.patientCancelationData.cancellationDays
    ) {
      setData({
        ...data,
        cancellation: props.patientCancelationData.isPatientCancellationAllowed,
        cancel_period: {
          days: props.patientCancelationData.cancellationDays,
          hrs: props.patientCancelationData.cancellationHours,
          mins: props.patientCancelationData.cancellationMins,
        },
      });
    }
  }, [props.patientCancelationData]);

  const addToolTipText = () => {
    if (
      (props.patientCancelationData.cancellationDays ===
        data.cancel_period.days ||
        data.cancel_period.days === "") &&
      (props.patientCancelationData.cancellationHours ===
        data.cancel_period.hrs ||
        data.cancel_period.hrs === "") &&
      (props.patientCancelationData.cancellationMins ===
        data.cancel_period.mins ||
        data.cancel_period.mins === "")
    ) {
      return "you have not made any changes";
    }

    return "";
  };

  const editPatientCancellationData = () => {
    setEditPatientCancellation(true);
  };

  const savePatientCancellationData = () => {
    if (
      (props.patientCancelationData.cancellationDays ===
        data.cancel_period.days ||
        data.cancel_period.days === "") &&
      (props.patientCancelationData.cancellationHours ===
        data.cancel_period.hrs ||
        data.cancel_period.hrs === "") &&
      (props.patientCancelationData.cancellationMins ===
        data.cancel_period.mins ||
        data.cancel_period.mins === "")
    ) {
      return;
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      cancellationDays: data.cancel_period.days,
      cancellationHours: data.cancel_period.hrs,
      cancellationMins: data.cancel_period.mins,
    };
    saveDoctorConfig(params);
    setEditPatientCancellation(false);
    props.reFetch();
  };

  const cancelPatientCancellationData = () => {
    setData({
      ...data,
      cancel_period: {
        days: props.patientCancelationData.cancellationDays,
        hrs: props.patientCancelationData.cancellationHours,
        mins: props.patientCancelationData.cancellationMins,
      },
    });
    setEditPatientCancellation(false);
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

  const dateField = (name) => (
    <span className="date-field-wrap">
      <Input
        name={`${name} days`}
        type="number"
        maxLength="2"
        className="date-field days-field"
        value={data.cancel_period.days}
        disabled={!editPatientCancellation}
        onChange={handleDateChange}
        addonAfter="Days"
      />
      <Input
        name={`${name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={data.cancel_period.hrs}
        disabled={!editPatientCancellation}
        onChange={handleDateChange}
        addonAfter="Hrs"
      />
      <Input
        name={`${name} mins`}
        type="number"
        maxLength="2"
        className="date-field mins-field"
        value={data.cancel_period.mins}
        disabled={!editPatientCancellation}
        onChange={handleDateChange}
        addonAfter="Mins"
      />
      <EditSave
        isEdit={editPatientCancellation}
        handleOnEdit={editPatientCancellationData}
        handleOnSave={savePatientCancellationData}
        handleOnCancel={cancelPatientCancellationData}
        tooltipText={addToolTipText()}
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
    <div className="option-sec sec-1">
      <div className="o1 qus-wrap">
        <span className="qus">Patient Cancellation Allowed</span>
        <Switch
          className="cancel-toggle toggle-btn"
          checked={data.cancellation}
          onClick={handleToggle.bind(this, "cancellation")}
        />
      </div>
      {data.cancellation && (
        <>
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
        </>
      )}
    </div>
  );
};

export default PatientCancellation;
