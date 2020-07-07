import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, TextField, Button } from '@material-ui/core'

import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import Api from '../../api'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
  },

  paper: {
    border: '2px solid #f7f7f7',
    padding: '60px 73px 40px 73px',
    marginLeft: 25,
    marginBottom: 95,
    marginTop: 20,
  },

  logo: {
    height: 100,

  },

  heading: {
    letterSpacing: 1.2,
    textAlign: 'center',
    position: 'relative',
  },

  line: {
    display: 'block',
    position: 'absolute',
    height: 3,
    width: '12%',
    right: 0,
    top: 35,
    left: 190,
    bottom: 2,
    background: '#0bb5ff',
  },

  textField: {
    width: 415,
  },

  content: {
    paddingBottom: 86,
    paddingTop: 40,
  },

  emailContent: {
    paddingBottom: 30,
  },

  forgotPassword: {
    textAlign: 'end',
  },

  loginButton: {
    width: 415,
  },

  text: {
    marginBottom: 10,
  },

  singupContent: {
    marginTop: 10,
  },

  singupLabel: {
    marginRight: 5,
  },
}))

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()


  function handleOnLogin(){
    const credentials = {
      email: email,
      password: password,
    }

    Api.post('auth/doctorLogin', credentials)
      .then((res) => {
        const { data } = res
        localStorage.setItem('virujhToken', data.accessToken)
        localStorage.setItem('role', data.role)
        localStorage.setItem('docKey', data.doctorKey)
        localStorage.setItem('accountKey', data.accountKey)
        localStorage.setItem('rolesPermission', data.rolesPermission)
        history.push('/doctors')
      })
      .catch(() => {
        // setError({
        //   status: true,
        //   msg: 'Invalid Password or Email',
        //   type: 'error',
        // })
      })
  }

  return (
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
            <Typography className={classes.text} variant="h4">Email ID</Typography>
            <TextField
              autoComplete="no"
              className={classes.textField}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="johndoe@gmail.com"
              variant="outlined"
              value={email}
            />
          </Box>

          <Box>
            <Typography className={classes.text} variant="h4">Password</Typography>
            <TextField
              inputProps={{
                autocomplete: 'new-password',
              }}
              placeholder="********"
              className={classes.textField}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              variant="outlined"
              value={password}
            />
            <Typography className={classes.forgotPassword} variant="h6">
              FORGOT PASSWORD?
            </Typography>
          </Box>
        </Box>
        <Button className={classes.loginButton} onClick={handleOnLogin} variant="contained" color="primary">
          LOGIN
        </Button>
        <Centralize className={classes.singupContent}>
        <Typography className={classes.singupLabel} variant="h6" >I am new?</Typography>
        <Typography color="primary" variant="h4">Signup</Typography>
        </Centralize>
      </Paper>
    </Centralize>
  )
}

export default Login
