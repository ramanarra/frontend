import axios from 'axios'
import { baseURL } from './baseURL'

export default axios.create({
  baseURL: `${baseURL}${'/api/'}`,
})

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
}

export const URL = {
  doctorLogin: 'auth/doctorLogin',
  doctorSignup: 'auth/doctorRegistration',
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
  patient: {
    list: '/calendar/admin/patients',
    info: '/calendar/doctor/detailsofpatient',
    upcomingApp: '/calendar/doctor/patientUpcomingAppList',
    pastApp: '/calendar/doctor/patientPastAppList',
    search: '/calendar/doctor/patientGeneralSearch',
    listForDoctor: '/calendar/doctor/patientList',
    report: '/calendar/doctor/patientDetailLabReport',
  },
  prescriptionAdd: '/calendar/doctor/prescription/add',
  appointmentSlotsView: '/calendar/doctor/appointmentSlotsView',
  appointmentView: '/calendar/appointmentView',
  appointmentCancel: '/calendar/doctor/appointmentCancel',
  availableSlot: '/calendar/doctor/availableSlots',
  appointmentReschedule: '/calendar/doctor/appointmentReschedule',
  patientSearch: '/calendar/doctor/patientSearch',
  createAppointment: '/calendar/doctor/createAppointment',
  createAppointmentAlongWIthRegisteringPatient:
    '/calendar/doctor/creatingAppointmetAlongWithRegisteringPatient',
  hospitalDetailsView: '/calendar/doctor/hospitaldetailsView',
  patientUpcomingAppointments: '/calendar/patient/upcomingAppointmentsList',
  patientPastAppointments: '/calendar/patient/pastAppointmentsList',
  patientDoctorList: '/calendar/patient/doctorList',
  findDoctorByCodeOrName: '/calendar/patient/findDoctorByCodeOrName',
  reportUploading: '/calendar/patient/reportUploading',
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
  verification: '/calendar/payment/verification',
  patientFileUpload: '/calendar/patient/report/upload',
  fileUpload: '/calendar/patient/fileupload',
  patientReportList: '/calendar/patient/report/list',
  doctorPersonalSettingEdit: '/calendar/doctor/personalSettingsEdit',
  patientForgotPassword: '/auth/patient/forgotPassword',
  adminForgotPassword: '/auth/doctor/forgotPassword',
  doctorForgotPassword: '/auth/admin/forgotPassword',
  patientLoginForPhone: '/auth/patient/login',
  otpVerification: '/auth/OTPVerification',
  doctorSignatureUpload: '/calendar/dotor/signature/upload',
  docReport: {
    list: '/calendar/doctor/appoinmentListReport',
    collection: '/calendar/doctor/amountListReport',
  },
}
