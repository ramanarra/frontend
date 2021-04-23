import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Paper, Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { GoCalendar } from 'react-icons/go'
import { useForm, Controller } from 'react-hook-form'
import MomentUtils from '@date-io/moment'
import StarIcon from '@material-ui/icons/Star'

import Textfield from '../../components/Textfield'
import './style.scss'
import Api, { URL } from '../../api'
import SnackBar from '../../components/SnackBar'
import { MapRounded, NoEncryptionTwoTone, SportsRugbySharp, Star } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    fontSize: 12,
    color: '#636363',
  },
  select: {
    fontSize: 12,
    color: '#636363',
    width: 390,
  },
})

const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const PatientSignup = (props) => {
  const classes = useStyles()
  const { register, watch, errors, control, handleSubmit } = useForm()

  const watchDateOfBirth = watch('dateOfBirth', null)

  const [Error, setError] = useState(false)

  const [message, setMessage] = useState(null)

  const [detail, setDetail] = useState(null)

  const [response, setResponse] = useState(null)

  const [count, setCount] = useState(false)

  const [age, setAge] = useState(null)

  const [password, setPassword] = useState()

  const [honorific, setHonorific] = useState('Mr')

  const[gender , setGender] = useState();

  const currentTime = moment().format('DD/MM/YYYY HH:mm:ss')

  const redirectToLogin = () => props.history.push('/login')

  const redirectToDoctorRegistration = () => props.history.push('/doctor/registration')

  const redirectToDoctorLogin = () => props.history.push('/doctor/login')

  const onSubmit = (data) => {
    console.log(data)
    data = honorific ? ({ ...data, "honorific": honorific }) : data
    data = gender ? ({ ...data, "gender": gender }) : data
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
    email: 'Invalid Email',
    age: 'Invalid age',
    passwordValidation: 'password must contain one alphabet and one numeric',
    passwordLength: 'Password must has minimum length of 6 and maximum length of 12',
  }

  function handleChange(e) {
    setPassword(e.target.value)
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

  const handleHonorificChange = (event) => {
    setHonorific(event.target.value)
  }

  const handleGenderChange=(event)=>{
    setGender(event.target.value)
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
          <div className="honorific-head">
            <label className="honorific-title">Honorific</label>
            <Star className="honorific-star-icon" />
          </div>

          <Select className="honorific-field-partition" classes={{ select: classes.select, underline: classes.underline }}
            value={honorific}
            onChange={handleHonorificChange}
          >
            <MenuItem classes={{ root: classes.root }} value={"Mr"}>Mr.</MenuItem>
            <MenuItem classes={{ root: classes.root }} value={"Ms"}>Ms.</MenuItem>
            <MenuItem classes={{ root: classes.root }} value={"Mrs"}>Mrs.</MenuItem>
          </Select>

          <div className="honorific-head">
            <label className="honorific-title">Gender</label>
            <Star className="honorific-star-icon" />
          </div>
          <Select className="honorific-field-partition" classes={{ select: classes.select, underline: classes.underline }}
            value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem classes={{ root: classes.root }} value={"Male"}>Male</MenuItem>
            <MenuItem classes={{ root: classes.root }} value={"Female"}>Female</MenuItem>
            <MenuItem classes={{ root: classes.root }} value={"Others"}>Others</MenuItem>
          </Select>

          <div className="field-wrap field-partition">
            <Textfield
              name="firstName"
              label="First Name"
              placeholder="Arul"
              isRequired
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
              isRequired
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
              isRequired
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
                  //required: 'Please enter your alternate number',
                  required: false,
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
          <div className="field-wrap">
            <Textfield
              name="email"
              label="Email"
              placeholder="example@company.com"
              isRequired
              type="email"
              inputProps={{
                ref: register({
                  required: 'Please enter your Email',

                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                    message: validationErr.email,
                  },
                }),
              }}
              error={!!errors.email && errors.email.message}
              hasValidation
            />
          </div>
          <div className="field-wrap field-partition">
            <div className="dob-field">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="field-label">
                  <label>Date of Birth</label>
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
              className="signup-age-fld"
              isRequired
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
              isRequired
              inputProps={{
                ref: register({ required: 'Please enter your address' }),
              }}
              error={!!errors.address && errors.address.message}
              hasValidation
            />
          </div>

          {/* adding city, state, country and pincode*/}
          <div className="field-wrap field-partition">
            <Textfield
              name="city"
              label="City"
              placeholder="chennai"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Please enter your city'
                }),
              }}

              error={!!errors.city && errors.city.message}
              hasValidation
            />

             <Textfield
              name="state"
              label="State"
              placeholder="Tamilnadu"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Please enter your state'
                }),
              }}

              error={!!errors.state && errors.state.message}
              hasValidation
            />

            <Textfield
              name="country"
              label="Country"
              placeholder="india"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Please enter your country'
                }),
              }}

              error={!!errors.country && errors.country.message}
              hasValidation
            />

            <Textfield
              name="pincode"
              label="Pincode"
              type="number"
              placeholder="600116"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Please enter your pincode',
                  maxLength: {
                    value: 6,
                    message: validationErr.pincode,
                  },
                }),
              }}
              error={!!errors.pincode && errors.pincode.message}
              hasValidation
            />
          </div>

          <div className="field-wrap">
            <Textfield
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              onChange={handleChange}
              isRequired
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

          {/* reconfirmatin of password */}
          <div className="field-wrap">
            <Textfield
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              placeholder="********"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Please enter your ConfirmPassword',
                  validate: (value) => value === password,
                  message: "password",

                }),
              }}
              error={!!errors.confirmpassword && "password not matches"}
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
              <span className="signin-btn" onClick={redirectToDoctorRegistration}>
                Doctor SignUp
              </span>
            </div>
            <div className="signin-btn-wrap ">
              If you are a doctor?
              <span className="signin-btn" onClick={redirectToDoctorLogin}>
                Doctor Login
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
