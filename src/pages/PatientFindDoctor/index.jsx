import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { METHOD, URL } from '../../api'
import useManualFetch from '../../hooks/useManualFetch'
import DoctorList from './DoctorList'
import DoctorListwithHospital from './DoctorListWithHospital'
import LeftArrow from '../../assets/img/left-arrow.svg'
import { useHistory } from 'react-router-dom'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    padding: '17px 20px 20px 20px',
    height: '100%',
    background: '#f9f9f9',
  },
  header: {
    width: '97.7%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    height: 95,
    padding: '0px 14px',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },
  doctorList: {
    width: '100%',
    height: 'calc(100% - 95px)',
    overflowY: 'auto',
  },
  heading: {
    fontSize: 17.5,
    color: '#797777',
    paddingTop: 10,
    paddingLeft: 15,
  },

  searchField: {
    width: 340,
    paddingTop: 20,
    '& div': {
      height: 32,
      paddingRight: 8,
      borderRadius: 5,
      border: '1px  solid #c0bfbf',
    },
    '& svg': {
      width: 15,
      marginRight: 2,
      marginTop: 3,
    },
    '& fieldset': {
      marginLeft: -0.5,
      marginTop: 1,
    },
  },
  leftArrow: {
    width: 20,
    cursor: 'pointer',
    height: '3.7%',
    marginTop: 10.5,
  },
}))

function PatientFindDoctor() {
  const classes = useStyle()

  const [name, setName] = useState('')

  const history = useHistory()

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  useEffect(() => {
    if (name === '') {
      updateData(METHOD.GET, URL.patientDoctorList)
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
            Find Your Doctors / Hospitals
          </Typography>
        </Box>

        <TextField
          placeholder="search by code or name"
          variant="outlined"
          className={classes.searchField}
          onChange={handleOnChange}
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </Box>
      <Box className={classes.doctorList}>
        {name === '' && Array.isArray(data) && <DoctorList doctorLists={data} />}
        {name !== '' && !Array.isArray(data) && (
          <DoctorListwithHospital doctorAndHospitalList={data} />
        )}
      </Box>
    </Box>
  )
}

export default PatientFindDoctor
