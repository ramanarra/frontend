import React, { useState, Fragment } from 'react'
import { Paper, Box, Typography, TextField, Button, Snackbar } from '@material-ui/core'

import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import Api, { URL } from '../../api'
import useStyles from './useStyles'


const SnackbarPosition = { vertical: 'bottom', horizontal: 'center' }

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [error, setError] = useState(false)
  const classes = useStyles()

  function handleOnLogin() {
    if (!password || !email) {
      setIsPasswordEmpty(!password)
      setIsEmailEmpty(!email)
    } else {
      const credentials = {
        email: email,
        password: password,
      }

      Api.post(URL.doctorLogin, credentials)
        .then((res) => {
          const { data } = res
          if (!data?.accessToken) {
            setError(true)

            return
          }
          localStorage.setItem('virujhToken', data.accessToken)
          localStorage.setItem('role', data.role)
          localStorage.setItem('docKey', data.doctorKey)
          localStorage.setItem('accountKey', data.accountKey)
          localStorage.setItem('rolesPermission', data.rolesPermission)
          history.push('/doctors')
        })
        .catch(() => {
          setError(true)
        })
    }
  }

  function handleOnPasswordChange(event) {
    setIsPasswordEmpty(false)
    setPassword(event.target.value)
  }

  function handeOnEmailChange(event) {
    setIsEmailEmpty(false)
    setEmail(event.target.value)
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
                Email ID
              </Typography>
              <TextField
                autoComplete="no"
                className={classes.textField}
                type="email"
                error={isEmailEmpty}
                onChange={handeOnEmailChange}
                placeholder="johndoe@gmail.com"
                variant="outlined"
                value={email}
              />

              {isEmailEmpty && (
                <Typography className={classes.emptytext} variant="h6">
                  Please enter your Email
                </Typography>
              )}
            </Box>
            <Box>
              <Typography className={classes.text} variant="h4">
                Password
              </Typography>
              <TextField
                inputProps={{
                  autocomplete: 'new-password',
                }}
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
                  Please enter your password
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
            <Typography color="primary" variant="h4">
              Signup
            </Typography>
          </Centralize>
        </Paper>
      </Centralize>

      <Snackbar
        anchorOrigin={SnackbarPosition}
        open={error}
        onClose={() => setError(false)}
        message="Incorrect Email and Password"
        key={SnackbarPosition.horizontal + SnackbarPosition.vertical}
      />
    </Fragment>
  )
}

export default Login
