import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core'

import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import useStyles from './useStyles'

const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const Login = ({
  UserNameText,
  UserNameAutoComplete,
  useNamePlaceHolder,
  UserNameErrorText,
  onLogin,
  errorMessage,
}) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  function handleOnPasswordChange(event) {
    setIsPasswordEmpty(false)
    setPassword(event.target.value)
  }

  function handeOnEmailChange(event) {
    setIsEmailEmpty(false)
    setUserName(event.target.value)
  }

  function handleOnLogin() {
    if (!password || !userName) {
      setIsPasswordEmpty(!password)
      setIsEmailEmpty(!userName)

      return
    }

    onLogin(userName, password, setError)
  }

  function handleSignup() {
    history.push('/patient/registration')
  }

  return (
    <Fragment>
      <Centralize className={classes.root} flexDirection="column">
        <div>
          <img src={Logo} alt="VIRUJH" className={classes.logo} />
        </div>
        <Paper className={classes.paper} variant="outlined" square>
          <Typography className={classes.heading} variant="subtitle1">
            Login into your virujh account
            <span className={classes.line} />
          </Typography>

          <Box className={classes.content}>
            <Box className={classes.emailContent}>
              <Typography className={classes.text} variant="h4">
                {UserNameText}
              </Typography>
              <TextField
                autoComplete={UserNameAutoComplete}
                className={classes.textField}
                type="userName"
                error={isEmailEmpty}
                onChange={handeOnEmailChange}
                placeholder={useNamePlaceHolder}
                variant="outlined"
                value={userName}
              />

              {isEmailEmpty && (
                <Typography className={classes.emptytext} variant="h6">
                  {UserNameErrorText}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography className={classes.text} variant="h4">
                Password
              </Typography>
              <TextField
                autoComplete="current-password"
                placeholder="********"
                className={classes.textField}
                type="password"
                error={isPasswordEmpty}
                onChange={handleOnPasswordChange}
                variant="outlined"
                value={password}
              />
              {isPasswordEmpty && (
                <Typography className={classes.emptytext} variant="h6">
                  Please enter your Password
                </Typography>
              )}
              <Typography className={classes.forgotPassword} variant="h6">
                FORGOT PASSWORD?
              </Typography>
            </Box>
          </Box>
          <Button
            className={classes.loginButton}
            onClick={handleOnLogin}
            variant="contained"
            color="primary"
          >
            LOGIN
          </Button>
          <Centralize className={classes.singupContent}>
            <Typography className={classes.singupLabel} variant="h6">
              I am new?
            </Typography>
            <Typography color="primary" variant="h4" onClick={handleSignup}>
              Signup
            </Typography>
          </Centralize>
        </Paper>
      </Centralize>

      <Snackbar
        anchorOrigin={SnackbarPosition}
        open={error}
        onClose={() => setError(false)}
        message={errorMessage}
        key={SnackbarPosition.horizontal + SnackbarPosition.vertical}
      />
    </Fragment>
  )
}

export default Login
