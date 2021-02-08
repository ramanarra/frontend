import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import useStyle from './useSideBarStyle'
import PatientList from './PatinetList'
import waitingIcon from '../../assets/img/waiting.svg'
import tabIcon from '../../assets/img/tab.svg'
import chatIcon from '../../assets/img/chat-icon.svg'
import SelectedWaitingIcon from '../../assets/img/selected-waiting-icon.svg'
import SelectedChatIcon from '../../assets/img/selected-chat-icon.svg'
import SelectedTabIcon from '../../assets/img/selected-tab-icon.svg'
import Chat from './Chat'
import MedicineList from './MedicineList'
import AddNewPatientConfirmationModel from './AddNewPatientConfirmationModel'
import { setOpenSideBar, setSelectedAppointmentId } from '../../actions/doctor'

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
  setIsPatientClick,
  waitingPatient,
  isWaiting,
  waitingIndex,
  setPatientAppointmentId,
  setOpenSideBar,
  setSelectedAppointmentId,
  setFullScreen,
  setInterChange,
  appointmentId,
  patientName,
  doctorName,
}) {
  const classes = useStyle()

  const [open, setOpen] = useState(true)

  const [openChat, setOpenChat] = useState(false)

  const [openMedicine, setOPenMedicine] = useState(false)

  const [isWaitingActive, setIsWaitingActive] = useState(true)

  const [isChatActive, setIsChatActive] = useState(false)

  const [isMedicineActive, setIsMedicineActive] = useState(false)

  const [openTopBar, setOpenTopBar] = useState(true)

  const [selected, setSelected] = useState(null)

  const [index, setIndex] = useState(null)

  const [nextPatientDetails, setNextPatientDetails] = useState(null)

  const [count, setCount] = useState(0)

  const [id, setId] = useState(null)

  useEffect(() => {
    if (isWaiting) {
      setOpen(true)
    }
  }, [isWaiting])

  useEffect(() => {
    let isNext = true
    for (let index = 0; index < patientList.length; index++) {
      if (
        patientList.length === 1 &&
        selected === patientList[index].appointmentId &&
        isNext
      ) {
        setId(null)
        isNext = false
      }
      if (selected !== patientList[index].appointmentId && isNext) {
        setId(patientList[index].appointmentId)
        isNext = false
      }
    }
  }, [patientList, selected])

  function handleOnPatientList() {
    setOpenTopBar(true)
    setOpen(true)
    setOpenChat(false)
    setOPenMedicine(false)
    setIsChatActive(false)
    setIsMedicineActive(false)
    setIsWaitingActive(true)
    setOpenSideBar(true)
  }

  function handleOnClose(event) {
    setOpen(false)

    event.preventDefault()
  }

  function handleOnChat() {
    setOpenChat(true)
    setIsChatActive(true)
    setOPenMedicine(false)
    setOpen(false)
    setIsMedicineActive(false)
    setIsWaitingActive(false)
  }

  function handleOnMedicine() {
    setOPenMedicine(true)
    setIsMedicineActive(true)
    setOpenChat(false)
    setOpen(false)
    setIsChatActive(false)
    setIsWaitingActive(false)
  }

  const handleOnPatientJoining = (
    appointmentId,
    firstName,
    lastName,
    index,
    status
  ) => {
    const name = lastName ? `${firstName} ${lastName}` : firstName
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
    setPatientAppointmentId(appointmentId)
    setSelectedAppointmentId(appointmentId)
  }

  function NextPatient(status) {
    if (index !== null && index < patientList.length - 1) {
      handleOnPatientJoining(
        patientList[index + 1].appointmentId,
        patientList[index + 1].firstName,
        patientList[index + 1].lastName,
        index + 1,
        status
      )
    } else if (index === null && patientList.length === 1) {
      handleOnPatientJoining(
        patientList[0].appointmentId,
        patientList[0].firstName,
        patientList[0].lastName,
        Number(0),
        status
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
      {(localStorage.getItem('loginUser') === 'doctor' ||
        localStorage.getItem('loginUser') === 'patient') && (
        <div>
          <div>
            {!open && !openChat && !openMedicine && (
              <div className={classes.arrowIcon}>
                <ArrowBackIosIcon
                  className={classes.icon}
                  onClick={handleOnPatientList}
                />
              </div>
            )}
            {openTopBar && (
              <div className={classes.topBar}>
                <div
                  className={
                    localStorage.getItem('loginUser') === 'doctor'
                      ? classes.icons
                      : classes.patientIcons
                  }
                >
                  {localStorage.getItem('loginUser') === 'doctor' && (
                    <div className={classes.groupIconHeader}>
                      {isWaitingActive ? (
                        <img
                          src={SelectedWaitingIcon}
                          className={classes.groupIcon}
                          onClick={handleOnPatientList}
                        />
                      ) : (
                        <img
                          src={waitingIcon}
                          className={classes.groupIcon}
                          onClick={handleOnPatientList}
                        />
                      )}
                    </div>
                  )}
                  <div className={classes.chatIconHeader}>
                    {isChatActive ? (
                      <img
                        src={SelectedChatIcon}
                        className={classes.chatIcon}
                        onClick={handleOnChat}
                      />
                    ) : (
                      <img
                        src={chatIcon}
                        className={classes.chatIcon}
                        onClick={handleOnChat}
                      />
                    )}
                  </div>
                  <div className={classes.tabIconHeader}>
                    {isMedicineActive ? (
                      <img
                        src={SelectedTabIcon}
                        className={classes.tabIcon}
                        onClick={handleOnMedicine}
                      />
                    ) : (
                      <img
                        src={tabIcon}
                        className={classes.tabIcon}
                        onClick={handleOnMedicine}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {open && localStorage.getItem('loginUser') === 'doctor' && (
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
              setOpenTopBar={setOpenTopBar}
              setFullScreen={setFullScreen}
              setInterChange={setInterChange}
            />
          )}
        </div>
      )}
      {openChat && (
        <Chat
          onClose={handleChatClose}
          setOpenTopBar={setOpenTopBar}
          doctorName={doctorName}
          patientName={patientName}
        />
      )}
      {openMedicine && (
        <MedicineList
          onClose={handleMedicineClose}
          setOpenTopBar={setOpenTopBar}
          appointmentId={selected}
        />
      )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
    setSelectedAppointmentId: (data) => dispatch(setSelectedAppointmentId(data)),
  }
}

export default connect(null, mapDispatchToProps)(SideBar)
