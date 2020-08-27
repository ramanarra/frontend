import React, { useState } from 'react'
import { Box, TextField, makeStyles, Typography } from '@material-ui/core'

import EditButton from '../../components/EditButton'

const useStyle = makeStyles(() => ({
  container: {
    padding: '40px 20px 20px 70px',
    width: 'calc(100% - 160px)',
  },
  box: {
    paddingTop: 30,
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
    paddingTop: 5,
    paddingRight: 5,
  },
  right: {
    width: 385,
  },
  discountField: {
    paddingTop: 30,
  },
  discountBox: {
    width: 30,
    '& div': {
      height: 30,
    },
    '& input': {
      padding: 8,
      color: '#010101',
    },
    '& fieldset': {
      border: 'none',
    },
  },
}))

function HospitalDetails({ hospitalDetails }) {
  const classes = useStyle()

  const [fieldName, setFieldName] = useState('')

  const [values, setValues] = useState({
    hospitalName: hospitalDetails.hospitalName,
    landmark: hospitalDetails.landmark,
    country: hospitalDetails.country,
    phone: hospitalDetails.phone,
    address: `${hospitalDetails.street1}${','} ${hospitalDetails.street2}`,
    state: `${hospitalDetails.city}${','} ${hospitalDetails.state}`,
    pincode: hospitalDetails.pincode,
    email: hospitalDetails.supportEmail,
    discount: hospitalDetails.discount,
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
            <EditButton
              value={'-5px'}
              name={'hospitalName'}
              onChange={handleOnChange}
              disable={handleDisable}
            />
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
            <EditButton
              value={'-5px'}
              name={'landmark'}
              onChange={handleOnChange}
              disable={handleDisable}
            />
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
            <EditButton
              value={'-5px'}
              name={'country'}
              onChange={handleOnChange}
              disable={handleDisable}
            />
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
            <EditButton
              value={'-5px'}
              name={'phone'}
              onChange={handleOnChange}
              disable={handleDisable}
            />
          </Box>
        </Box>
        <Box className={classes.left}>
          <Box className={classes.box} display="flex">
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
            />
          </Box>
          <Box className={classes.box} display="flex">
            <TextField
              name="state"
              className={classes.textField}
              variant="outlined"
              value={values.state}
              disabled={'state' === fieldName ? false : true}
            />
            <EditButton
              value={'-5px'}
              name={'state'}
              onChange={handleOnChange}
              disable={handleDisable}
            />
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
            <EditButton
              value={'-5px'}
              name={'pincode'}
              onChange={handleOnChange}
              disable={handleDisable}
            />
          </Box>
          <Box className={classes.box} display="flex">
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
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" className={classes.discountField}>
        <Typography className={classes.text}>
          Discount for new Patient First Consultancy
        </Typography>
        <TextField
          variant="outlined"
          className={classes.discountBox}
          value="0"
          disabled={'discount' === fieldName ? false : true}
        />
        <EditButton
          value={'-5px'}
          name={'discount'}
          onChange={handleOnChange}
          disable={handleDisable}
        />
      </Box>
    </Box>
  )
}

export default HospitalDetails
