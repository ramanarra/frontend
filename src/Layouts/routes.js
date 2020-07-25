import Doctors from '../pages/Doctors'
import Patients from '../pages/Patients'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
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
]

const DoctorRoutes = [
  {
    path: '/doctors',
    name: 'Doctors',
    exact: true,
    component: Doctors,
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
]

export default DoctorRoutes
