import React, { useState } from 'react'
import { Switch } from 'antd'

import EditSave from '../../../../EditSave'
import DataField from './DataField'

const PatientReschedule = (props) => {
  const [editPatientReschedule, setEditPatientReschedule] = useState(false)
  const [
    editPatientAutomaticCancelation,
    setEditPatientAutomaticCancelation,
  ] = useState(false)
  const [isRescheduleAllowed, setIsRescheduleAllowed] = useState(
    props.patientRescheduleData.isPatientRescheduleAllowed
  )
  const [patientAutoCancellationValues, setPatientAutoCancellationValues] = useState(
    {
      days: props.patientRescheduleData.autoCancelDays,
      hrs: props.patientRescheduleData.autoCancelHours,
      mins: props.patientRescheduleData.autoCancelMins,
    }
  )

  const [patientRescheduleValues, setPatientRescheduleValues] = useState({
    days: props.patientRescheduleData.rescheduleDays,
    hrs: props.patientRescheduleData.rescheduleHours,
    mins: props.patientRescheduleData.rescheduleMins,
  })

  const editPatientRescheduleData = () => {
    setEditPatientReschedule(!editPatientReschedule)
  }

  const editAutoCancelData = () => {
    setEditPatientAutomaticCancelation(!editPatientAutomaticCancelation)
  }
  const savePatientRescheduleData = () => {
    if (
      (props.patientRescheduleData.rescheduleDays === patientRescheduleValues.days ||
        patientRescheduleValues.days === '') &&
      (props.patientRescheduleData.rescheduleHours === patientRescheduleValues.hrs ||
        patientRescheduleValues.hrs === '') &&
      (props.patientRescheduleData.rescheduleMins === patientRescheduleValues.mins ||
        patientRescheduleValues.mins === '')
    ) {
      return
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      rescheduleDays: patientRescheduleValues.days,
      rescheduleHours: patientRescheduleValues.hrs,
      rescheduleMins: patientRescheduleValues.mins,
    }
    props.saveDoctorConfig(params)
    setEditPatientReschedule(false)
    props.reFetch()
  }

  const saveAutoCancelData = () => {
    if (
      (props.patientRescheduleData.autoCancelDays ===
        patientAutoCancellationValues.days ||
        patientAutoCancellationValues.days === '') &&
      (props.patientRescheduleData.autoCancelHours ===
        patientAutoCancellationValues.hrs ||
        patientAutoCancellationValues.hrs === '') &&
      (props.patientRescheduleData.autoCancelMins ===
        patientAutoCancellationValues.mins ||
        patientAutoCancellationValues.mins === '')
    ) {
      return
    }
    const params = {
      doctorKey: props.doctorKey.doctorKey,
      autoCancelDays: patientAutoCancellationValues.days,
      autoCancelHours: patientAutoCancellationValues.hrs,
      autoCancelMins: patientAutoCancellationValues.mins,
    }
    props.saveDoctorConfig(params)
    setEditPatientAutomaticCancelation(false)
    props.reFetch()
  }

  const addToolTipReschedule = () => {
    if (
      (props.patientRescheduleData.rescheduleDays === patientRescheduleValues.days ||
        patientRescheduleValues.days === '') &&
      (props.patientRescheduleData.rescheduleHours === patientRescheduleValues.hrs ||
        patientRescheduleValues.hrs === '') &&
      (props.patientRescheduleData.rescheduleMins === patientRescheduleValues.mins ||
        patientRescheduleValues.mins === '')
    ) {
      return 'you have not made any changes'
    }

    return ''
  }

  const addToolTipAutoCancelation = () => {
    if (
      (props.patientRescheduleData.autoCancelDays ===
        patientAutoCancellationValues.days ||
        patientAutoCancellationValues.days === '') &&
      (props.patientRescheduleData.autoCancelHours ===
        patientAutoCancellationValues.hrs ||
        patientAutoCancellationValues.hrs === '') &&
      (props.patientRescheduleData.autoCancelMins ===
        patientAutoCancellationValues.mins ||
        patientAutoCancellationValues.mins === '')
    ) {
      return 'you have not made any changes'
    }

    return ''
  }

  const cancelPatientRescheduleData = () => {
    setPatientRescheduleValues({
      ...patientRescheduleValues,
      ...{
        days: props.patientRescheduleData.rescheduleDays,
        hrs: props.patientRescheduleData.rescheduleHours,
        mins: props.patientRescheduleData.rescheduleMins,
      },
    })
    setEditPatientReschedule(false)
  }

  const cancelPatientAutoCancelData = () => {
    setPatientAutoCancellationValues({
      ...patientAutoCancellationValues,
      ...{
        days: props.patientRescheduleData.autoCancelDays,
        hrs: props.patientRescheduleData.autoCancelHours,
        mins: props.patientRescheduleData.autoCancelMins,
      },
    })
    setEditPatientAutomaticCancelation(false)
  }

  const handleDayChangeForReschedule = (e) => {
    if (e.target.value <= 365) {
      const value = e.target.value
      const field = e.target.name.split(' ')

      const period = field[1]

      setPatientRescheduleValues((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleHrsChangeForReschedule = (e) => {
    if (e.target.value <= 12) {
      const value = e.target.value
      const field = e.target.name.split(' ')

      const period = field[1]

      setPatientRescheduleValues((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleMinsChangeForReschedule = (e) => {
    if (e.target.value <= 60) {
      const value = e.target.value
      const field = e.target.name.split(' ')

      const period = field[1]

      setPatientRescheduleValues((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleDayChangeForAutoCancellation = (e) => {
    if (e.target.value <= 365) {
      const value = e.target.value
      const field = e.target.name.split(' ')
      const period = field[1]

      setPatientAutoCancellationValues((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleHrsChangeForAutoCancellation = (e) => {
    if (e.target.value <= 24) {
      const value = e.target.value
      const field = e.target.name.split(' ')

      const period = field[1]

      setPatientAutoCancellationValues((prev) => {
        return {
          ...prev,
          [period]: value,
        }
      })
    }
  }

  const handleMinsChangeForAutoCancellation = (e) => {
    if (e.target.value <= 60) {
      const value = e.target.value
      const field = e.target.name.split(' ')

      const period = field[1]

      setPatientAutoCancellationValues((prev) => {
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
      isPatientRescheduleAllowed: !isRescheduleAllowed,
    }

    props.saveDoctorConfig(params)
    setIsRescheduleAllowed(!isRescheduleAllowed)
  }

  return (
    <div className="option-sec sec-2">
      <div className="o3 qus-wrap">
        <span className="qus">Patient Reschedule</span>
        <Switch
          className="reschedule-toggle toggle-btn"
          checked={isRescheduleAllowed}
          onClick={handleOnChange}
        />
      </div>
      {isRescheduleAllowed && (
        <>
          <div className="o4 qus-wrap">
            <span className="qus reduce-top">
              How long before patient is allowed to re-schedule
            </span>
            <DataField
              name="reschedule_period"
              days={patientRescheduleValues.days}
              hours={patientRescheduleValues.hrs}
              minutes={patientRescheduleValues.mins}
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
              days={patientAutoCancellationValues.days}
              hours={patientAutoCancellationValues.hrs}
              minutes={patientAutoCancellationValues.mins}
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
  )
}
export default PatientReschedule
