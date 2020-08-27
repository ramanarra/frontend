import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Avatar,
  Button,
} from '@material-ui/core'

import EditButton from '../../components/EditButton'

const useStyle = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  photoContainer: {
    width: 210,
  },
  photo: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '7px solid #9DE1FF',
    marginTop: 65,
    marginRight: 10,
  },
  detailsContainer: {
    padding: '8px 20px 20px 15px',
    width: 'calc(100% - 210px)',
  },
  box: {
    paddingTop: 16,
  },
  textField: {
    width: 315,
    '& .MuiInputBase-root': {
      backgroundColor: '#f7f7f7',
      height: 35,
      '& input': {
        color: '#777777',
      },
      '& fieldset': {
        border: 'none',
      },
    },
  },
  left: {
    width: 385,
  },
  text: {
    fontSize: 13.5,
    color: '#424141',
    paddingBottom: 6,
  },
  right: {
    width: 385,
  },
  edit: {
    marginTop: -20,
  },
}))

function PatientDetails({ patientDetails, patientId, onSave }) {
  const classes = useStyle()

  const [fieldName, setFieldName] = useState('')

  const [values, setValues] = useState({
    patientId: Number(patientId),
    photo: patientDetails.photo,
    name: patientDetails.name,
    landmark: patientDetails.landmark,
    country: patientDetails.country,
    registrationNumber: patientDetails.registrationNumber,
    address: patientDetails.address,
    state: patientDetails.state,
    pincode: patientDetails.pincode,
    email: patientDetails.email,
  })

  function handleOnChange(value) {
    setFieldName(value)
  }

  function handleOnEdit(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  function handleDisable() {
    setFieldName('')
  }

  function handleOnSave() {
    onSave(values)
  }

  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Box className={classes.photoContainer} display="flex">
          <Avatar src={values.photo} className={classes.photo} name="photo" />
          <EditButton
            value={'110px'}
            name="photo"
            onChange={handleOnChange}
            disable={handleDisable}
          />
        </Box>
        <Box display="flex" className={classes.detailsContainer}>
          <Box className={classes.right}>
            <Box className={classes.box}>
              <Typography className={classes.text}>Name</Typography>
              <Box display="flex">
                <TextField
                  name="name"
                  className={classes.textField}
                  variant="outlined"
                  value={values.name}
                  onChange={handleOnEdit}
                  disabled={'name' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'name'}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.text}>Landmark</Typography>
              <Box display="flex">
                <TextField
                  name="landmark"
                  className={classes.textField}
                  variant="outlined"
                  value={values.landmark}
                  onChange={handleOnEdit}
                  disabled={'landmark' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'landmark'}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.text}>Country</Typography>
              <Box display="flex">
                <TextField
                  name={'country'}
                  className={classes.textField}
                  variant="outlined"
                  value={values.country}
                  onChange={handleOnEdit}
                  disabled={'country' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'country'}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.text}>Registration Number</Typography>
              <Box display="flex">
                <TextField
                  name="registrationNumber"
                  className={classes.textField}
                  variant="outlined"
                  value={values.registrationNumber}
                  onChange={handleOnEdit}
                  disabled={'registrationNumber' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'registrationNumber'}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.left}>
            <Box className={classes.box}>
              <Typography className={classes.text}>Address</Typography>
              <Box display="flex">
                <TextField
                  name="address"
                  className={classes.textField}
                  variant="outlined"
                  value={values.address}
                  onChange={handleOnEdit}
                  disabled={'address' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  name={'address'}
                  onChange={handleOnChange}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.text}>State</Typography>
              <Box display="flex">
                <TextField
                  name="state"
                  className={classes.textField}
                  variant="outlined"
                  value={values.state}
                  onChange={handleOnEdit}
                  disabled={'state' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  name={'state'}
                  onChange={handleOnChange}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.text}>Pincode</Typography>
              <Box display="flex">
                <TextField
                  name="pincode"
                  className={classes.textField}
                  variant="outlined"
                  value={values.pincode}
                  onChange={handleOnEdit}
                  disabled={'pincode' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  name={'pincode'}
                  onChange={handleOnChange}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.text}>Email ID</Typography>
              <Box display="flex">
                <TextField
                  name="email"
                  className={classes.textField}
                  variant="outlined"
                  value={values.email}
                  onChange={handleOnEdit}
                  disabled={'email' === fieldName ? false : true}
                />
                <EditButton
                  value={'-5px'}
                  name={'email'}
                  onChange={handleOnChange}
                  disable={handleDisable}
                  save={handleOnSave}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PatientDetails
