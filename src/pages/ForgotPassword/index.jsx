import { useFormik } from 'formik'
import React, { useState, Fragment } from 'react'
import Api, { URL } from '../../api'
import { useHistory } from 'react-router-dom'
import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import { Box, Typography, Paper, TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './useForgotPasswordStyles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import SnackBar from '../../components/SnackBar'

const ForgotPassword = (props) => {
  const history = useHistory()

  const classes = useStyles()

  const userNameRef = React.useRef(null)

  const [error, setError] = useState(false)

  const [userNameIndicate, setUserNameIndicate] = useState('')

  const [isFocus, setFocus] = useState(false)

  const [userNameListen, setUserNameListen] = useState(false)

  const [openSnackBar, setOpenSnackBar] = useState(false)

  const [openSnackBarErr, setOpenSnackBarErr] = useState(false)

  const [open, setOpen] = useState(false)
  const UserNameAutoComplete =
    localStorage.getItem('loginUser') === 'patient' ? 'number' : 'email'

  const redirectToLogin = () =>
    localStorage.getItem('loginUser') === 'patient'
      ? history.push('/patient/login')
      : history.push('/doctor/login')

  const validate = () => {
    const errors = {}

    if (error) {
      setError(false)
    }

    if (userNameIndicate !== '') {
      setUserNameIndicate('')
    }

    return errors
  }

  function handleOnSubmit(values) {
    if (!isFocus) {
      if (UserNameAutoComplete === 'email') {
        if (values.userName === '') {
          setUserNameIndicate('Please enter your email')
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)
        ) {
          setUserNameIndicate('Invalid email address')
        }

        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)) {
          history.push('/login')
          const url =
            localStorage.getItem('loginUser') === 'doctor'
              ? URL.doctorForgotPassword
              : URL.adminForgotPassword
          Api.post(url, { email: values.userName })
            .then((res) => {
              const { data } = res
              if (res.statusCode === 200) {
                setSuccess(true)
                // history.push('/doctor/registration')
              }
            })
            .catch((err) => {
              console.log(error)
            })
        }
      } else if (UserNameAutoComplete === 'number') {
        if (values.userName === '') {
          setUserNameIndicate('Please enter your phone number')
        } else if (String(values.userName).length < 10) {
          setUserNameIndicate('Please enter the valid phone number')
        }

        if (String(values.userName).length > 9) {
          Api.post(URL.patientForgotPassword, { phone: values.userName })
            .then((res) => {
              const { data } = res
              if (data.statusCode === 200) {
                setOpenSnackBar(true)
                // history.push('/patient/registration')
              } else {
                setOpenSnackBarErr(true)
              }
            })
            .catch((err) => {
              console.log(error)
            })
        }
      }
    }
  }


  const formik = useFormik({
      initialValues: {
        userName: ''        },
      validate,
      onSubmit: handleOnSubmit,
  })

  const handleOnClick = () => {
    if (userNameListen) {
      setFocus(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
    setOpenSnackBarErr(false)
  }

  function back() {
    if(localStorage.getItem('loginUser') === 'patient'){
      history.push('/patient/registration')
    } else {
      history.push('/doctor/registration')
    }
  }

  let headerName =
    localStorage.getItem('loginUser') === 'doctor' ? 'Doctor' : 'Patient'
  return (
    <Fragment>
      <Centralize className={classes.root} flexDirection="column">
        <div>
          <img src={Logo} alt="VIRUJH" className={classes.logo} />
        </div>
        <Paper className={classes.paper} variant="outlined" square>
          <Typography className={classes.heading} variant="subtitle1">
            {headerName} Forgot Password
            <span className={classes.line} />
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box className={classes.content}>
              <Box>
                <Typography className={classes.text} variant="h5">
                  {UserNameAutoComplete === 'email' ? 'Email' : 'Phone'}
                </Typography>
                {UserNameAutoComplete === 'email' ? (
                  <TextField
                    id="userName"
                    inputRef={userNameRef}
                    autoComplete={UserNameAutoComplete}
                    className={classNames(classes.textField, {
                      [classes.emptyField]: userNameIndicate !== '',
                    })}
                    type="email"
                    onChange={formik.handleChange}
                    placeholder="xyz@example.com"
                    variant="outlined"
                    value={formik.values.userName}
                    inputProps={{
                      onKeyPress: (event) => {
                        const { key } = event
                        if (!isFocus) {
                          setFocus(true)
                        }
                        if (!userNameListen) {
                          setUserNameListen(true)
                        }
                        if (key === 'Enter') {
                          setUserNameListen(false)
                        }
                      },
                    }}
                  />
                ) : (
                  <TextField
                    id="userName"
                    autoComplete={UserNameAutoComplete}
                    className={classNames(classes.textField, {
                      [classes.emptyField]: userNameIndicate !== '',
                    })}
                    type="number"
                    onChange={formik.handleChange}
                    placeholder={9999999999}
                    variant="outlined"
                    value={formik.values.userName}
                    inputProps={{
                      onKeyPress: (event) => {
                        const { key } = event
                        if (!isFocus) {
                          setFocus(true)
                        }
                        if (!userNameListen) {
                          setUserNameListen(true)
                        }
                        if (key === 'Enter') {
                          setUserNameListen(false)
                        }
                      },
                    }}
                  />
                )}

                {userNameIndicate !== '' && (
                  <Typography className={classes.emptytext} variant="h6">
                    {userNameIndicate}
                  </Typography>
                )}
              </Box>
            </Box>
            <Button
              className={classes.loginButton}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleOnClick}
            >
              SEND
            </Button>
          </form>
          {/* <Typography color="primary" variant="h4" onClick={back}>
              back?
            </Typography> */}
            <Centralize >
              <Typography className={classes.resendContent} color="primary" variant="h4" onClick={handleOnClick}>
                Resend?
              </Typography>
            </Centralize>
          <Centralize className={classes.singupContent}>
            <Typography className={classes.singupLabel} variant="h6">
              Remembered Password?
            </Typography>
            <Typography
              className={classes.singupLink}
              color="primary"
              variant="h4"
              onClick={redirectToLogin}
            >
              {headerName} Signin
            </Typography>
          </Centralize>
        </Paper>
      </Centralize>
      {/* {open && (
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
      {openSnackBarErr && (
        <SnackBar
          openDialog={openSnackBarErr}
          message={'Something went wrong'}
          onclose={handleClose}
          severity={'error'}
        />
      )}
      {openSnackBar && (
        <SnackBar
          openDialog={openSnackBar}
          message={'You will get the password to your mobile number'}
          onclose={handleClose}
          severity={'success'}
        />
      )}
    </Fragment>
  )
}

export default ForgotPassword
