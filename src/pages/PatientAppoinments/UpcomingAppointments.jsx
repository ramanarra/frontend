import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Button, Dialog, DialogContent, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
// import {mapDispatchToProps} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import PatientAppointmentSlot from './PatientAppointmentSlot'
import useManualFetch from '../../hooks/useManualFetch'
import { useLocation } from 'react-router-dom'
import { METHOD, URL } from '../../api'
import borderColors from './constants'
import useAppointmentUpdate from '../../hooks/useAppointmentUpdate'
import SnackBar from '../../components/SnackBar'
import ScheduleImg from '../../assets/img/Schedule.svg'
import CloseIcon from '@material-ui/icons/Close'
import { setvideoStatus } from '../../actions/patient'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: '1.5%',
    paddingLeft: '1%',
    paddingRight: '1%',
    overflowY: 'auto',
    '& .infinite-scroll-component__outerdiv': {
      width: '100%',
      height: '100%',
    },
  },
  scrollContainter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  closeIcon: {
    cursor: 'pointer',
    color: '#a8a8a8',
    margin:'-15px'
  },
  text:{
    position: 'relative',
    textAlign:'center',
    marginTop: '7px'
  },
  dialog:{
    height: '106px',
 
  },
  cancelText: {
    fontSize: 12,
    fontFamily: 'product-sans-regular, sans-serif',
  },
  cancelButton: {
    padding: '2.5px 22px',
    borderRadius: 25,
    backgroundColor: '#e1e0e0',
    marginTop:'14px',
    cursor: 'pointer',
    textAlign:'center',
    marginLeft:'40%',
    width:'20%'
   
  },
  appointmentSlots: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    height: 'fit-content',
  },
  noappointmentsBox: {
    width: '100%',
    textAlign: 'center',
  },
  noappointmentsImage: {
    width: 450,
  },
  icon: {
    textAlign: 'end',
    marginTop:'-15px',
  },
  button: {
    padding: '8px 18px',
    borderRadius: 25,
    color: '#ffffff',
  },
}))

function UpcomingAppointments(props) {

  const [open, setOpen] = useState(false)
  const classes = useStyle()
  const history = useHistory()
  const location = useLocation()
  const [isRefetch, setRefetch] = useState(false)

  const [paginationNumber, setPaginationNumber] = useState(0)

  const [appointmentsList, setAppointmentsList] = useState([])

  const [updateDate, error, loading, data] = useManualFetch()

  const { newValue } = props

  const [openDialog, setOpenDialog] = useState(true)
 
  const refetch = () => {
    setPaginationNumber(0)
    setAppointmentsList([])
    setRefetch(!isRefetch)
  }

  const [onSave, response] = useAppointmentUpdate(refetch)

  useEffect(() => {
    if (data?.appointments) {
      setAppointmentsList(appointmentsList.concat(data.appointments))
    }
  }, [data])

  useEffect(() => {
    const limit = '15'
    updateDate(
      METHOD.GET,
      `${
        URL.patientUpcomingAppointments
      }${'?limit='}${limit}${'&paginationNumber='}${paginationNumber}`
    )
  }, [paginationNumber, isRefetch])

  useEffect(() => {
    if (response) {
      setOpen(true)
    }
  }, [response])


  // const
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setOpenDialog(false)
    props.setVideoStatus()
    
  }

  function handleOnClick() {
    history.push('/patient/find-doctor')
  }

  const fetchData = () => {
    setPaginationNumber(paginationNumber + 1)
  }

  return (
    <Box className={classes.container} display="flex" flexWrap="wrap">
      <InfiniteScroll
        dataLength={appointmentsList.length}
        next={fetchData}
        hasMore={true}
        height={'100%'}
        className={classes.scrollContainter}
      >
        <Box className={classes.appointmentSlots}>
          {appointmentsList &&
            appointmentsList.map((appointmentDetail, index) => {
              return (
                <PatientAppointmentSlot
                  appointmentDetail={appointmentDetail}
                  borderColor={borderColors[index % 4]}
                  key={index}
                  onSave={onSave}
                  past={false}
                  list={appointmentsList}
                />
              )
            })}
        </Box>

        {newValue == 'completed' &&
          <Box>
            <Dialog open={openDialog}>
              <DialogContent className={classes.dialog}>
                < Box className={classes.icon}>
                  <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                </Box>
                <Box>
                <Typography className={classes.text} variant="h5">
                Video Consultation has been ended sucessfully, Thank you
               </Typography>
               </Box>
               <Box className={classes.cancelButton} onClick={handleClose}>
                <Typography className={classes.cancelText}>OK</Typography>
              </Box>
              </DialogContent>
            </Dialog>
          </Box>
        }




        {appointmentsList &&
          (appointmentsList.length === 0 || appointmentsList.statusCode === 204) && (
            <Box className={classes.noappointmentsBox}>
              <img src={ScheduleImg} className={classes.noappointmentsImage} />
              <Box>
                <Button
                  className={classes.button}
                  style={{ backgroundColor: '#0bb5ff' }}
                  onClick={handleOnClick}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          )}
      </InfiniteScroll>
      {response && response.data?.appointment && (
        <SnackBar
          openDialog={open}
          message={'Appointment Rescheduled Sucessfully'}
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
      {(response &&
        response.data?.statusCode &&
        response.data?.statusCode === 200 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'success'}
          />
        )) ||
        (response && response.data?.statusCode === 404 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'info'}
          />
        )) ||
        (response && response.data?.statusCode === 400 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'info'}
          />
        )) ||
        (response && response.data?.statusCode === 502 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'error'}
          />
        )) ||
        (response && response.data?.statusCode && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onClose={handleClose}
            severity={'error'}
          />
        ))}
    </Box>
  )
}
const mapStateToProps = (state) => {
  return {
    newValue: state.patient.newValue,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setVideoStatus: () => dispatch(setvideoStatus(null)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingAppointments)
