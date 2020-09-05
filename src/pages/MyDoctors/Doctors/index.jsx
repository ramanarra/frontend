import React from 'react'
import { Box } from '@material-ui/core'

import InfoCard from './InfoCard'
import usePermissions from '../../../hooks/usePermissions'

const userReadRoles = [
  'SELF_USER_SETTINGS_READ',
  'ACCOUNT_USERS_SETTINGS_READ',
]

function Doctors({ doctorList }) {
  const [isUserSettingsRead, isAccountUserSettingsRead] = usePermissions(userReadRoles)

  const loginUser = localStorage.getItem('loginUser')

  if(loginUser === 'doctor') {
    localStorage.setItem('doctorName', doctorList[0].doctorName)
  }

  return (
    <Box>
      <Box display="flex" flexWrap="wrap">
        {doctorList.map((details, index) => {
          return (
            <InfoCard
              key={index}
              doctorDetails={details}
              isRead={isUserSettingsRead || isAccountUserSettingsRead}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default Doctors
