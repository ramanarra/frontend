import React, { useState, Fragment } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Paper, Box, Typography, TextField, Button } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import useStyles from './useStyles'
import SnackBar from '../../components/SnackBar'

const Login = ({
  UserNameText,
  UserNameAutoComplete,
  useNamePlaceHolder,
  onLogin,
  errorMessage,
}) => {
  const history = useHistory()

  const classes = useStyles()

  const userNameRef = React.useRef(null)

  const passwordRef = React.useRef(null)

  const [error, setError] = useState(false)

  const [isEyeVisible, setIsEyeVisible] = useState(false)

  const [userNameIndicate, setUserNameIndicate] = useState('')

  const [passwordIndicate, setPasswordIndicate] = useState('')

  const [openSnackBar, setOpenSnackBar] = useState(false)

  const [open, setOpen] = useState(false)

  const [isFocus, setFocus] = useState(false)

  const [userNameListen, setUserNameListen] = useState(false)

  const [passwordListen, setPasswordListen] = useState(false)

  const name =
    localStorage.getItem('loginUser') === 'patient'
      ? 'Patient login'
      : 'Doctor login'

  const type = isEyeVisible === true ? 'text' : 'password'

  function handleSignup() {
    if (localStorage.getItem('loginUser') === 'patient') {
      history.push('/patient/registration')
    } else {
      history.push('/doctor/registration')
    }
  }

  function doctorLoginPage() {
    history.push('/doctor/login')
  }

  function patientLoginPage() {
    history.push('/login')
  }

  const validate = () => {
    const errors = {}

    if (error) {
      setError(false)
    }

    if (userNameIndicate !== '') {
      setUserNameIndicate('')
    }

    if (passwordIndicate !== '') {
      setPasswordIndicate('')
    }

    return errors
  }

  function handleOnSubmit(values) {
    if (!isFocus || passwordListen) {
      if (UserNameAutoComplete === 'email') {
        if (values.userName === '') {
          setUserNameIndicate('Please enter your email')
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)
        ) {
          setUserNameIndicate('Invalid email address')
        }

        if (values.password == '') {
          setPasswordIndicate('Please enter your password')
        }

        if (
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName) &&
          values.password !== ''
        ) {
          setOpen(true)
          onLogin(
            values.userName,
            values.password,
            setError,
            setOpen,
            setOpenSnackBar
          )
        }
      } else if (UserNameText === 'Phone Number') {
        if (values.userName === '') {
          setUserNameIndicate('Please enter your phone number')
        } else if (String(values.userName).length < 10) {
          setUserNameIndicate('Please enter the valid phone number')
        }
        if (values.password == '') {
          setPasswordIndicate('Please enter your password')
        }

        if (String(values.userName).length > 9 && values.password !== '') {
          setOpen(true)
          onLogin(
            values.userName,
            values.password,
            setError,
            setOpen,
            setOpenSnackBar
          )
        }
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate,
    onSubmit: handleOnSubmit,
  })

  const handlePasswordVisibility = () => {
    setIsEyeVisible(!isEyeVisible)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  const handleOnClick = () => {
    if (userNameListen) {
      setFocus(false)
    }
    setPasswordListen(!passwordListen)
  }

  return (
    <Fragment>
      <Centralize className={classes.root} flexDirection="column">
        <div>
          <img src={Logo} alt="VIRUJH" className={classes.logo} />
        </div>
        <Paper className={classes.paper} variant="outlined" square>
          <Typography className={classes.heading} variant="subtitle1">
            {name}
            <span className={classes.line} />
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box className={classes.content}>
              <Box className={classes.emailContent}>
                <Typography className={classes.text} variant="h5">
                  {UserNameText}
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
                    placeholder={useNamePlaceHolder}
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
                          passwordRef.current.focus()
                          setPasswordListen(true)
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
                    placeholder={useNamePlaceHolder}
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
                          passwordRef.current.focus()
                          setPasswordListen(true)
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
              <Box>
                <Typography className={classes.text} variant="h5">
                  Password
                </Typography>
                <TextField
                  id="password"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                  placeholder="********"
                  className={classNames(classes.textField, {
                    [classes.emptyPasswordField]: passwordIndicate !== '',
                  })}
                  type={type}
                  onChange={formik.handleChange}
                  variant="outlined"
                  value={formik.values.password}
                  inputProps={{
                    onKeyPress: () => {
                      if (isFocus) {
                        setFocus(false)
                      }
                      // if (passwordListen) {
                      //   setPasswordListen(false)
                      // }
                    },
                  }}
                  InputProps={
                    type === 'text'
                      ? {
                          endAdornment: (
                            <VisibilityOffIcon
                              onClick={handlePasswordVisibility}
                              className={classes.icon}
                            />
                          ),
                        }
                      : {
                          endAdornment: (
                            <VisibilityIcon
                              onClick={handlePasswordVisibility}
                              className={classes.icon}
                            />
                          ),
                        }
                  }
                />

                {passwordIndicate !== '' && (
                  <Typography className={classes.emptytext} variant="h6">
                    {passwordIndicate}
                  </Typography>
                )}
                {error && (
                  <Typography className={classes.emptytext} variant="h6">
                    {errorMessage}
                  </Typography>
                )}
                {/* <Typography className={classes.forgotPassword} variant="h5">
                  FORGOT PASSWORD?
                </Typography> */}
              </Box>
            </Box>
            <Button
              className={classes.loginButton}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleOnClick}
            >
              LOGIN
            </Button>
          </form>
          <Centralize className={classes.singupContent}>
            <Typography className={classes.singupLabel} variant="h6">
              I am new?
            </Typography>
            <Typography color="primary" variant="h4" onClick={handleSignup}>
              Signup
            </Typography>
          </Centralize>
          {localStorage.getItem('loginUser') === 'patient' && (
            <Centralize className={classes.singupContent}>
              <Typography className={classes.singupLabel} variant="h6">
                If you are a doctor?
              </Typography>
              <Typography color="primary" variant="h4" onClick={doctorLoginPage}>
                Click here
              </Typography>
            </Centralize>
          )}
          {localStorage.getItem('loginUser') === 'doctor' && (
            <Centralize className={classes.singupContent}>
              <Typography className={classes.singupLabel} variant="h6">
                If you are a patient?
              </Typography>
              <Typography color="primary" variant="h4" onClick={patientLoginPage}>
                Click here
              </Typography>
            </Centralize>
          )}
        </Paper>
      </Centralize>
      {open && (
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {openSnackBar && (
        <SnackBar
          open={openSnackBar}
          message={'Something went wrong'}
          onclose={handleClose}
          severity={'error'}
        />
      )}
    </Fragment>
  )
}

export default Login
