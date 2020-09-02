import axios from 'axios'

export default axios.create({
  baseURL: 'https://dev.virujh.com/api/',
  // baseURL: 'https://7d59ccc763c7.ngrok.io/api/',
  // baseURL: 'https://virujh.com/api/',
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
  logout: '/auth/logout',
  hospitalDetailsEdit: '/calendar/doctor/hospitaldetailsEdit',
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
  hospitalDetailsView: '/calendar/doctor/hospitaldetailsView',
  patientUpcomingAppointments: '/calendar/patient/upcomingAppointmentsList',
  patientPastAppointments: '/calendar/patient/pastAppointmentsList',
  patientDoctorList: '/calendar/patient/doctorList',
  findDoctorByCodeOrName: '/calendar/patient/findDoctorByCodeOrName',
  listOfDoctorsInHospital: '/calendar/patient/listOfDoctorsInHospital',
  appointmentDoctorDetails: '/calendar/patient/appointmentDoctorDetails',
  viewDoctorDetails: '/calendar/patient/viewDoctorDetails',
  patientAppointmentSlotsView: '/calendar/patient/appointmentSlotsView',
  patientBookAppointment: '/calendar/patient/bookAppointment',
  patientViewDetails: '/calendar/patient/viewPatientDetails',
  patientDetailsEdit: '/calendar/patient/detailsEdit',
  patientAppointmentCancel: '/calendar/patient/appointmentCancel',
  patientAppointmentReschedule: '/calendar/patient/patientAppointmentReschedule',
  appointmentPresentOnDate: 'calendar/patient/appointmentPresentOnDate',
  paymentOrder: '/calendar/payment/order',
  verification: '/calendar/payment/verification'
}
