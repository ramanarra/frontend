import React, { useState, Fragment } from 'react'
import { Input, Switch } from 'antd'

import useSaveDoctorConfig from '../../../hooks/useSaveDoctorConfig'
import EditSave from '../../../../EditSave'
import './profile.scss'

function PreConsult({ configDetails, reFetch, docKey }) {
  const [editConsult, setEditConsult] = useState(false)
  const [hours, setHours] = useState(configDetails.preconsultationHours)
  const [minutes, setMinutes] = useState(configDetails.preconsultationMins)
  const [saveDoctorConfig] = useSaveDoctorConfig()

  const [preConsult, setPreConsult] = useState(
    configDetails.isPreconsultationAllowed
  )

  const handleHourChange = (event) => {
    if (event.target.value <= 12) {
      setHours(event.target.value)
    }
  }
  const handleMinuteChange = (event) => {
    if (event.target.value <= 60) {
      setMinutes(event.target.value)
    }
  }

  const handleOnConsultSave = () => {
    if (
      (configDetails.preconsultationMins === minutes || minutes === '') &&
      (configDetails.preconsultationHours === hours || hours === '')
    ) {
      return
    }

    const params = {
      doctorKey: docKey,
      preconsultationHours: hours,
      preconsultationMins: minutes,
    }

    saveDoctorConfig(params)
    setEditConsult(false)
    reFetch()
  }

  const handleOnConsultCancel = () => {
    setHours(configDetails.preconsultationHours)
    setMinutes(configDetails.preconsultationMins)
    setEditConsult(false)
  }

  const handleOnChnage = () => {
    const params = {
      doctorKey: docKey,
      isPreconsultationAllowed: !preConsult,
    }

    saveDoctorConfig(params)
    setPreConsult(!preConsult)
  }

  const addToolTipText = () => {
    if (
      (configDetails.preconsultationMins === minutes || minutes === '') &&
      (configDetails.preconsultationHours === hours || hours === '')
    ) {
      return 'you have not made any changes'
    }

    return ''
  }

  const DateField = () => (
    <span className="date-field-wrap">
      <Input
        name="hrs"
        className="date-field hrs-field"
        type="number"
        maxLength="2"
        value={hours}
        disabled={!editConsult}
        onChange={handleHourChange}
        addonAfter="Hrs"
      />
      <Input
        name="mins"
        className="date-field mins-field"
        type="number"
        value={minutes}
        maxLength="2"
        disabled={!editConsult}
        onChange={handleMinuteChange}
        addonAfter={
          <Fragment>
            <span style={{ paddingRight: 10 }}>Mins</span>
            <EditSave
              isEdit={editConsult}
              handleOnEdit={setEditConsult}
              handleOnSave={handleOnConsultSave}
              handleOnCancel={handleOnConsultCancel}
              tooltipText={addToolTipText()}
            />
          </Fragment>
        }
      />
    </span>
  )

  return (
    <Fragment>
      <div className="pre-consult">
        Pre-consultancy
        <Switch
          className="consult-toggle"
          checked={preConsult}
          onChange={handleOnChnage}
        />
      </div>
      <div>
        {preConsult && (
          <div className="consult-time-wrap">
            <div className="consult-time">
              Patient Pre-Consultancy Time:
              {DateField()}
            </div>
            <br />
            <span className="font-color">*</span>
            <span className="font-size">
              patient has to make him self avaliable to even before the slot time
              based on time provider
            </span>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default PreConsult
