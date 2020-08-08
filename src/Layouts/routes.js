import MyDoctors from '../pages/MyDoctors'
import Patients from '../pages/Patients'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import VideoConsultation from '../pages/VideoConsultation'
import DocBody from './DocBody'

import PatientAppoinments from '../pages/PatientAppoinments'
import PatientSettings from '../pages/PatientSettings'
import PatientDetials from '../pages/Patients/PatientDetials'

export const PatientRoutes = [
  {
    path: '/patient/appoinments',
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
import PatientFindDoctor from '../pages/PatientFindDoctor'
import PatientBookAppointment from '../pages/PatientBookAppointment'

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
      path: '/patient/find-doctor',
      name: 'PatientFindDoctor',
      exact: true,
      component: PatientFindDoctor,
    },
    {
      path: '/patient/:id/book-appointment',
      name: 'PatientBookAppointment',
      exact: true,
      component: PatientBookAppointment
    }
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
    path: '/reports',
    name: 'Reports',
    exact: true,
    component: Reports,
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
