import MyDoctors from '../pages/MyDoctors'
import Patients from '../pages/Patients'
import Settings from '../pages/Settings'
import VideoConsultation from '../pages/VideoConsultation'
import DocBody from './DocBody'
import DocReport from './DocReport'

import PatientAppoinments from '../pages/PatientAppoinments'
import PatientSettings from '../pages/PatientSettings'
import PatientReports from '../pages/PatientReports'
import PatientDetials from '../pages/Patients/PatientDetials'
import PatientFindDoctor from '../pages/PatientFindDoctor'
import PatientBookAppointment from '../pages/PatientBookAppointment'
import AppointmentDetails from '../pages/AppointmentDetails'

export const PatientRoutes = [
  {
    path: ['/patient/appointments/upcoming', '/patient/appointments/past'],
    name: 'patientAppoinments',
    exact: true,
    component: PatientAppoinments,
  },
  {
    path: '/patient/setting',
    name: 'PatientSetting',
    exact: true,
    component: PatientSettings,
  },
  {
    path: '/patient/reports',
    name: 'PatientSetting',
    exact: true,
    component: PatientReports,
  },
  {
    path: '/patient/find-doctor',
    name: 'PatientFindDoctor',
    exact: true,
    component: PatientFindDoctor,
  },
  {
    path: '/patient/:id/book-appointment',
    name: 'PatientBookAppointment',
    exact: true,
    component: PatientBookAppointment,
  },
  {
    path: '/patient/appoints/upcoming/appointmentDetail',
    name: 'AppointmentDetails',
    exact: true,
    component: AppointmentDetails,
  },
]

const DoctorRoutes = [
  {
    path: ['/doctors', '/appointments', '/appointments/:id'],
    name: 'Doctors',
    exact: true,
    component: MyDoctors,
  },
  {
    path: '/patients',
    name: 'Patients',
    exact: true,
    component: Patients,
  },

  {
    path: '/patients/:patientId',
    component: PatientDetials,
  },

  {
    path: '/reports/:pathType',
    name: 'Reports',
    exact: true,
    component: DocReport,
  },
  {
    path: '/settings',
    name: 'Settings',
    exact: true,
    component: Settings,
  },

  {
    path: '/doctors/:id',
    name: 'doctorDetails',
    component: DocBody,
  },

  {
    path: '/video-consultation',
    name: 'videoConsultation',
    component: VideoConsultation,
  },
]

export default DoctorRoutes
