import React, {useState} from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import PatientList from './PatinetList'
import waitingIcon from '../../assets/img/waiting.svg'
import tabIcon from '../../assets/img/tab.svg'
import chatIcon from '../../assets/img/chat-icon.svg'
import Chat from './Chat'
import MedicineList from './MedicineList'

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

function SideBar({patientList, onPatientJoining, endCall, end}) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const [openChat, setOpenChat] = useState(false)

  const [openMedicine, setOPenMedicine] = useState(false)

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

  return (
    <Box>
      {localStorage.getItem('loginUser') === 'doctor' && (
        <div>
          <div className={classes.topBar}>
            {!open && (
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
          onJoiningPatient={onPatientJoining}
          end={end}
          endCall={endCall}
        />
      )}
      {openChat && <Chat />}
      {openMedicine && <MedicineList />}
    </Box>
  )
}

export default SideBar
