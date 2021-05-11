import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPatientName } from '../../actions/patient'
import { setPatientProfile } from '../../actions/patient'
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded'
import useFileUpload from '../../hooks/useFileUpload'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Avatar,
  Button,
  Snackbar,
} from '@material-ui/core'
import { METHOD, URL } from '../../api'
import EditButton from '../../components/EditButton'
import useStyle from './usePatientDetailsStyle'
import useManualFetch from '../../hooks/useManualFetch'

import { Tooltip, UploadImageTip } from '../../components/Tooltip'
import messages from '../../lib/iconMsg'
import Alert from '@material-ui/lab/Alert'

function PatientDetails({ patientDetails, patientId, onSave, setReload, reload, name, setName, ...rest }) {
  const classes = useStyle()
  const [openSpinner, setOpenSpinner] = useState(false)
  const [handleFileUpload, data] = useFileUpload();
  const [image, setImage] = useState([])
  const [fieldName, setFieldName] = useState([])
  const formdata = new FormData();
  const [content, setContent] = useState({
    patientId: Number(patientId),
  })
  const [profile, setProfile] = useState({
    patientId: Number(patientId),
  })
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const handlePopupMsg = () => {
    setOpen(true)
  }
 

  const [values, setValues] = useState({
    patientId: Number(patientId),
    photo: patientDetails.photo,
    //name: patientDetails.name,
    firstName: patientDetails.firstName ?? '-',
    lastName: patientDetails.lastName ? patientDetails.lastName : '-',

    landmark: patientDetails.landmark ? patientDetails.landmark : '-',
    country: patientDetails.country ? patientDetails.country : '-',
    registrationNumber: patientDetails.registrationNumber ? patientDetails.registrationNumber : '-',
    address: patientDetails.address ? patientDetails.address : '-',
    city: patientDetails.city ? patientDetails.city : '-',
    state: patientDetails.state ? patientDetails.state : '-',
    pincode: patientDetails.pincode ? patientDetails.pincode : '-',
    email: patientDetails.email ? patientDetails.email : '-',

  })

  useEffect(() => {
    localStorage.setItem('patientName', `${patientDetails.firstName} ${patientDetails.lastName}`)
    localStorage.setItem('photo', patientDetails.photo)
    rest.setPatientName(`${patientDetails.firstName} ${patientDetails.lastName}`)
    rest.setPatientProfile(patientDetails.photo)
  }, [patientDetails])


  function handleOnChange(value) {
    const newFieldName = [...fieldName]
    newFieldName.push(value)
    setFieldName(newFieldName)
  }

  function handleOnEdit(event) {
    
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
    /* if (event.target.name === 'firstName') {
      patientDetails.firstName = event.target.value;
    }

    if (event.target.name === 'lastName') {
      patientDetails.lastName = event.target.value;
    } */
    setContent({
      ...content,
      patientId: Number(patientId),
      name: `${patientDetails.firstName} ${patientDetails.lastName}`,
      [event.target.name]: event.target.value,
    })
    if (event.target.name === 'name') {
      setName(true)
    }
  }

  function handleDisable(name) {
    const newFieldName = fieldName.filter((field) => field !== name)
    const value = patientDetails[name]
    setFieldName(newFieldName)
    setValues({
      ...values,
      [name]: value
    })

  }

  function handleModule(){
    setContent();
  }

  function handleOnSave(key) {
    if (Object.keys(content).length != 0) {
      if (key && !content[key]) {
        setShowAlert(true)
        setAlertMsg('Empty data not allowed for required fields')
      } else {
        setShowAlert(false)
        setAlertMsg('')
        
        setContent({
          ...content,
          patientId: Number(patientId),
        })
  
        setValues({
          ...values,
          content
        })
  
        onSave(content)
      }
    }
    setContent({});
  }

  //uploading profile image
  function handleChange(e) {
    const item = e.target.files;
    setImage(item);
    formdata.append('files', item[0])
    formdata.append('patientId', patientId)

    handleFileUpload(formdata);
    setOpenSpinner(true)
  }

  if (name && reload) {
    //localStorage.setItem('patientName', patientDetails.name)
    localStorage.setItem('patientName', `${patientDetails.firstName} ${patientDetails.lastName}`)
    setName(false)
    setReload(false)
    history.push('/patient/setting')
  }

  useEffect(() => {
    !!data && setProfile({ ...profile, photo: data.data })
  }, [data])

  useEffect(() => {
    !!data && !!profile && onSave(profile)
    setOpenSpinner(false)
  }, [profile])

  const handleSnackBarClose = () => {
    setShowAlert(false)
    setAlertMsg('')
  }

  return (
    <Box className={classes.container}>
      {/* {showAlert && <Alert severity="warning">{alertMsg}</Alert>} */}

      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="warning">
          {alertMsg}
        </Alert>
      </Snackbar>
      
      <Box display="flex">

        {/* profile photo edit */}
        <Box className={classes.photoContainer} display="flex">
          <Avatar
            src={patientDetails.photo}
            className={classes.photo}
            alt="profile photo"
            name="photo"
          />
          <label for="files" name="files" >
            <div style={{ display: "flex" }}>
              <UploadImageTip title={messages.image} placement='right' style={{ marginTop: "190px", marginLeft: "-40px" }} />
            </div>
          </label>
          <input
            type="file"
            name="files"
            onChange={handleChange}
            id="files"
            accept=".jpg,.png,.jpeg"
            required
            style={{ visibility: "hidden" }}
          />

          {openSpinner && (
            <Backdrop open={openSpinner} >
              <CircularProgress className={classes.backdrop} color="block !important" />
            </Backdrop>
          )}
        </Box>
        <Box display="flex" className={classes.detailsContainer}>
          <Box className={classes.right}>
            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>First Name</Typography>
              <Box display="flex">
                <TextField
                  name="firstName"
                  className={classes.textField}
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'firstName').length)}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'firstName'}
                  disable={() => handleDisable("firstName")}
                  save={() => handleOnSave('firstName')}
                />
              </Box>
            </Box>

            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>Last Name</Typography>
              <Box display="flex">
                <TextField
                  name="lastName"
                  className={classes.textField}
                  variant="outlined"
                  value={values.lastName}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'lastName').length)}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'lastName'}
                  disable={() => handleDisable("lastName")}
                  save={() => handleOnSave('lastName')}
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
                  onClick={handleModule}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'landmark').length)}
                  />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'landmark'}
                  disable={() => handleDisable("landmark")}
                  save={() => handleOnSave()}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>Country</Typography>
              <Box display="flex">
                <TextField
                  name={'country'}
                  className={classes.textField}
                  variant="outlined"
                  value={values.country}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'country').length)}
                  />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'country'}
                  disable={() => handleDisable("country")}
                  save={() => handleOnSave('country')}
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'registrationNumber').length)}
                  />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'registrationNumber'}
                  disable={() => handleDisable("registrationNumber")}
                  save={() => handleOnSave('registrationNumber')}
                />
              </Box>
            </Box>

          </Box>
          <Box className={classes.left}>
            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>Address</Typography>
              <Box display="flex">
                <TextField
                  name="address"
                  className={classes.textField}
                  variant="outlined"
                  value={values.address}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'address').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'address'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("address")}
                  save={() => handleOnSave('address')}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>State</Typography>
              <Box display="flex">
                <TextField
                  name="state"
                  className={classes.textField}
                  variant="outlined"
                  value={values.state}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'state').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'state'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("state")}
                  save={() => handleOnSave('state')}
                />
              </Box>
            </Box>

            {/* Adding city  */}
            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>City</Typography>
              <Box display="flex">
                <TextField
                  name="city"
                  className={classes.textField}
                  variant="outlined"
                  value={values.city}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'city').length)}
                />
                <EditButton
                  value={'-5px'}
                  name={'city'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("city")}
                  save={() => handleOnSave('city')}
                />
              </Box>
            </Box>

            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>Pincode</Typography>
              <Box display="flex">
                <TextField
                  name="pincode"
                  className={classes.textField}
                  variant="outlined"
                  value={values.pincode}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'pincode').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'pincode'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("pincode")}
                  save={() => handleOnSave('pincode')}
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Typography className={`${classes.text} required-field`}>Email ID</Typography>
              <Box display="flex">
                <TextField
                  name="email"
                  className={classes.textField}
                  variant="outlined"
                  value={values.email}
                  onChange={handleOnEdit}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'email').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'email'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("email")}
                  save={() => handleOnSave('email')}
                />
                
              </Box>
             
            </Box>
            
          </Box>
         
        </Box>
         
      </Box>

    </Box>
    
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPatientName: (value) => dispatch(setPatientName(value)),
    setPatientProfile: (value) => dispatch(setPatientProfile(value)),
  }
  }

export default connect(null, mapDispatchToProps)(PatientDetails)

// export default (PatientDetails)
