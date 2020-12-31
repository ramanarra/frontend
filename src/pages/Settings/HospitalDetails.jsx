import React, { useState } from 'react'
import { Box, TextField, makeStyles, Typography } from '@material-ui/core'

import EditButton from '../../components/EditButton'
import useStyle from './useHospitalDetailsStyle'

function HospitalDetails({ hospitalDetails, isAbleToWrite, onSave }) {
  const classes = useStyle()
  const [content, setContent] = useState({
    
  })
  const [fieldName, setFieldName] = useState('')

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

  function handleOnChange(value) {
    setFieldName(value)
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

  function handleDisable() {
    setFieldName('')
   
  }

  function handleOnSave() {
    
    if(Object.keys(content).length != 0)
    { 
      setContent({
        ...content,
        accountKey: hospitalDetails.accountKey,
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
              className={classes.textField}
              variant="outlined"
              value={values.hospitalName}
              onChange={handleOnEdit}
              disabled={'hospitalName' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'hospitalName'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="landmark"
              className={classes.textField}
              variant="outlined"
              value={values.landmark}
              onChange={handleOnEdit}
              disabled={'landmark' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'landmark'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="country"
              className={classes.textField}
              variant="outlined"
              value={values.country}
              onChange={handleOnEdit}
              disabled={'country' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'country'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="phone"
              className={classes.textField}
              variant="outlined"
              value={values.phone}
              onChange={handleOnEdit}
              disabled={'phone' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'phone'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
        </Box>
        <Box className={classes.left}>
          <Box className={classes.box} display="flex">
            <TextField
              name="street1"
              className={classes.textField}
              variant="outlined"
              value={values.street1}
              onChange={handleOnEdit}
              disabled={'address' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'address'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="cityState"
              placeholder="Enter City, State"
              className={classes.textField}
              variant="outlined"
              value={values.cityState}
              onChange={handleOnEdit}
              disabled={'state' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'state'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="pincode"
              className={classes.textField}
              variant="outlined"
              value={values.pincode}
              onChange={handleOnEdit}
              disabled={'pincode' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'pincode'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="supportEmail"
              className={classes.textField}
              variant="outlined"
              value={values.supportEmail}
              onChange={handleOnEdit}
              disabled={'email' === fieldName ? false : true}
            />
            {isAbleToWrite && (
              <EditButton
                value={'-5px'}
                name={'email'}
                onChange={handleOnChange}
                disable={handleDisable}
                save={handleOnSave}
              />
            )}
          </Box>
        </Box>
      </Box>
      {/* <Box display="flex" className={classes.discountField}>
        <Typography className={classes.text}>
          Discount for new Patient First Consultancy
        </Typography>
        <TextField
          variant="outlined"
          className={classes.discountBox}
          value="0"
          disabled={'discount' === fieldName ? false : true}
        />
        {isAbleToWrite && (
          <EditButton
            value={'-5px'}
            name={'discount'}
            onChange={handleOnChange}
            disable={handleDisable}
            save={handleOnSave}
          />
        )}
      </Box> */}
    </Box>
  )
}

export default HospitalDetails
