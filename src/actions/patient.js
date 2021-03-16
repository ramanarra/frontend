export const setPatientName = (value) => { return { type: 'PATIENT_NAME', data: value } }

export const setPatientProfile = (value) => { return { type: 'PATIENT_PROFILE', data: value } }

export const setPatientAppointmentList = (value) => { return { type: 'PATIENT_APPOINTMENT_LIST', data: value } }

export const setPatientAppointment = (value) => { return { type: 'PATIENT_APPOINTMENT', data: value } }

export const setIsPast = (value) => { return { type: 'IS_PAST', data: value } }
