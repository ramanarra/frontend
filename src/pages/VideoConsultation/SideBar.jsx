import React, { useState, useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import PatientList from './PatinetList'
import waitingIcon from '../../assets/img/waiting.svg'
import tabIcon from '../../assets/img/tab.svg'
import chatIcon from '../../assets/img/chat-icon.svg'
import Chat from './Chat'
import MedicineList from './MedicineList'
import AddNewPatientConfirmationModel from './AddNewPatientConfirmationModel'
import { setPatientClicked } from '../../actions/patients'


const useStyle = makeStyles(() => ({
  topBar: {
    width: 355,
    height: 60,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
  groupIcon: {
    width: 26,
    marginLeft: 53,
    marginRight: 50,
    cursor: 'pointer',
    marginTop: 3,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'absolute',
    top: 10,
    right: 338,
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },
  icon: {
    marginTop: 8,
    marginLeft: 12,
    color: '#a8a8a8',
  },
  chatIcon: {
    width: 30,
    marginLeft: 44,
    marginRight: 40,
    cursor: 'pointer',
    marginTop: 7,
  },
  tabIcon: {
    width: 28,
    marginLeft: 30,
    cursor: 'pointer',
    marginTop: 21,
  },
  icons: {
    display: 'flex',
  },
  groupIconHeader: {
    width: 125,
    borderRight: '1px solid #d9d6d6',
    marginTop: 13,
  },
  chatIconHeader: {
    width: 120,
    borderRight: '1px solid #d9d6d6',
    marginTop: 13,
  },
}))

function SideBar({
  patientList,
  onPatientJoining,
  endCall,
  socket,
  openDialog,
  onClose,
  setAppointmentId,
  AddNextPatient,
  byDoctor,
  clickByDoctor,
  setPatientClicked,
  setIsPatientClick,
  waitingPatient,
  isWaiting,
  waitingIndex,
}) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const [openChat, setOpenChat] = useState(false)

  const [openMedicine, setOPenMedicine] = useState(false)

  const [selected, setSelected] = useState(null)

  const [index, setIndex] = useState(null)

  const [nextPatientDetails, setNextPatientDetails] = useState(null)

  const [count, setCount] = useState(0)

  const [id, setId] = useState(null)

  useEffect(() => {
    if(isWaiting) {
      setOpen(true)
    }
  }, [isWaiting])

  useEffect(() => {
    let isNext = true
    for (let index = 0; index < patientList.length; index++) {
      if(selected !== patientList[index].appointmentId && isNext) {
        setId(patientList[index].appointmentId)
        isNext = false
      }
    }
  }, [patientList, selected])

  function handleOnPatientList() {
    setOpen(true)
    setOpenChat(false)
    setOPenMedicine(false)
  }

  function handleOnClose(event) {
    setOpen(false)

    event.preventDefault()
  }

  function handleOnChat() {
    setOpenChat(true)
    setOPenMedicine(false)
    setOpen(false)
  }

  function handleOnMedicine() {
    setOPenMedicine(true)
    setOpenChat(false)
    setOpen(false)
  }

  const handleOnPatientJoining = (appointmentId, firstName, lastName, index, status) => {
    const name = lastName ? firstName + lastName : firstName
    onPatientJoining(appointmentId, name)
    socket.emit('updateLiveStatusOfUser', { status: 'inSession' })
    if (selected) {
      socket.emit('removePatientTokenByDoctor', {
        appointmentId: selected,
        status: status,
      })
    }
    setSelected(appointmentId)
    setIndex(index)
    setAppointmentId(appointmentId)
    setIsPatientClick(true)
  }

  function NextPatient(status) {
    if (index !== null && index < patientList.length - 1) {
      handleOnPatientJoining(
        patientList[index + 1].appointmentId,
        patientList[index + 1].firstName,
        patientList[index + 1].lastName,
        index + 1,
        status,
      )
    }  
    else if (index === null && patientList.length === 1) {
      handleOnPatientJoining(
        patientList[0].appointmentId,
        patientList[0].firstName,
        patientList[0].lastName,
        Number(0),
        status,
      )
    } else if (index === null && patientList.length > 1) {
      handleOnPatientJoining(
        patientList[0].appointmentId,
        patientList[0].firstName,
        patientList[0].lastName,
        Number(0),
        status
      )
    }
  }

  function handleChatClose() {
    setOpenChat(false)
  }

  function handleMedicineClose() {
    setOPenMedicine(false)
  }

  return (
    <Box>
      {localStorage.getItem('loginUser') === 'doctor' && (
        <div>
          <div className={classes.topBar}>
            {!open && !openChat && !openMedicine && (
              <div className={classes.arrowIcon}>
                <ArrowBackIosIcon
                  className={classes.icon}
                  onClick={handleOnPatientList}
                />
              </div>
            )}
            <div className={classes.icons}>
              <div className={classes.groupIconHeader}>
                <img
                  src={waitingIcon}
                  className={classes.groupIcon}
                  onClick={handleOnPatientList}
                />
              </div>
              <div className={classes.chatIconHeader}>
                <img
                  src={chatIcon}
                  className={classes.chatIcon}
                  onClick={handleOnChat}
                />
              </div>
              <div className={classes.tabIconHeader}>
                <img
                  src={tabIcon}
                  className={classes.tabIcon}
                  onClick={handleOnMedicine}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {open && (
        <PatientList
          patientList={patientList}
          open={open}
          onClose={handleOnClose}
          onJoiningPatient={handleOnPatientJoining}
          endCall={endCall}
          presentAppointmentId={selected}
          index={index}
          AddNextPatient={AddNextPatient}
          nextPatientDetails={setNextPatientDetails}
          clickByDoctor={clickByDoctor}
          waitingPatient={waitingPatient}
          isWaiting={isWaiting}
          waitingIndex={waitingIndex}
          count={count}
          setCount={setCount}
          id={id}
        />
      )}
      {openChat && <Chat onClose={handleChatClose} />}
      {openMedicine && <MedicineList onClose={handleMedicineClose} />}
      {openDialog && (
        <AddNewPatientConfirmationModel
          open={openDialog}
          onClose={onClose}
          NextPatient={NextPatient}
          onPatientJoining={handleOnPatientJoining}
          nextPatientDetails={nextPatientDetails}
          byDoctor={byDoctor}
        />
      )}
    </Box>
  )
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setPatientClicked: () => dispatch(setPatientClicked(true))
//   }
// }

// export default connect(null, mapDispatchToProps)(SideBar);
export default SideBar
