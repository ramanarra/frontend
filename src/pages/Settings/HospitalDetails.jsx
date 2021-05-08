import React, { useState,useEffect } from 'react'
import { Box, TextField, makeStyles, Typography } from '@material-ui/core'
import EditButton from '../../components/EditButton'
import useStyle from './useHospitalDetailsStyle'

import { connect } from 'react-redux'
import { setHospitalName } from '../../actions/hospital'

function HospitalDetails({ hospitalDetails, isAbleToWrite, onSave, ...rest }) {
  const classes = useStyle()
  const [content, setContent] = useState({})
  const [fieldName, setFieldName] = useState([])

  const [values, setValues] = useState({
    accountKey: hospitalDetails.accountKey,
    hospitalPhoto: hospitalDetails.hospitalPhoto,
    hospitalName: hospitalDetails.hospitalName,
    landmark: hospitalDetails.landmark,
    country: hospitalDetails.country,
    phone: hospitalDetails.phone,
    street1: hospitalDetails.street1,
    cityState: hospitalDetails.cityState,
    pincode: hospitalDetails.pincode,
    supportEmail: hospitalDetails.supportEmail,
  })
 
  useEffect(()=>{
    !!hospitalDetails && localStorage.setItem('hospitalName',hospitalDetails.hospitalName)
    !!hospitalDetails && rest.setHospitalName(hospitalDetails.hospitalName)
  },[hospitalDetails])

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
      accountKey: hospitalDetails.accountKey,
      [event.target.name]: event.target.value,
    })
  }

  function handleDisable(name) {
    const newFieldName = fieldName.filter((field) => field !== name)
    const value = hospitalDetails[name]
    setFieldName(newFieldName)
    setValues({ ...values,
      [name]: value})
  }

  function handleOnSave() {

    if (Object.keys(content).length != 0) {
      setContent({
        ...content,
        accountKey: hospitalDetails.accountKey,
      })

      setValues({
        ...values,
        content
      })
      onSave(content)
    }
    setContent({})
  }



  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Box className={classes.right}>
          <Box className={classes.box} display="flex">
            <TextField
              name="hospitalName"
              placeholder="Hospital Name"
              className={classes.textField}
              variant="outlined"
              value={values.hospitalName}
              onChange={handleOnEdit}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'hospitalName').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'hospitalName'}
                onChange={handleOnChange}
                disable={() => handleDisable("hospitalName")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="landmark"
              placeholder="Land_Mark"
              className={classes.textField}
              variant="outlined"
              value={values.landmark}
              onChange={handleOnEdit}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'landmark').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'landmark'}
                onChange={handleOnChange}
                disable={() => handleDisable("landmark")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="country"
              placeholder="Country"
              className={classes.textField}
              variant="outlined"
              value={values.country}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z ]/ig, '')
                handleOnEdit(e)
              }}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'country').length)}
            />
            <Box> 
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'country'}
                onChange={handleOnChange}
                disable={() => handleDisable("country")}
                save={handleOnSave}
              />
            )}
           </Box>
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="phone"
              placeholder="Phone Number"
              className={classes.textField}
              variant="outlined"
              value={values.phone}
              onChange={handleOnEdit}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'phone').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'phone'}
                onChange={handleOnChange}
                disable={() => handleDisable("phone")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
        </Box>
        <Box className={classes.left}>
          <Box className={classes.box} display="flex">
            <TextField
              name="street1"
              placeholder="Street"
              className={classes.textField}
              variant="outlined"
              value={values.street1}
              onChange={handleOnEdit}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'street1').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'street1'}
                onChange={handleOnChange}
                disable={() => handleDisable("street1")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="cityState"
              placeholder="Enter City, State"
              className={classes.textField}
              variant="outlined"
              value={values.cityState}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z ]/ig, '')
                handleOnEdit(e)
              }}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'cityState').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'cityState'}
                onChange={handleOnChange}
                disable={() => handleDisable("cityState")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="pincode"
              placeholder="PIN Code"
              className={classes.textField}
              variant="outlined"
              value={values.pincode}
              onChange={handleOnEdit}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'pincode').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'pincode'}
                onChange={handleOnChange}
                disable={() => handleDisable("pincode")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="supportEmail"
              placeholder="Email-abc@gmail.com"
              className={classes.textField}
              variant="outlined"
              value={values.supportEmail}
              onChange={handleOnEdit}
              disabled={fieldName.length === 0 ? true : !Boolean(fieldName.filter((field) => field === 'supportEmail').length)}
            />
            <Box>
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'supportEmail'}
                onChange={handleOnChange}
                disable={() => handleDisable("supportEmail")}
                save={handleOnSave}
              />
            )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHospitalName: (value) => dispatch(setHospitalName(value)),
  }
}

export default connect(null, mapDispatchToProps)(HospitalDetails)
//export default HospitalDetails
