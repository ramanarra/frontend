import { IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddNewPatientConfirmationModel from '../AddNewPatientConfirmationModel'
import Chat from '../Chat'
import MedicineList from '../MedicineList'
import PatinetList from '../PatinetList'
import { IoIosArrowBack as ArrowIcon } from 'react-icons/io'
import { FaArrowLeft as BackIcon } from 'react-icons/fa'
import clsx from 'clsx'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedAppointmentId } from '../../../actions/doctor'
import { BsFillChatDotsFill as ChatIcon } from 'react-icons/bs'
import { CgPill as PillIcon } from 'react-icons/cg'
import { MdClose as CloseIcon } from 'react-icons/md'

const Sidebar = ({
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
  setFullScreen,
  setInterChange,
  appointmentId,
  patientName,
  doctorName,
  prescription,
  userRole,
  ...rest
}) => {
  const isDoc = userRole === 'DOCTOR'
  const [index, setIndex] = useState(null)
  const [selected, setSelected] = useState(null)
  const [nextPatientDetails, setNextPatientDetails] = useState(null)
  const [id, setId] = useState(null)
  const [tab, switchTab] = useState(isDoc ? 3 : 1)
  const [count, setCount] = useState(0)
  const [isOpen, setOpen] = useState(isDoc || false)

  //dispatch select appointment redux reducer
  const dispatch = useDispatch()
  const setSelectedAppointment = (id) => dispatch(setSelectedAppointmentId(id))

  //redux values
  const messages = useSelector((state) => state.doctor.messages[appointmentId])
  const lastRead = useSelector((state) => state.doctor.lastRead[appointmentId])

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
    setSelectedAppointment(appointmentId)
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

  const openChat = (e) => {
    e.stopPropagation()
    tab !== 1 && switchTab(1)
    setOpen(true)
  }

  const hasBack = tab !== 3
  const notRead = !!messages?.length ? messages.length - parseInt(lastRead || 0) : 0

  return (
    <div className={clsx('sidebar-wrap', isOpen && 'is-open')}>
      <div className="sidebar-toggle">
        <div
          className={clsx('arrow-icon-wrap', isOpen && 'is-open')}
          title={isOpen ? 'Hide Menu' : 'Expend Menu'}
          onClick={setOpen.bind(this, (prev) => !prev)}
        >
          <ArrowIcon className="arrow-icon" />
          {!!notRead && (
            <span
              className={clsx('unread-msgs', isDoc && 'has-hover')}
              onClick={openChat}
              title={`${notRead} unread message${notRead > 1 ? 's' : ''}`}
            >
              {notRead}
            </span>
          )}
        </div>
      </div>

      <div className={clsx('sidebar-content', isOpen && 'is-open')}>
        {hasBack && (
          <div className="navigation-bar">
            <div className="left-part">
              {isDoc && (
                <IconButton
                  className="back-btn"
                  onClick={switchTab.bind(this, 3)}
                  title="Back to patient list"
                >
                  <BackIcon className="back-icon" />
                </IconButton>
              )}
              <div className="person-name">{isDoc ? patientName : doctorName}</div>
            </div>
            <div className="right-part">
              {isDoc ? (
                <IconButton
                  className="back-btn"
                  onClick={switchTab.bind(this, tab === 1 ? 2 : 1)}
                  title={`Switch to ${tab === 1 ? 'prescription' : 'chat'}`}
                >
                  {tab === 1 ? (
                    <PillIcon className="other-icon" />
                  ) : (
                    <ChatIcon className="other-icon" />
                  )}
                </IconButton>
              ) : (
                <IconButton
                  className="back-btn"
                  onClick={setOpen.bind(this, false)}
                  title="close"
                >
                  <CloseIcon className="other-icon" />
                </IconButton>
              )}
            </div>
          </div>
        )}

        <div className={clsx('sidebar-screens', hasBack && 'has-back')}>
          {isDoc && tab === 3 && (
            <PatinetList
              patientList={patientList}
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
              setFullScreen={setFullScreen}
              setInterChange={setInterChange}
              doctorName={doctorName}
              userRole={userRole}
              switchTab={switchTab}
              notRead={notRead}
            />
          )}

          {tab === 1 && (
            <Chat
              doctorName={doctorName}
              patientName={patientName}
              userRole={userRole}
              prescription={prescription}
              appointmentId={selected || appointmentId}
              isSidebarOpen={isOpen}
            />
          )}

          {tab === 2 && (
            <MedicineList
              appointmentId={selected}
              userRole={userRole}
              socket={socket}
            />
          )}
        </div>
      </div>

      {openDialog && (
        <AddNewPatientConfirmationModel
          open={openDialog}
          onClose={onClose}
          NextPatient={NextPatient}
          onPatientJoining={handleOnPatientJoining}
          nextPatientDetails={nextPatientDetails}
          byDoctor={byDoctor}
          appointmentId={appointmentId}
        />
      )}
    </div>
  )
}

export default Sidebar
