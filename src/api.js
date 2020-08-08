import axios from 'axios'

export default axios.create({
  baseURL: 'http://dev-api.virujh.com:8081/api',
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
  patient: {
    list: '/calendar/doctor/patientList',
    detials: '/calendar/doctor/patientDetails',
    update: '/calendar/patient/detailsEdit',
  },
  appointmentSlotsView: '/calendar/doctor/appointmentSlotsView',
  appointmentView: '/calendar/appointmentView',
  appointmentCancel: '/calendar/doctor/appointmentCancel',
  availableSlot: '/calendar/doctor/availableSlots',
  appointmentReschedule: '/calendar/doctor/appointmentReschedule',
  patientSearch: '/calendar/doctor/patientSearch',
  createAppointment: '/calendar/doctor/createAppointment',
  createAppointmentAlongWIthRegisteringPatient:
    '/calendar/doctor/creatingAppointmetAlongWithRegisteringPatient',
  patientUpcomingAppointments: '/calendar/patient/upcomingAppointmentsList',
  patientPastAppointments: '/calendar/patient/pastAppointmentsList',
  patientDoctorList: '/calendar/patient/doctorList',
  findDoctorByCodeOrName: '/calendar/patient/findDoctorByCodeOrName',
  listOfDoctorsInHospital: '/calendar/patient/listOfDoctorsInHospital',
  appointmentDoctorDetails: '/calendar/patient/appointmentDoctorDetails',
  viewDoctorDetails: '/calendar/patient/viewDoctorDetails',
  patientAppointmentSlotsView: '/calendar/patient/appointmentSlotsView',
  patientBookAppointment: '/calendar/patient/bookAppointment',
}
