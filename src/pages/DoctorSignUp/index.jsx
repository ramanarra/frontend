import React, { useState } from 'react'
import {
  Paper,
  Button,
  Snackbar,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'

import Textfield from '../../components/Textfield'
import './style.scss'

const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const DoctorSignUp = (props) => {
  const { register, errors, control, handleSubmit } = useForm()

  const [Error, setError] = useState(false)

  const redirectToLogin = () => props.history.push('/login')
  const onSubmit = (data) => {

  }

  const validationErr = {
    name: 'Invalid name',
    phone: 'Invalid phone number',
    registrationNumber: 'Invalid registration number',
    email: 'Invalid Email ID',
    qualification: 'Invalid qualification',
    specialization: 'Invalid specialization',
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
            <Textfield
              name="registrationNumber"
              label="Registration Number"
              placeholder="#12345689"
              type="string"
              inputProps={{
                ref: register({
                  required: 'Required',
                  minLength: {
                    value: 7,
                    message: validationErr.registrationNumber,
                  },
                }),
              }}
              error={
                !!errors.registrationNumber && errors.registrationNumber.message
              }
              hasValidation
            />
          </div>
          <div className="field-wrap">
            <Textfield
              name="specialization"
              label="Specialization"
              placeholder="child specialist"
              inputProps={{
                ref: register({
                  minLength: {
                    value: 5,
                    message: validationErr.specialization,
                  },
                }),
              }}
              error={!!errors.specialization && errors.specialization.message}
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
              name="phone"
              label="Contact Number"
              placeholder="8745142572"
              type="number"
              inputProps={{
                ref: register({
                  required: 'Required',
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
              What can we contact?
            </label> <br />
            <textarea
              name="contact"
              className="information"
              rowsMin={4}
              variant="outlined"
              placeholder="Type here..."
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
          </div>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={SnackbarPosition}
        open={Error}
        autoHideDuration={2000}
        message={'Signed up successfully'}
        key={SnackbarPosition.horizontal + SnackbarPosition.vertical}
      />
    </div>
  )
}

export default DoctorSignUp
