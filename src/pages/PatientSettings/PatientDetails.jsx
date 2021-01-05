import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FileAdding from './FileAdding'

import { 
  Box,
  Typography,
  TextField,
  makeStyles,
  Avatar,
  Button,
} from '@material-ui/core'
import { METHOD, URL } from '../../api'
import EditButton from '../../components/EditButton'
import useStyle from './usePatientDetailsStyle'
import useManualFetch from '../../hooks/useManualFetch'

function PatientDetails({ patientDetails, patientId, onSave, setReload, reload,name, setName }) {
  const classes = useStyle()
  const [fieldName, setFieldName] = useState([])
  const [content,setContent]=useState({
    patientId: Number(patientId),
 })
 const history = useHistory()
  const [ open, setOpen] = useState(false)
   const handlePopupMsg=()=>{
     setOpen(true)
   }
  const [values, setValues] = useState({
    patientId: Number(patientId),
    photo: patientDetails.photo,
    name: `${patientDetails.firstName}${' '}${patientDetails?.lastName}`,
    landmark: patientDetails.landmark ? patientDetails.landmark : '-',
    country: patientDetails.country ? patientDetails.country : '-',
    registrationNumber: patientDetails.registrationNumber ? patientDetails.registrationNumber : '-',
    address: patientDetails.address ? patientDetails.address : '-',
    state: patientDetails.state ? patientDetails.state : '-',
    pincode: patientDetails.pincode ? patientDetails.pincode : '-',
    email: patientDetails.email ? patientDetails.email : '-',

  })

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
    setContent({
      ...content,
       patientId: Number(patientId),
      [event.target.name]: event.target.value,
    })
    if(event.target.name === 'name') {
      setName(true)
    }
  }

  function handleDisable(name) {
    const newFieldName = fieldName.filter((field) => field !== name)

    const value = patientDetails[name]

    setFieldName(newFieldName)

    setValues({ ...values,
      [name]: value})

  }

  function handleModule(){
    setContent();
  }

  function handleOnSave() {
    if(Object.keys(content).length != 0)
    { 
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
    setContent({ });
  }

  if(name && reload) {
    localStorage.setItem('patientName', patientDetails.name)
    setName(false)
    setReload(false)
    history.push('/patient/setting')
  }

  
  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Box className={classes.photoContainer} display="flex">
          <Avatar src={values.photo} className={classes.photo} name="photo" />
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'name').length)}
                />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'name'}
                  disable={() => handleDisable("name")}
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
                  onClick={handleModule}
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'landmark').length)}
                  />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'landmark'}
                  disable={() => handleDisable("landmark")}
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'country').length)}
                  />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'country'}
                  disable={() => handleDisable("country")}
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'registrationNumber').length)}
                  />
                <EditButton
                  value={'-5px'}
                  onChange={handleOnChange}
                  name={'registrationNumber'}
                  disable={() => handleDisable("registrationNumber")}
                  save={handleOnSave}
                />
              </Box>
            </Box>
        
          <Box className={classes.box}>
            <Typography className={classes.text}>Upload files</Typography>
            <Box className="divDisplay"> 
             <FileAdding />
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'address').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'address'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("address")}
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'state').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'state'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("state")}
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'pincode').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'pincode'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("pincode")}
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
                  disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'email').length)}
                  />
                <EditButton
                  value={'-5px'}
                  name={'email'}
                  onChange={handleOnChange}
                  disable={() => handleDisable("email")}
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
