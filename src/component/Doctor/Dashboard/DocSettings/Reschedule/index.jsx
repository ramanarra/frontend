import React from 'react'

import useCustomFetch from '../../../../../hooks/useCustomFetch'
import PatientCancellation from './patientCancellation'
import PatientReschedule from './PatientReschedule'
import './reschedule.scss'

const key = { doctorKey: 'Doc_5' }
const Reschedule = () => {
  let [responseData, reFetch] = useCustomFetch(
    'POST',
    'calendar/doctorSettingsPersonalView',
    key
  )

  if (!responseData) {
    return null
  }

  const { configDetails } = responseData

  return (
    <div className="doctor-preference">
      <h4 className="pref-head">Cancellation/Reschedule Options</h4>
      <div className="options">
        {configDetails && (
          <PatientCancellation
            patientCancelationData={configDetails}
            doctorKey={key}
            reFetch={reFetch}
          />
        )}
        {configDetails && (
          <PatientReschedule
            patientRescheduleData={configDetails}
            doctorKey={key}
            reFetch={reFetch}
          />
        )}
      </div>
    </div>
  )
}

export default Reschedule
