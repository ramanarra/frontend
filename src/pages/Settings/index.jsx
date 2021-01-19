import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core'
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded'
import useFileUpload from '../../hooks/useFileUpload'
import { connect } from 'react-redux'
import { setHospitalProfile } from '../../actions/hospital'
import { setHospitalName } from '../../actions/hospital'
import HospitalDetails from './HospitalDetails'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import useHospitalSettingWrite from '../../hooks/useHospitalSettingWrite'
import useHospitalDetailsUpdate from '../../hooks/useHospitalDetailsUpdate'
import SnackBar from '../../components/SnackBar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyle = makeStyles((theme) => ({
  container: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
  },
  content: {
    height: 'calc(100% - 30px)',
    width: 'calc(100% - 30px)',
    backgroundColor: '#ffffff',
    padding: 30,
    overflow: 'auto',
  },
  photo: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '5px solid #9DE1FF',
    marginTop: 62,
  },
  heading: {
    width: 160,
  },
  text: {
    color: '#525151',
  },
  backdrop: {
    zIndex: 1,
    color: 'block',
  },
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
  photoContainer: {
    width: 210,
    position: 'relative',

    '& .MuiBackdrop-root': {
      zIndex: '0',
      position: 'absolute',
      width: '144px',
      height: '144px',
      borderRadius: '100px',
      backgroundColor: 'transparent',
    }
  }
}))

function Settings(props) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const accountKey = localStorage.getItem('accountKey')
  const formdata = new FormData()
  const isAdmin = localStorage.getItem('role')
  const [handleFileUpload, data] = useFileUpload();
  const [profile, setProfile] = useState({})
  const [openSpinner, setOpenSpinner] = useState(false)

  const [hospitalDetails, refetch] = useCustomFecth(
    METHOD.GET,
    `${URL.hospitalDetailsView}?accountKey=${accountKey}`
  )

  const isAbleToWrite = useHospitalSettingWrite()

  const [onSave, response] = useHospitalDetailsUpdate(refetch)



  useEffect(() => {
    setOpen(true)
  }, [response])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  // uploading profile
  function handleChange(e) {
    const item = e.target.files;
    formdata.append('files', item[0])
    handleFileUpload(formdata);
    setOpenSpinner(true)
  }

  useEffect(() => {
    !!hospitalDetails && localStorage.setItem('hospitalPhoto', hospitalDetails.hospitalPhoto)
    !!hospitalDetails && props.setHospitalProfile(hospitalDetails.hospitalPhoto)
  }, [hospitalDetails])

  useEffect(() => {
    !!data && setProfile({ ...profile, accountKey: hospitalDetails.accountKey, hospitalPhoto: data.data })
    !!data && setHospitalProfile(data.data)
  }, [data])

  useEffect(() => {
    !!data && !!profile && onSave(profile)
    setOpenSpinner(false)
  }, [profile])

  return (
    <Box className={classes.container}>
      <Box display="flex" className={classes.content}>
        <Box className={classes.heading}>
          <Typography className={classes.text}>Hospital Settings</Typography>
          {hospitalDetails && (
            <Box className={classes.photoContainer}>
              <Avatar src={hospitalDetails.hospitalPhoto} className={classes.photo} />
              {isAdmin === "ADMIN" &&
                <div>
                  <label for="files" name="files" >
                    <div style={{ display: "flex" }}>
                      <PhotoCameraRounded style={{ marginLeft: "110px" }} />
                    </div >
                  </label>
                  <input
                    type="file"
                    name="files"
                    onChange={handleChange}
                    id="files"
                    accept=".jpg,.png,.jpeg"
                    required
                    style={{ visibility: "hidden" }}
                  />
                </div>
              }
              { openSpinner && (
                <Backdrop open={openSpinner} >
                  <CircularProgress className={classes.backdrop} color="block !important" />
                </Backdrop>
              )}
            </Box>
          )}
        </Box>
        {hospitalDetails && (
          <HospitalDetails
            hospitalDetails={hospitalDetails}
            isAbleToWrite={isAbleToWrite}
            onSave={onSave}
          />
        )}
      </Box>
      {response && response.statusCode && response.statusCode === 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      {(response && response.name === 'Error' && response.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (response && response.name === 'Error' && response.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
      {response && response.statusCode && response.statusCode !== 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'error'}
        />
      )}
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHospitalName: (value) => dispatch(setHospitalName(value)),
    setHospitalProfile: (value) => dispatch(setHospitalProfile(value)),
  }
}

export default connect(null, mapDispatchToProps)(Settings)

//export default Settings
