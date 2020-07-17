import Doctors from '../pages/Doctors'
import Patients from '../pages/Patients'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import VideoConsultation from '../pages/VideoConsultation'
import DocBody from './DocBody'

const routes = [
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

export default routes
