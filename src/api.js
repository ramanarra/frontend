import axios from 'axios'

export default axios.create({
  baseURL: 'http://13.126.255.114:8081/api/',
})

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
}

export const URL = {
  doctorLogin: 'auth/doctorLogin',
  patientLogin: 'auth/patientLogin',
  patientSignup: '/auth/patientRegistration',
  doctorList: `calendar/doctor/list?key=$`,
  doctorSettingsPersonalView: 'calendar/doctor/personalSettingsView',
  doctorConfigUpdate: 'calendar/doctor/configUpdate',
  workschedule: {
    data: '/calendar/doctor/workScheduleView',
    update: '/calendar/doctor/workScheduleEdit',
  },
  patient: {
    list: '/calendar/doctor/patientList',
    detials: '/calendar/doctor/patientDetails',
    update: '/calendar/patient/detailsEdit',
  },
}
