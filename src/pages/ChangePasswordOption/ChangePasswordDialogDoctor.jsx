import React, { useState, useRef, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Textfield from '../../components/Textfield'
import Api, { URL } from '../../api'
import useFetch from '../../hooks/useFetch'
import { useForm } from 'react-hook-form'
import messages from '../../lib/iconMsg'
import { ClosedTip } from '../../components/Tooltip'
import SnackBar from '../../components/SnackBar'
import useStyles from './useStyles'

const ChangePasswordDoctor = ({ open, handleClose, handleOnSubmit }) => {
  const { register, errors, handleSubmit, watch } = useForm({})
  const passwordref = useRef({})
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const validationErr = {
    passwordValidation: 'password must contain one alphabet and one numeric',
    passwordLength: 'Password must has minimum length of 6 and maximum length of 12',
  }
  function handleOnClose(reason) {
    setError(false)
    if (response.statusCode == '200') {
      handleClose(false)
    }
  }
  const [response, setResponse] = useState(null)
  const [popClose, setPopClose] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const [count, setCount] = useState(false)
  const [Error, setError] = useState(false)

  const [message, setMessage] = useState(null)

  function handleChange(e) {
    setPassword(e.target.value)
  }

  const handleOnclose = () => {
    setPopClose(false)
  }

  const credentials = {
    email: localStorage.getItem('email'),
    oldPassword: password.currentPassword,
    newPassword: password.newPassword,
    confirmNewPassword: password.confirmPassword,
  }

  const onSubmit = (data) => {
    handleOnSubmit(data)

    console.log(`currentPassword:`, password.currentPassword)
    console.log(`newPassword: `, password.newPassword)
    console.log(`confirmPassword:`, password.confirmPassword)
    // alert(JSON.stringify(data))
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    Api.post(URL.doctorChangePassword, data, {
      headers: {
        Authorization: authStr,
      },
    })
      .then((res) => {
        console.log(res)
        const { data } = res
        setResponse(data)
        console.log(response)
        setCount(true)
      })
      .catch((err) => {
        console.log(err)
        setCount(false)
      })

    handleOnclose()
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

  const classes = useStyles()

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title" className={classes.titleStyle}>
          <div className={classes.divBlock}>
            <div className={[classes.divinline, classes.header].join(' ')}>
              {'Change Password'}
            </div>
            <div
              className={[
                classes.divinline,
                classes.cssTextAlign,
                classes.width5,
              ].join(' ')}
            >
              <ClosedTip
                onClick={handleClose}
                title={messages.cancel}
                arrow
                placement="right"
              />
            </div>
          </div>
        </DialogTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent className={[classes.dialogContent]}>
            <DialogContentText id="alert-dialog-description">
              <div className={[classes.textFieldDiv]}>
                <div className={classes.fieldWrap}>
                  <Textfield
                    className={[classes.textFieldsize]}
                    name="oldPassword"
                    label="Current password"
                    type="password"
                    placeholder="********"
                    onChange={handleChange}
                    isRequired
                    inputProps={{
                      ref: register({
                        required: 'Please enter your current password',
                      }),
                    }}
                    error={errors.oldPassword?.message}
                    hasValidation
                  />
                </div>
              </div>
              <div className={[classes.textFieldDiv]}>
                <div className="field-wrap">
                  <Textfield
                    className={[classes.textFieldsize]}
                    name="newPassword"
                    label="New password"
                    type="password"
                    placeholder="********"
                    onChange={handleChange}
                    isRequired
                    inputProps={{
                      ref: register({
                        required: 'Please enter your new password',
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
                        validate: (value) =>
                          value !== watch('oldPassword') ||
                          "Current password and new password shouldn't be same",
                      }),
                    }}
                    error={errors.newPassword?.message}
                    hasValidation
                  />
                </div>
              </div>
              <div className={[classes.textFieldDiv]}>
                <div className="field-wrap">
                  <Textfield
                    className={[classes.textFieldsize]}
                    name="confirmNewPassword"
                    label="Confirm password"
                    type="password"
                    placeholder="********"
                    isRequired
                    inputProps={{
                      ref: register({
                        required: 'Please enter your confirm password',
                        validate: (value) =>
                          value === watch('newPassword') ||
                          "New password and confirm password doesn't match",
                      }),
                    }}
                    error={errors.confirmNewPassword?.message}
                    hasValidation
                  />
                </div>
              </div>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <div className={classes.saveDiv}>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className={classes.save}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </form>

        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'success'}
        />
      </Dialog>
    </div>
  )
}

export default ChangePasswordDoctor
