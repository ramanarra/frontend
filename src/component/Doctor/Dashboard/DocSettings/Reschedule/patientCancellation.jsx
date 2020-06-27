import React, { useState } from 'react'
import { Input, Switch } from 'antd'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import EditSave from '../../../../EditSave'
import useSaveDoctorConfig from '../../../hooks/useSaveDoctorConfig'
import DataField from './DataField'

const PatientCancellation = (props) => {
  const [editPatientCancellation, setEditPatientCancellation] = useState(false)
  const [saveDoctorConfig] = useSaveDoctorConfig()

  const [isCancellation, setisCancellation] = useState({
    cancellation: props.patientCancelationData.isPatientCancellationAllowed,
  })

  const [patientCancellation, setpatientCancelation] = useState({
    cancel_period: {
      days: props.patientCancelationData.cancellationDays,
      hrs: props.patientCancelationData.cancellationHours,
      mins: props.patientCancelationData.cancellationMins,
    },
  })

  const addToolTipText = () => {
    if (
      (props.patientCancelationData.cancellationDays ===
        patientCancellation.cancel_period.days ||
        patientCancellation.cancel_period.days === '') &&
      (props.patientCancelationData.cancellationHours ===
        patientCancellation.cancel_period.hrs ||
        patientCancellation.cancel_period.hrs === '') &&
      (props.patientCancelationData.cancellationMins ===
        patientCancellation.cancel_period.mins ||
        patientCancellation.cancel_period.mins === '')
    ) {
      return 'you have not made any changes'
    }

    return ''
  }

  const editPatientCancellationData = () => {
    setEditPatientCancellation(true)
  }

  const savePatientCancellationData = () => {
    if (
      (props.patientCancelationData.cancellationDays ===
        patientCancellation.cancel_period.days ||
        patientCancellation.cancel_period.days === '') &&
      (props.patientCancelationData.cancellationHours ===
        patientCancellation.cancel_period.hrs ||
        patientCancellation.cancel_period.hrs === '') &&
      (props.patientCancelationData.cancellationMins ===
        patientCancellation.cancel_period.mins ||
        patientCancellation.cancel_period.mins === '')
    ) {
      return
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      cancellationDays: patientCancellation.cancel_period.days,
      cancellationHours: patientCancellation.cancel_period.hrs,
      cancellationMins: patientCancellation.cancel_period.mins,
    }
    saveDoctorConfig(params)
    setEditPatientCancellation(false)
    props.reFetch()
  }

  const cancelPatientCancellationData = () => {
    setpatientCancelation({
      ...patientCancellation,
      cancel_period: {
        days: props.patientCancelationData.cancellationDays,
        hrs: props.patientCancelationData.cancellationHours,
        mins: props.patientCancelationData.cancellationMins,
      },
    })
    setEditPatientCancellation(false)
  }

  const handleDayChange = (e) => {
    if(e.target.value <= 365){
    const value = e.target.value;
    const field = e.target.name.split(" ");
    const name = field[0];
    const period = field[1];

    setpatientCancelation((prev) => {
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

  const handleHrsChange = (e) => {
    if(e.target.value <= 12){
    const value = e.target.value;
    const field = e.target.name.split(" ");
    const name = field[0];
    const period = field[1];

    setpatientCancelation((prev) => {
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

  const handleMinsChange = (e) => {
    if(e.target.value <= 60){
    const value = e.target.value;
    const field = e.target.name.split(" ");
    const name = field[0];
    const period = field[1];

    setpatientCancelation((prev) => {
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
      isPatientCancellationAllowed: !isCancellation.cancellation
    };

    saveDoctorConfig(params)
    setisCancellation(!isCancellation.cancellation);

  }

  return (
    <div className="option-sec sec-1">
      <div className="o1 qus-wrap reduce-bottom">
        <span className="qus">Patient Cancellation Allowed</span>
        <Switch
          className="cancel-toggle toggle-btn"
          checked={isCancellation.cancellation}
          onClick = {handleOnChnage}
        />
      </div>
      {isCancellation.cancellation && (
        <>
          <div className="o2 qus-wrap reduce-space">
            <span className="qus">How long before patient is allowed to cancel</span>

            <DataField
              name="cancel_period"
              days={patientCancellation.cancel_period.days}
              hours={patientCancellation.cancel_period.hrs}
              minutes={patientCancellation.cancel_period.mins}
              edit={editPatientCancellation}
              handleDayChange={handleDayChange}
              handleHrsChange={handleHrsChange}
              handleMinsChange={handleMinsChange}
              handleEdit={editPatientCancellationData}
              handleSave={savePatientCancellationData}
              handleCancel={cancelPatientCancellationData}
              toolTip={addToolTipText()}
            />
          </div>
          <div className="note-box">
            <span className="info-icon">
              <AiOutlineInfoCircle />
            </span>
            <span className="context">
              <span className="note">Note:</span>
              Cancellation within the allowed timings, the payments will be refunded
              to the original payment method. If paid through VIRUJH
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default PatientCancellation
