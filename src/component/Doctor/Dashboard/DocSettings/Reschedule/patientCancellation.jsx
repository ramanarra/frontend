import React, { useState } from 'react'
import { Switch } from 'antd'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import EditSave from '../../../../EditSave'
import DataField from './DataField'

const PatientCancellation = (props) => {
  const [editPatientCancellation, setEditPatientCancellation] = useState(false)

  const [isCancellation, setisCancellation] = useState(
    props.patientCancelationData.isPatientCancellationAllowed
  )

  const [patientCancellation, setpatientCancelation] = useState({
    days: props.patientCancelationData.cancellationDays,
    hrs: props.patientCancelationData.cancellationHours,
    mins: props.patientCancelationData.cancellationMins,
  })

  const addToolTipText = () => {
    if (
      (props.patientCancelationData.cancellationDays === patientCancellation.days ||
        patientCancellation.days === '') &&
      (props.patientCancelationData.cancellationHours === patientCancellation.hrs ||
        patientCancellation.hrs === '') &&
      (props.patientCancelationData.cancellationMins === patientCancellation.mins ||
        patientCancellation.mins === '')
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
      (props.patientCancelationData.cancellationDays === patientCancellation.days ||
        patientCancellation.days === '') &&
      (props.patientCancelationData.cancellationHours === patientCancellation.hrs ||
        patientCancellation.hrs === '') &&
      (props.patientCancelationData.cancellationMins === patientCancellation.mins ||
        patientCancellation.mins === '')
    ) {
      return
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      cancellationDays: patientCancellation.days,
      cancellationHours: patientCancellation.hrs,
      cancellationMins: patientCancellation.mins,
    }
    props.saveDoctorConfig(params)
    setEditPatientCancellation(false)
    props.reFetch()
  }

  const cancelPatientCancellationData = () => {
    setpatientCancelation({
      ...patientCancellation,
      ...{
        days: props.patientCancelationData.cancellationDays,
        hrs: props.patientCancelationData.cancellationHours,
        mins: props.patientCancelationData.cancellationMins,
      },
    })
    setEditPatientCancellation(false)
  }

  const handleDayChange = (e) => {
    debugger
    if (e.target.value <= 365) {
      const value = e.target.value
      const field = e.target.name.split(' ')
      const period = field[1]

      setpatientCancelation((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleHrsChange = (e) => {
    if (e.target.value <= 24) {
      const value = e.target.value
      const field = e.target.name.split(' ')
      const name = field[0]
      const period = field[1]

      setpatientCancelation((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleMinsChange = (e) => {
    if (e.target.value <= 60) {
      const value = e.target.value
      const field = e.target.name.split(' ')
      const name = field[0]
      const period = field[1]

      setpatientCancelation((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleOnChange = () => {
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      isPatientCancellationAllowed: !isCancellation,
    }

    props.saveDoctorConfig(params)
    setisCancellation(!isCancellation)
  }

  return (
    <div className="option-sec sec-1">
      <div className="o1 qus-wrap reduce-bottom">
        <span className="qus">Patient Cancellation Allowed</span>
        <Switch
          className="cancel-toggle toggle-btn"
          checked={isCancellation}
          onClick={handleOnChange}
        />
      </div>
      {isCancellation && (
        <>
          <div className="o2 qus-wrap reduce-space">
            <span className="qus">How long before patient is allowed to cancel</span>

            <DataField
              name="cancel_period"
              days={patientCancellation.days}
              hours={patientCancellation.hrs}
              minutes={patientCancellation.mins}
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
