export const setSocket = (value) => ({ type: 'SET_SOCKET', data: value })

export const setTimer = (value) => ({ type: 'SET_TIMER', data: value })

export const setOpenSideBar = (value) => ({ type: 'SET_OPENSIDEBAR', data: value })

export const setSelectedAppointmentId = (value) => ({
  type: 'SET_PATIENTAPPOINTMENTID',
  data: value,
})

export const setSession = (value) => ({ type: 'SET_SESSION', data: value })

export const setMessages = (value, appointmentId) => ({
  type: 'SET_MESSAGES',
  data: value,
  appointmentId,
})

export const setPrescription = (value) => ({ type: 'SET_PRESCRIPTION', data: value })

export const clearChatMsg = (appointmentId) => ({
  type: 'CLEAR_CHAT_MESSAGE',
  payload: appointmentId,
})

export const clearMessages = (value) => ({ type: 'CLEAR_MESSAGES', data: value })

export const setIcon = (value) => ({ type: 'SET_ICON', data: value })

export const setLastRead = (index, appointmentId) => ({
  type: 'MARK_AS_READ',
  appointmentId,
  index,
})

export const setReportList = (value) => ({ type: 'SET_REPORT_LIST', data: value })