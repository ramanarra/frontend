import React, { useMemo } from 'react'

import userImg from '../../../../../assets/img/user-img.jpg'
import SignImg from '../../../../../assets/img/sign.jpg'
import useCustomFetch from '../../../../../hooks/useCustomFetch'
import StaticDoctorDetails from './StaticDoctorDetails'
import ConsulationBaseFess from './ConsulationBaseFess'
import PreConsult from './PreConsult'
import './profile.scss'

const Profile = (props) => {
  const docKey = useMemo(() => {
    return { doctorKey: props.location.state.key }
  }, [props.location])

  let [responseData, reFetch] = useCustomFetch(
    'POST',
    'calendar/doctorSettingsPersonalView',
    docKey
  )

  if (!responseData) {
    return null
  }

  const { doctorDetails, configDetails } = responseData

  return (
    <div className="doc-profile">
      <h1 className="doc-head">Doctor Details</h1>
      <div className="prof-area">
        <div className="prof-img align">
          <img src={userImg} alt={doctorDetails && doctorDetails.doctorName} />
        </div>
        <div className="prof-fields">
          <div className="fields">
            {doctorDetails && <StaticDoctorDetails doctorDetails={doctorDetails} />}
            {configDetails && (
              <ConsulationBaseFess
                configDetails={configDetails}
                reFetch={reFetch}
                docKey={props.location.state.key}
              />
            )}
            <div className="sign-box">
              <img src={SignImg} alt="signature" />
            </div>
            {configDetails && (
              <PreConsult
                configDetails={configDetails}
                reFetch={reFetch}
                docKey={props.location.state.key}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
