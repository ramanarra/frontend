
import Doctors from '../pages/Doctors'
import Patients from '../pages/Patients'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'

const routes = [
  {
    path:  '/doctors',
    name: 'Doctors',
    component: Doctors,
  },
  {
    path: ['/patients'],
    name: 'Patients',
    component: Patients,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
]

export default routes
