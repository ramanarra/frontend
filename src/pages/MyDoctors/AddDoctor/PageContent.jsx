import React, { useState, useEffect } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Textfield from '../../../components/Textfield'
import Api, { URL } from '../../../api'
import '../style.scss'

function PageContent({ handleOnSubmit }) {
  const { register, errors, control, handleSubmit, watch } = useForm()

  const onSubmit = (data) => {

    data.consultationSessionTimings = Number(data.consultationSessionTimings)
    handleOnSubmit(data)

  }


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
    textmsg: 'Provide Specific Date and Time to contact',
    confirmpassword: 'provide confirm password same as password',
  }


  return (
    <Box>
      <form className="fields" onSubmit={handleSubmit(onSubmit)}>
        <Box className="field-equal" >
          <Box className="field-boxstyle" >
            <Box className="field-boxstyle1" >
              <Textfield
                name="firstName"
                label="First Name"
                placeholder="Arul"
                isRequired
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
            </Box>
            <Box className={"field-boxstyle2"}>
              <Textfield
                name="lastName"
                placeholder="Prakash"
                label="Last Name"
                isRequired
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
            </Box>
          </Box>
        </Box>
        <Box className={" field-boxstyle"} >
          <Box  className="field-boxstyle1" >
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
          </Box>
          <Box  className="field-boxstyle-change">
            <Textfield
              name="speciality"
              label="Specialization"
              placeholder="child specialist"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Required',
                  minLength: {
                    value: 5,
                    message: validationErr.speciality,
                  },
                }),
              }}
              error={!!errors.speciality && errors.speciality.message}
              hasValidation
            />
          </Box>
        </Box>
        <Box className="field-boxstyle" >
          <Box  className="field-boxstyle1" >
            <Textfield
              name="qualification"
              label="Qualification"
              placeholder="MBBS"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Required',
                  minLength: {
                    value: 3,
                    message: validationErr.qualification,
                  },
                }),
              }}
              error={errors?.qualification?.message}
              hasValidation
            />
          </Box>
          <Box  className="field-boxstyle2">
            <Textfield
              name="consultationSessionTimings"
              label="Consultation Session Timing"
              placeholder="10"
              type="number"
              isRequired
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

          </Box>

        </Box>

        <Box className="field-boxstyle" >
          <Box  className="field-boxstyle1">
            <Textfield
              name="experience"
              label="Experience"
              placeholder="1"
              type="number"
              isRequired
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
          </Box>
          <Box  className="field-boxstyle2">
            <Textfield
              name="consultationCost"
              placeholder="500"
              label="Consultation Cost"
              type="number"
              isRequired
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
          </Box>
        </Box >
        <Box className="field-boxstyle" >
          <Box  className="field-boxstyle1-change" >
            <Textfield
              name="number"
              label="Contact Number"
              placeholder="8745142572"
              type="number"
              isRequired
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
          </Box>
          <Box  className="field-boxstyle2">
            <Textfield
              name="email"
              label="Email ID"
              placeholder="Johndoe@gmail.com"
              type="email"
              isRequired
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
          </Box>
        </Box>
        <Box className="field-boxstyle" >
          <Box  className="field-boxstyle1">
            <Textfield
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              isRequired
              inputProps={{ ref: register({ required: 'Required' }) }}
              error={!!errors.password && errors.password.message}
              hasValidation
            />
          </Box>
          <Box  className="field-boxstyle2">
            <Textfield
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              placeholder="********"
              isRequired
              inputProps={{
                ref: register({
                  required: 'Please enter your ConfirmPassword',
                  validate: (value) => value === watch('password') || validationErr.confirmpassword,

                }),
              }}
              error={errors.confirmpassword?.message}
              hasValidation
            />

          </Box>
        </Box>
        <Box className=" detail-wrap">

          <Box   className="field-boxstyle1" style={{ width: "100%" }}>
            <Textfield
              name="textmsg"
              placeholder="Type here..."
              label="Details"
              multiline
              rows={2}
              rowsMax={4}
              isRequired
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
          </Box>
        </Box>
        <Box className="submt-btn-wrap" style={{ justifyContent: 'right', textAlign: 'end' }}>
          <Button type="submit" className="signup-btn" >
            ADD
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default PageContent