import React, { useMemo,useState,useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { URL, METHOD } from '../../api'
import Static from './StaticField'
import ConsulationAndSignature from './ConsulationAndSignature'
import useCustomFecth from '../../hooks/useCustomFetch'
import useDoctorConfigUpdate from '../../hooks/useDoctorConfigUpdate'
import useDoctorDetailsUpdate from '../../hooks/useDoctorDetailsUpdate'

import useDocSettingWrite from '../../hooks/useDocSettingWrite'
import LeftArrow from '../../assets/img/left-arrow.svg'
import Profile from '../../assets/img/profile.png'

import useFileUpload from '../../hooks/useFileUpload'
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded'
import SnackBar from '../../components/SnackBar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyle = makeStyles((theme) => ({
  container: {
    width: 'calc(100% - 257px)',
    paddingTop: 20,
    paddingLeft: 30,
    height: 'calc(100% - 20px)',
    overflow: 'auto',
  },

  leftSide: {
    paddingLeft: 28,
  },

  leftArrow: {
    width: 20,
    color: '#444444',
    cursor: 'pointer',
  },

  photo: {
    marginTop: 40,
    marginLeft: 10,
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '5px solid #9DE1FF',
  },

  text: {
    color: '#444444',
    paddingLeft: 20,
  },

  rightSide: {
    paddingTop: 40,
    paddingLeft: 75,
    width: '100%',
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

    '& .MuiBackdrop-root' : {
      zIndex: '0',
      position: 'absolute',
      width: '144px',
      height: '144px',
      marginLeft: "10px",
      borderRadius: '100px',
      backgroundColor: 'transparent',
  }
}
}))

function DoctorPersonalSetting() {
  const classes = useStyle()
  const { id } = useParams()
  const history = useHistory()

  const isAbleToWrite = useDocSettingWrite()

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  }, [id])
  const [data, refetch] = useCustomFecth(
    METHOD.GET,
    URL.doctorSettingsPersonalView,
    key
  )
  const isDoctor = localStorage.getItem('role')
  const formdata = new FormData();
  const [profile, setProfile] = useState({})
  const [handleFileUpload, content] = useFileUpload();
  const [image, setImage] = useState([])
  const [onSave, response] = useDoctorConfigUpdate(refetch)
  const [onUpdate, returnData] = useDoctorDetailsUpdate(refetch)
  const [open, setOpen] = useState(false)
  const [openSpinner, setOpenSpinner] = useState(false)

  function handleOnBack() {
    history.push('/doctors')
  }

  function handleChange(e) {
    const item = e.target.files;
    setImage(item);
    formdata.append('files', item[0])

    handleFileUpload(formdata);
    setOpenSpinner(true)
  }

  useEffect(() => {
    !!content && setProfile({ ...profile,doctorKey: id, photo: content.data })
  }, [content])

  useEffect(() => {
   !!content && !!profile && onUpdate(profile)
   setOpenSpinner(false)
  }, [profile])

  useEffect(()=>{
    !!data && localStorage.setItem('photo', data.doctorDetails.photo)
  },[data])

  useEffect(() => {
    setOpen(true)
  },[response])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Box className={classes.container}>
      {data && (
        <Box display="flex">
          <Box className={classes.leftSide}>
            <Box display="flex">
              <img
                src={LeftArrow}
                alt="leftArrow"
                className={classes.leftArrow}
                onClick={handleOnBack}
              />
              <Typography className={classes.text}>Doctors Details</Typography>
            </Box>
            <Box style={{width:"150px"}} className={classes.photoContainer}>
              <Avatar src={data.doctorDetails.photo ? data.doctorDetails.photo : Profile} className={classes.photo} />

              {/* update profile image */}
              {isDoctor==="DOCTOR" &&
              <div>
             <label for="files" name="files" >
             <div style={{ display: "flex" }}>
               <PhotoCameraRounded style={{  marginLeft: "130px" }} />
             </div>
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

             {openSpinner && (
             <Backdrop  open={openSpinner} >
               <CircularProgress  className={classes.backdrop} color="block !important" />
             </Backdrop>
             )}
            </Box>
            
          </Box>
          <Box className={classes.rightSide}>
            <Static doctorDetails={data?.doctorDetails} />
            <ConsulationAndSignature
              docKey={id}
              configDetails={data?.configDetails}
              doctorDetails={data?.doctorDetails}
              onSave={onSave}
              isAbleToWrite={isAbleToWrite}
              response={response}
            />
            {/* <Preconsultancy
            refetch={refetch}
            docKey={id}
            configDetails={data?.configDetails}
            onSave={onSave}
            isAbleToWrite={isAbleToWrite}
          /> */}
          </Box>
        </Box>
      )}

      {/* response messages */}
      {returnData && returnData.statusCode && returnData.statusCode === 200 && (
        <SnackBar
          openDialog={open}
          message={returnData.message}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      {(returnData && returnData.name === 'Error' && returnData.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (returnData && returnData.name === 'Error' && returnData.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
      {returnData && returnData.statusCode && returnData.statusCode !== 200 && (
        <SnackBar
          openDialog={open}
          message={returnData.message}
          onclose={handleClose}
          severity={'error'}
        />
      )}
    </Box>
  )
}

export default DoctorPersonalSetting
