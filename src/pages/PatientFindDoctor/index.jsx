import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Typography, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { METHOD, URL } from '../../api'
import useManualFetch from '../../hooks/useManualFetch'
import DoctorList from './DoctorList'
import DoctorListwithHospital from './DoctorListWithHospital'
import LeftArrow from '../../assets/img/left-arrow.svg'
import useStyle from './useStyle'
function PatientFindDoctor() {
  const classes = useStyle()
  
  const history = useHistory()

  const [heading, setHeading] = useState('')

  const [name, setName] = useState('')

  const [isHospital, setIsHospital] = useState(false)

  const [updateData, updateError, isUpdating, data] = useManualFetch()
  const validationErr={
    search:'Invalid Format'

  }

  useEffect(() => {
    if (name === '') {
      updateData(METHOD.GET, URL.patientDoctorList)
      setHeading('Find Your Doctors / Hospitals')
    }
  }, [])

  const handleOnChange = (event) => {
    setName(event.target.value)
    if (event.target.value !== '') {
      updateData(METHOD.POST, URL.findDoctorByCodeOrName, {
        codeOrName: String(event.target.value),
      })
    } else {
      updateData(METHOD.GET, URL.patientDoctorList)
      setHeading('Find Your Doctors / Hospitals')
      setIsHospital(false)
    }
  }

  function handleOnClick() {
    history.push('/patient/appointments/upcoming')
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Box display="flex">
          <img
            src={LeftArrow}
            alt="Left Arrow"
            className={classes.leftArrow}
            onClick={handleOnClick}
          />
          <Typography className={classes.heading} variant="h5">
            {heading}
          </Typography>
        </Box>

        <TextField
          placeholder="search by code or name"
          variant="outlined"
          name="search"
          className={classes.searchField}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: <SearchIcon /> 
            
          }}
        />
      </Box>
      <Box className={classes.doctorList}>
        {name === '' && Array.isArray(data) && (
          <DoctorList doctorLists={data} isHospital={isHospital} />
        )}
        {name !== '' && !Array.isArray(data) && (
          <DoctorListwithHospital
            doctorAndHospitalList={data}
            name={setHeading}
            isHospital={isHospital}
            hospital={setIsHospital}
          />
        )}
      </Box>
    </Box>
  )
}

export default PatientFindDoctor
