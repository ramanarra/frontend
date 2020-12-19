import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Paper, Button, Snackbar } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { GoCalendar } from 'react-icons/go'
import { useForm, Controller } from 'react-hook-form'
import MomentUtils from '@date-io/moment'
import StarIcon from '@material-ui/icons/Star'

import Textfield from '../../components/Textfield'
import './style.scss'
import Api, { URL } from '../../api'
import SnackBar from '../../components/SnackBar'

const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const PatientSignup = (props) => {
  const { register, watch, errors, control, handleSubmit } = useForm()

  const watchDateOfBirth = watch('dateOfBirth', null)

  const [Error, setError] = useState(false)

  const [message, setMessage] = useState(null)

  const [detail, setDetail] = useState(null)

  const [response, setResponse] = useState(null)

  const [count, setCount] = useState(false)

  const [age, setAge] = useState(null)

  const currentTime = moment().format('DD/MM/YYYY HH:mm:ss')

  const redirectToLogin = () => props.history.push('/login')

  const redirectToDoctorLogin = () => props.history.push('/doctor/registration')

  const onSubmit = (data) => {
    if (data.phone === data.alternateContact) {
      setMessage('Both contact numbers should not be same')
      setError(true)
    } else {
      Api.post(URL.patientSignup, data)
        .then((res) => {
          const { data } = res
          setCount(true)
          setResponse(data)
          if (data.patient?.accessToken) {
            localStorage.setItem('virujhToken', data.patient.accessToken)
            localStorage.setItem('patientId', data.patient.patientId)
            localStorage.setItem(
              'patientName',
              `${data.details.firstName} ${data.details.lastName}`
            )
            setMessage('Thanks! Your account has been created successfully')
            setDetail(data)
            setError(true)
          } else if (data?.patient.update === 'updated password') {
            setError(true)
            setMessage('Created successfully...Please do signin')
          } else if (data?.statusCode) {
            setError(true)
            setMessage(data?.message)
          }
        })
        .catch((err) => {
          setCount(true)
        })
    }
  }

  useEffect(() => {
    if (count) {
      if (response) {
        setError(true)
        setMessage(response.message)
        setCount(false)
      } else {
        setError(true)
        setMessage('Something went Wrong')
        setCount(false)
      }
    }
  }, [response, count])

  useEffect(() => {
    if (watchDateOfBirth) {
      const difference = moment(currentTime, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(watchDateOfBirth, 'DD/MM/YYYY HH:mm:ss')
      )
      const years = moment.duration(difference).years()
      setAge(years)
    }
  }, [watchDateOfBirth])

  const validationErr = {
    name: 'Invalid name',
    phone: 'Invalid phone number',
    age: 'Invalid age',
    passwordValidation: 'password must contain one alphabet and one numeric',
    passwordLength: 'Password must has minimum length of 6 and maximum length of 12',
  }

  function handleOnClose(reason) {
    if (reason === 'clickaway') {
      return
    }
    if (message === 'Created successfully...Please do signin') {
      props.history.push('/login')
    }
    if (detail?.patient?.accessToken) {
      props.history.push('/patient/appointments/upcoming')
    }
    setError(false)
  }

  return (
    <div className="patient-sign-up">
      <div className="logo-wrap">
        <img
          src={require('../../assets/img/logo.png')}
          alt="Virujh"
          className="logo"
        />
      </div>
      <Paper className="card" elevation={0}>
        <h3 className="title">Patient register</h3>
        <form className="fields" onSubmit={handleSubmit(onSubmit)}>
          <div className="field-wrap field-partition">
            <Textfield
              name="firstName"
              label="First Name"
              placeholder="Arul"
              inputProps={{
                ref: register({
                  required: 'Please enter your first name',
                  minLength: {
                    value: 3,
                    message: validationErr.name,
                  },
                  pattern: {
                    value: /^[A-Za-z]*$/,
                    message: validationErr.name,
                  },
                }),
              }}
              error={!!errors.firstName && errors.firstName.message}
              hasValidation
            />
            <Textfield
              name="lastName"
              placeholder="Prakash"
              label="Last Name"
              inputProps={{
                ref: register({
                  required: 'Please enter your last name',
                  pattern: {
                    value: /^[A-Za-z]*$/,
                    message: validationErr.name,
                  },
                }),
              }}
              error={!!errors.lastName && errors.lastName.message}
              hasValidation
            />
          </div>
          <div className="field-wrap field-partition">
            <Textfield
              name="phone"
              label="Contact Number"
              placeholder="8745142572"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Please enter your phone number',
                  maxLength: {
                    value: 10,
                    message: validationErr.phone,
                  },
                  minLength: {
                    value: 10,
                    message: validationErr.phone,
                  },
                }),
              }}
              error={!!errors.phone && errors.phone.message}
              hasValidation
            />
            <Textfield
              name="alternateContact"
              label="Alternate Contact Number"
              placeholder="7451254785"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Please enter your alternate number',
                  maxLength: {
                    value: 10,
                    message: validationErr.phone,
                  },
                  minLength: {
                    value: 10,
                    message: validationErr.phone,
                  },
                }),
              }}
              error={!!errors.alternateContact && errors.alternateContact.message}
              hasValidation
            />
          </div>
          <div className="field-wrap field-partition">
            <div className="dob-field">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="field-label">Date of Birth
                <StarIcon className="star-icon" />
                </div>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  as={
                    <DatePicker
                      className="date-field"
                      variant="inline"
                      inputVariant="outlined"
                      size="small"
                      format="DD/MM/YYYY"
                      placeholder="07/03/1985"
                      disableFuture
                      autoOk
                      InputProps={{
                        endAdornment: <GoCalendar />,
                      }}
                    />
                  }
                  defaultValue={null}
                  rules={{
                    required: 'Please select your date of birth',
                  }}
                />
                <div className="error-msg">
                  {!!errors.dateOfBirth && errors.dateOfBirth.message}
                </div>
              </MuiPickersUtilsProvider>
            </div>
            <Textfield
              name="age"
              label="Age"
              type="number"
              placeholder="35"
              value={age}
              inputProps={{
                ref: register({
                  required: 'Please enter your age',
                  maxLength: {
                    value: 3,
                    message: validationErr.age,
                  },
                }),
              }}
              error={!!errors.age && errors.age.message}
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <Textfield
              name="address"
              label="Address"
              placeholder="#123, xyz st"
              inputProps={{
                ref: register({ required: 'Please enter your address' }),
              }}
              error={!!errors.address && errors.address.message}
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <Textfield
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              inputProps={{
                ref: register({
                  required: 'Please enter your password',
                  maxLength: {
                    value: 12,
                    message: validationErr.passwordLength,
                  },
                  minLength: {
                    value: 6,
                    message: validationErr.passwordLength,
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
                    message: validationErr.passwordValidation,
                  },
                }),
              }}
              error={!!errors.password && errors.password.message}
              hasValidation
            />
          </div>
          <div className="submt-btn-wrap">
            <Button type="submit" className="signup-btn">
              Signup
            </Button>
            <div className="signin-btn-wrap">
              Already have a account?
              <span className="signin-btn" onClick={redirectToLogin}>
                Signin
              </span>
            </div>
             
            {/* Navigating to doctor registration  */}

            <div className="signin-btn-wrap signin-btn-align">
              If you are a new doctor?
              <span className="signin-btn" onClick={redirectToDoctorLogin}>
               Click here
              </span>
            </div>

          </div>
        </form>
      </Paper>
      {response && response.patient?.accessToken && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'success'}
        />
      )}
      {response && response.patient?.update && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'success'}
        />
      )}
      {response && response.statusCode && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'info'}
        />
      )}
      {!response && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'error'}
        />
      )}
    </div>
  )
}

export default PatientSignup
