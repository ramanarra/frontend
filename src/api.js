import axios from 'axios'

export default axios.create({
  baseURL: 'http://13.127.101.235:8081/api',
})

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
}

export const URL = {
  doctorLogin: 'auth/doctorLogin',
  doctorList: `/calendar/doctor/list`,
  patientLogin: 'auth/patientLogin',
  patientSignup: '/auth/patientRegistration',
  doctorSettingsPersonalView: '/calendar/doctor/personalSettingsView',
  doctorConfigUpdate: '/calendar/doctor/configUpdate',
  workschedule: {
    data: '/calendar/doctor/workScheduleView',
    update: '/calendar/doctor/workScheduleEdit',
  },
  appointmentSlotsView: '/calendar/doctor/appointmentSlotsView',
  appointmentView: '/calendar/appointmentView',
  appointmentCancel: '/calendar/doctor/appointmentCancel',
  availableSlot: '/calendar/doctor/availableSlots',
  appointmentReschedule: '/calendar/doctor/appointmentReschedule',
  patientSearch: '/calendar/doctor/patientSearch',
  createAppointment: '/calendar/doctor/createAppointment',
  createAppointmentAlongWIthRegisteringPatient: '/calendar/doctor/creatingAppointmetAlongWithRegisteringPatient',
  patientUpcomingAppointments: '/calendar/patient/upcomingAppointmentsList',
  patientPastAppointments: '/calendar/patient/pastAppointmentsList',
  patientDoctorList: '/calendar/patient/doctorList',
  findDoctorByCodeOrName: '/calendar/patient/findDoctorByCodeOrName',
  listOfDoctorsInHospital: '/calendar/patient/listOfDoctorsInHospital',
  appointmentDoctorDetails: '/calendar/patient/appointmentDoctorDetails',
  viewDoctorDetails: '/calendar/patient/viewDoctorDetails',
  patientAppointmentSlotsView: '/calendar/patient/appointmentSlotsView'
}
