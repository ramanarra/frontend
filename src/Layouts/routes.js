import MyDoctors from '../pages/MyDoctors'
import Patients from '../pages/Patients'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import DocBody from './DocBody'

import PatientAppoinments from '../pages/PatientAppoinments'
import PatientSettings from '../pages/PatientSettings'

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
]

export default DoctorRoutes
