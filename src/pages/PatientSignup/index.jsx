import React, { useEffect } from 'react'
import { Paper, Button, Snackbar } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { GoCalendar } from 'react-icons/go'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import useManualFetch from '../../hooks/useManualFetch'
import { URL } from '../../api'
import Textfield from '../../components/Textfield'

import './style.scss'

const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const PatientSignup = (props) => {
  const { register, errors, control, handleSubmit } = useForm()
  const [handleSignUp, error, isLoading, res] = useManualFetch()

  const redirectToLogin = () => props.history.push('/login')
  const onSubmit = (data) => handleSignUp('POST', URL.patientSignup, data)

  useEffect(() => {
    !isLoading && !error && !!res && setTimeout(() => redirectToLogin(), 2000)
  }, [res])

  const validationErr = {
    name: 'Invalid name',
    phone: 'Invalid phone number',
    age: 'Invalid age',
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
        <h3 className="title">Register into your Virujh account</h3>
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
              name="alternateContact"
              label="Alternate Contact Number"
              placeholder="7451254785"
              type="number"
              inputProps={{
                ref: register({
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
                <div className="field-label">Date of Birth</div>
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
                      disableToolbar
                      autoOk
                      InputProps={{
                        endAdornment: <GoCalendar />,
                      }}
                    />
                  }
                  defaultValue={null}
                  rules={{
                    required: 'Required',
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
              inputProps={{
                ref: register({
                  required: 'Required',
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
                ref: register({ required: 'Required' }),
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
              inputProps={{ ref: register({ required: 'Required' }) }}
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
          </div>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={SnackbarPosition}
        open={!!res}
        autoHideDuration={2000}
        message={'Signed up successfully'}
        key={SnackbarPosition.horizontal + SnackbarPosition.vertical}
      />
    </div>
  )
}

export default PatientSignup
