import React, { useState, Fragment } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import useStyles from './useStyles'




const Login = ({
  UserNameText,
  UserNameAutoComplete,
  useNamePlaceHolder,
  onLogin,
  errorMessage,
}) => {
  const history = useHistory()
  const classes = useStyles()

  const [error, setError] = useState(false)

  const [visible, setVisible] = useState('notVisible')

  const name = localStorage.getItem('loginUser') === 'patient' ? 'Patient login' : 'Doctor login'

  const type = visible === 'visible' ? "text" : "password"

  function handleSignup() {
    if(localStorage.getItem('loginUser') === 'patient') {
      history.push('/patient/registration')
    }
    else {
      history.push('/doctor/registration')
    }
  }

  function doctorLoginPage() {
    localStorage.setItem('loginUser', 'doctor')
    history.push("/doctor/login")
  }

  const validate = (values) => {
    const errors = {}

    if(UserNameText === 'Email') {
      if (values.userName === '') {
        errors.userName = 'Please enter your email'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)) {
        errors.userName = 'Invalid email address'
      }
    }

    else if(UserNameText === 'Phone Number') {
      if(values.userName === '') {
        errors.userName = 'Please enter your phone Number'
      } else if (String(values.userName).length < 10) {
        errors.userName = 'Phone Number must be 10 numbers'
      }
    }
  
    if (values.password === '') {
      errors.password = 'Please enter your password'
    } else if (values.password.length < 6) {
      errors.password = 'Password must be 6 characters at minimum'
    }
  
    return errors
  }

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      onLogin(values.userName, values.password, setError)
    },
  })

  const handlePasswordVisibility = () => {
    if(visible  === 'notVisible') {
      setVisible('visible')
    }
    else {
      setVisible('notVisible')
    }
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
                  <Typography className={classes.text} variant="h4">
                    {UserNameText}
                  </Typography>
                  {
                    UserNameText === 'Email' ?
                    (
                      <TextField
                    id="userName"
                    autoComplete={UserNameAutoComplete}
                    className={classes.textField}
                    type="email"
                    onChange={formik.handleChange}
                    placeholder={useNamePlaceHolder}
                    variant="outlined"
                    value={formik.values.userName}
                  />
                    ) : 
                    (
                      <TextField
                    id="userName"
                    autoComplete={UserNameAutoComplete}
                    className={classNames(classes.textField, {
                      [classes.emptyField]: formik.errors.userName
                    })}
                    type="number"
                    onChange={formik.handleChange}
                    placeholder={useNamePlaceHolder}
                    variant="outlined"
                    value={formik.values.userName}
                  />
                    )
                  }
                 {formik.errors.userName && (
                    <Typography className={classes.emptytext} variant="h6">
                      {formik.errors.userName}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography className={classes.text} variant="h4">
                    Password
                  </Typography>
                  <TextField
                    id="password"
                    autoComplete="current-password"
                    placeholder="********"
                    className={classNames(classes.textField, {
                      [classes.emptyField]: formik.errors.password,
                    })}
                    type={type}
                    onChange={formik.handleChange}
                    variant="outlined"
                    value={formik.values.password}
                    InputProps={
                      type === 'text' ?
                      { endAdornment: <VisibilityOffIcon onClick={handlePasswordVisibility} className={classes.icon} /> } :
                      { endAdornment: <VisibilityIcon onClick={handlePasswordVisibility} className={classes.icon} />}
                    }
                  />

                  {formik.errors.password && (
                    <Typography className={classes.emptytext} variant="h6">
                      {formik.errors.password}
                    </Typography>
                  )}
                  {
                  error && 
                  <Typography className={classes.emptytext} variant="h6">
                    {errorMessage}
                  </Typography>
                }
                  <Typography className={classes.forgotPassword} variant="h6">
                    FORGOT PASSWORD?
                  </Typography>
                </Box>
              </Box>
              <Button
                className={classes.loginButton}
                variant="contained"
                color="primary"
                type="submit"
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
          {
            localStorage.getItem('loginUser') === 'patient' &&
            (
              <Centralize  className={classes.singupContent}>
                <Typography className={classes.singupLabel} variant="h6">
                  If you are a doctor?
                </Typography>
                <Typography color="primary" variant="h4" onClick={doctorLoginPage}>
                  Click here
                </Typography>
              </Centralize>
            )
          }
        </Paper>
      </Centralize>
    </Fragment>
  )
}

export default Login
