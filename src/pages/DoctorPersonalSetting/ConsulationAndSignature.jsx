import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { Edit, Check, Clear } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { EditTip, UploadImageTip } from '../../components/Tooltip'
import SnackBar from '../../components/SnackBar'
import Signature from '../../assets/img/sign.jpg'
import messages from '../../lib/iconMsg'
import useDoctorDetailsUpdate from '../../hooks/useDoctorDetailsUpdate'
import useSignatureUpload from '../../hooks/useSignatureUpload'
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded'

const useStyles = makeStyles(() => ({
  photoContainerhead: {
    position: 'absolute',
    right: 80,
  },
  backdropbox: {
    position: 'absolute',
    left: 100,
  },
  backdropcircle: {
    zIndex: 1,
    color: 'black',
  },
  notchedOutline: {
    '& input': {
      backgroundColor: '#f7f7f7',
      color: '#777777',
      height: 10,
    },
    '& div': {
      backgroundColor: '#f7f7f7',
    },
    '& fieldset': {
      paddingLeft: 8,
      height: 28,
      color: '#777777',
      border: 'none',
    },
    width: 310,
    color: '#777777',
    paddingBottom: 20,
  },
  text: {
    fontSize: 13.5,
    paddingBottom: 6,
    color: '#4e4e4e',
  },

  signature: {
    width: 433,
    height: 90,
    overflow: 'hidden',
    position: 'relative',
    left: -50,
    '& before': {
      content: '',
      position: 'absolute',
      border: '5px dashed #FF0000',
      top: -3,
      bottom: -3,
      left: -3,
      right: -3,
    },
  },

  sign: {
    marginLeft: 150,
    height: 90,
    fill: '#f7f7f7',
  },

  iconStart: {
    color: '#777777',
    fontSize: 13,
  },

  iconbutton: {
    color: 'rgb(36, 189, 255)',
    marginTop: -9,
    padding: 5,
  },

  editIcon: {
    fontSize: 20,
  },

  cancelation: {
    color: 'rgb(36, 189, 255)',
    fontSize: 20,
  },

  checkIcon: {
    fontSize: 20,
  },

  icon: {
    paddingLeft: 8,
    paddingTop: 4,
  },

  editable: {
    paddingBottom: 0,
    marginBottom: 20,
    border: '1px solid',
  },

  response: {
    fontSize: 14,
    color: 'red',
  },
  positionfeild: {
    position: 'absolute',
    top: 30,
  },

  photoContainer: {
    width: 433,
    position: 'relative',

    '& .MuiBackdrop-root': {
      zIndex: '0',
      position: 'absolute',
      width: '144px',
      height: '144px',
      marginLeft: '1px',
      borderRadius: '100px',
      backgroundColor: 'transparent',
    },
  },
}))

function ConsulationAndSignature({
  docKey,
  configDetails,
  doctorDetails,
  onSave,
  isAbleToWrite,
  response,
  handleSignatureUpload,
  contents,
}) {
  const [fees, setFees] = useState(0)
  const [disable, setDisable] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const formdata = new FormData()
  const [image, setImage] = useState([])
  const [openSpinner, setOpenSpinner] = useState(false)

  useEffect(() => {
    setFees(configDetails?.consultationCost)
  }, [configDetails])

  const setfee = (event) => {
    if (!isNaN(event.target.value) && event.target.value < 10000) {
      setFees(event.target.value)
    }
  }
  function handleOndisabled() {
    setDisable(true)
  }

  function handleOnCancel() {
    setFees(configDetails?.consultationCost)
    setDisable(false)
  }

  function hanleOnSave() {
    if (fees) {
      const params = {
        doctorKey: docKey,
        consultationCost: Number(fees),
      }

      onSave(params)
      setDisable(false)
      setOpen(true)
    }
  }
  useEffect(() => {
    !!doctorDetails && localStorage.setItem('signature', doctorDetails.signature)
  }, [doctorDetails])

  useEffect(() => {
    setOpen(true)
  }, [response])

  useEffect(() => {
    !!contents && setOpenSpinner(false)
  }, [contents])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  function handlePhotoChange(e) {
    const item = e.target.files
    setImage(item)
    formdata.append('file', item[0])
    formdata.append('doctorId', doctorDetails.doctorId)
    handleSignatureUpload(formdata)
    setOpenSpinner(true)
    setOpen(true)
  }

  return (
    <Box>
      <Typography className={classes.text}>Consultation Base Fees</Typography>
      <Box display="flex">
        <TextField
          className={classNames(classes.notchedOutline, {
            [classes.editable]: disable === true,
          })}
          variant="outlined"
          value={fees}
          disabled={!disable}
          onChange={setfee}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className={classes.iconStart}>INR</span>
              </InputAdornment>
            ),
          }}
        />
        {isAbleToWrite && (
          <div className={classes.icon}>
            {!disable ? (
              <IconButton
                className={classes.iconbutton}
                onClick={() => handleOndisabled()}
              >
                <EditTip title={messages.edit} placement="right" />
              </IconButton>
            ) : (
              <div>
                <IconButton className={classes.iconbutton} onClick={handleOnCancel}>
                  <Clear className={classes.cancelation} />
                </IconButton>
                <IconButton className={classes.iconbutton} onClick={hanleOnSave}>
                  <Check className={classes.checkIcon} />
                </IconButton>
              </div>
            )}
          </div>
        )}
      </Box>
      <Box>
        <Typography className={classes.text}>Signature</Typography>
        <Box className={classes.photoContainer} style={{ display: 'flex' }}>
          <div className={classes.signature}>
            <img
              src={doctorDetails?.signature ? doctorDetails.signature : image}
              className={classes.sign}
            />
          </div>
          <div>
            {openSpinner && (
              <Backdrop className={classes.backdropbox} open={openSpinner}>
                <CircularProgress
                  className={classes.backdropcircle}
                  color="block !important"
                />
              </Backdrop>
            )}
          </div>

          <div className={classes.photoContainerhead}>
            <label style={{ width: '10px', height: '10px' }}>
              <UploadImageTip
                title={messages.uploadimage}
                placement="right"
                className={classes.positionfeild}
              />
              <input
                type="file"
                name="files"
                id="files"
                accept=".jpg,.png,.jpeg"
                required
                style={{ visibility: 'hidden' }}
                onChange={handlePhotoChange}
              />
            </label>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default ConsulationAndSignature
