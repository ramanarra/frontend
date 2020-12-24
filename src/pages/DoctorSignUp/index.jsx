import React, { useState,useEffect } from 'react'
import {
  Paper,
  Button,
  Snackbar,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Textfield from '../../components/Textfield'
import './style.scss'
import SnackBar from '../../components/SnackBar'
import Api, { URL } from '../../api'

const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const DoctorSignUp = (props) => {
  const { register, errors, control, handleSubmit } = useForm()

  const [Error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [detail, setDetail] = useState(null)
  const [response, setResponse] = useState(null)
  const [count, setCount] = useState(false)
  const redirectToLogin = () => props.history.push('/doctor/login')
  
  const onSubmit = (data) => {
   
    
    data.consultationSessionTimings=Number(data.consultationSessionTimings)
    console.log(data);
    Api.post(URL.doctorSignup, data)
    .then((res) => {
      const { data } = res
      setCount(true)
      setResponse(data)
      if (data.doctor?.accessToken) {
        localStorage.setItem('virujhToken', data.doctor.accessToken)
        localStorage.setItem('doctroId', data.doctor.doctorId)
        localStorage.setItem(
          'doctorName',
          `${data.details.firstName} ${data.details.lastName}`
        )
        setMessage('Thanks! Your account has been created successfully')
        setDetail(data)
        setError(true)
      } else if (data?.doctor.update === 'updated password') {
        setError(true)
        setMessage('Created successfully...Please do signin')
      } else if (data?.statusCode) {
        setError(true)
        setMessage(data?.message)
      }
    })
    .catch((err) => {
      console.log(err);
      setCount(true)
    })

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

  const redirectPatientLoginPage = () => props.history.push('/patient/registration')
  
  const validationErr = {
    name: 'Invalid name',
    number: 'Invalid phone number',
    hospitalkey: 'Invalid Hospital Code',
    email: 'Invalid Email ID',
    qualification: 'Invalid qualification',
    speciality: 'Invalid specialization',
    experience: 'Invalid experience number',
    consultationCost: 'Invalid consultationCost',
    consultationSessionTimings: 'Invalid consultationSessionTimings',
    textmsg : 'Provide Specific Date and Time to contact',
  }
  function handleOnClose(reason) {
    if (reason === 'clickaway') {
      return
    }
    if (message === 'Created successfully...Please do signin') {
      props.history.push('/doctor/login')
    }
    if (detail?.doctor?.accessToken) {
      props.history.push('/doctor/list')
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
        <h3 className="title">Doctor register</h3>
        <form className="fields" onSubmit={handleSubmit(onSubmit)}>
          <div className="field-wrap field-partition">
            <Textfield
              name="firstName"
              label="First Name"
              placeholder="Arul"
              inputProps={{
                ref: register({
                  required: 'Required',
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
          <div className="field-wrap">
            <div>
            <Textfield
              name="hospitalkey"
              label="Hospital Code"
              placeholder="Acc_1"
              inputProps={{
                ref: register({
                  required: false,
                  minLength: {
                    value: 5,
                    message: validationErr.hospitalkey,
                  },
                }),
              }}
              error={
                !!errors.hospitalkey && errors.hospitalkey.message
              }
              hasValidation
              
            />
             </div>
          </div>
         
          <div className="field-wrap">
            <Textfield
              name="speciality"
              label="Specialization"
              placeholder="child specialist"
              inputProps={{
                ref: register({
                  minLength: {
                    value: 5,
                    message: validationErr.speciality,
                  },
                }),
              }}
              error={!!errors.speciality && errors.speciality.message}
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <Textfield
              name="qualification"
              label="Qualification"
              placeholder="MBBS"
              inputProps={{
                ref: register({
                  minLength: {
                    value: 3,
                    message: validationErr.qualification,
                  },
                }),
              }}
              error={!!errors.qualification && errors.qualification.message}
              hasValidation
            />
          </div>
          <div className="field-wrap field-partition">
            <Textfield
              name="experience"
              label="Experience"
              placeholder="1"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Required',
                  minLength: {
                    value: 1,
                    message: validationErr.experience,
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: validationErr.experience,
                  },
                }),
              }}
              error={!!errors.experience && errors.experience.message}
              hasValidation
            />
            <Textfield
              name="consultationCost"
              placeholder="500"
              label="Consultation Cost"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Required',
                  pattern: {
                    value: /^[0-9]*$/,
                    message: validationErr.consultationCost,
                  },
                }),
              }}
              error={!!errors.consultationCost && errors.consultationCost.message}
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <Textfield
              name="consultationSessionTimings"
              label="Consultation Session Timing"
              placeholder="10"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Required',
                  minLength: {
                    value: 2,
                    message: validationErr.consultationSessionTimings,
                  },
                }),
              }}
              error={!!errors.consultationSessionTimings && errors.consultationSessionTimings.message}
              hasValidation
            />
          </div>
          <div className="field-wrap field-partition">
            <Textfield
              name="number"
              label="Contact Number"
              placeholder="8745142572"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Required',
                  maxLength: {
                    value: 10,
                    message: validationErr.number,
                  },
                  minLength: {
                    value: 10,
                    message: validationErr.number,
                  },
                }),
              }}
              error={!!errors.number && errors.number.message}
              hasValidation
            />
            <Textfield
              name="email"
              label="Email ID"
              placeholder="Johndoe@gmail.com"
              type="email"
              inputProps={{
                ref: register({
                  required: 'Required',
                  minLength: {
                    value: 10,
                    message: validationErr.email,
                  },
                }),
              }}
              error={!!errors.email && errors.email.message}
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <Textfield
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              inputProps={{ ref: register({ required: 'Required' }) }}
              error={!!errors.password && errors.password.message}
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <label className="informationHeader">
              <div className="field-line">
                <div style={{ width: '37%'}}> 
                  <span > When can we contact?</span><sup className="star-color">★</sup>
                  
               </div>
               <div className="field-mover">
                  <span className="rolling-info"> (<marquee > Provide Further Details to Contact</marquee>)</span>
                </div>
               </div>
            </label>
            <div className="field-Text">
         
              
                 <Textfield
                  name="textmsg"
                 placeholder="Type here..."
                 multiline
                 rows={2}
                 rowsMax={4}
                 inputProps={{
                  ref: register({
                    required: 'Required',
                    minLength: {
                      value: 5,
                      message: validationErr.textmsg,
                    },
                  }),
                }}
                error={!!errors.textmsg && errors.textmsg.message}
                hasValidation
              
               />

            </div>
            
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
         
            {/* Navigating to patient registration  */}

            <div className="signin-btn-wrap signin-btn-align">
              If you are a new patient?
              <span className="signin-btn" onClick={redirectPatientLoginPage}>
              Click here
              </span>
            </div>


          </div>
        </form>
      </Paper>
      {response && response.doctor?.accessToken && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'success'}
        />
      )}
      {response && response.doctor?.update && (
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

export default DoctorSignUp
