import React, { useState, Fragment } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Paper, Box, Typography, TextField, Button } from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import Centralize from '../../../components/Centralize'
import Logo from '../../../assets/img/logo.png'
import useStyles from './useStyle'
import SnackBar from '../../../components/SnackBar'
import CorporateLogin from '.'


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
    
    const type = isEyeVisible === true ? 'text' : 'password'

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
      if (UserNameText === 'Phone Number') {
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
      codeName: '',
      mobileNumber:'',
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

return( 
  <Fragment>
      <Centralize className={classes.root} flexDirection="column">
        <div>
          <img src={Logo} alt="VIRUJH" className={classes.logo} />
        </div>
        <Paper className={classes.paper} variant="outlined" square>
          <form onSubmit={formik.handleSubmit}>
          <Box>
          <Typography className={classes.text} variant="h1">
                  Corporate Login
            </Typography>
         </Box>
         <Box>
         <Typography className={classes.text} variant="h5">
                  Enter your login details
                </Typography>

         </Box>
         <Box style={{border:'1px solid black'}}> 
          <form className={classes.outerbox}>
             <Box>
             <TextField
                    id="Company_Code"
                    inputRef={userNameRef}
                    autoComplete={UserNameAutoComplete}
                    className={classNames(classes.textField, {
                      [classes.emptyField]: userNameIndicate !== '',
                    })}
                    type={String}
                    onChange={formik.handleChange}
                    placeholder="Company_Code"
                    variant="outlined"
                    value={formik.values.userName}
                    
                  />
             </Box>
             <Box>
             <TextField
                    id="mobileNumber"
                   // inputRef={userNameRef}
                    autoComplete={UserNameAutoComplete}
                    className={classNames(classes.textField, {
                      [classes.emptyField]: userNameIndicate !== '',
                    })}
                    type={Number}
                    onChange={formik.handleChange}
                    placeholder="Mobile"
                    variant="outlined"
                    value={formik.values.userName}
                    
                  />
             </Box>
             <Box>
             <TextField
                    id="Password"
                    autoComplete={UserNameAutoComplete}
                    className={classNames(classes.textField, {
                      [classes.emptyField]: userNameIndicate !== '',
                    })}
                    type={String}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    variant="outlined"
                    value={formik.values.userName}
                    
                  />
             </Box>
         </form>
         </Box>
          </form>
        </Paper>  
      </Centralize>       
  </Fragment>
    
    )
    }
export default Login