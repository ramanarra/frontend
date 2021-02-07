import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './useOtpVerificationStyles'
import React, { useState, Fragment } from 'react'
import Centralize from '../../components/Centralize'
import Logo from '../../assets/img/logo.png'
import { Box, Typography, Paper, TextField, Button } from '@material-ui/core'
import OtpInput from 'react-otp-input';
import { useFormik } from 'formik'
import Api, { URL } from '../../api'

const OtpVerifiaction = (props) => {
    const state = useLocation();

    const history = useHistory();
  
    const classes = useStyles()

    const [isFocus, setFocus] = useState(false)

    const [otpListen, setOtpListen] = useState(false)

    const [error, setError] = useState(false)

    const [otp, setOtp] = useState(false)
    
    function handleOnSubmit(values) {
        // if (!isFocus) {

        // }
    }

    const handleOnClick = () => {
        if (otpListen && otp.length === 4) {
            Api.post(URL.otpVerification, {phone: state.phone, passcode: otp})
            .then((res) => {
              const { data } = res
              if(res.statusCode === 200){
              } else {

              }
            });
          setFocus(false)
        }
    }

    const validate = () => {
        const errors = {}

        if (error) {
            setError(false)
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
          Otp: ''        },
        onSubmit: handleOnSubmit,
    })

    const handleChange = otp => {
        formik.values.Otp = otp;
        // if(formik.values.Otp.length === 4){
        //     setOtp(true);
        // }
        setOtp(otp)
        // setOtpListen(false);

        if(otp.length === 4){
            setOtpListen(true)
        }
    }

    console.log('ponni')


    return (
        <Fragment>
            <Centralize className={classes.root} flexDirection="column">
                <div>
                    <img src={Logo} alt="VIRUJH" className={classes.logo} />
                </div>
                <Paper className={classes.paper} variant="outlined" square>
                    <Typography className={classes.heading} variant="subtitle1">
                        OTP Verification
                        <span className={classes.line}/>
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Box className={classes.content}>
                            <Box>
                            <Centralize>
                                <OtpInput
                                    placeholder={'1111'}
                                    value={otp}
                                    onChange={handleChange}
                                    numInputs={4}
                                    separator={<span></span>}
                                    inputStyle={classes.inputStyle}
                                    focusStyle={classes.focusStyle}
                                    hasErrored={otpListen}
                                    // isInputNum={true}
                                    errorStyle={classes.error}
                                    
                                />
                            </Centralize>
                            </Box>
                        </Box>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleOnClick}
                            >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Centralize>
        </Fragment>
    )
}

export default OtpVerifiaction