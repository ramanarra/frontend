
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
    name: 'Doctors',
    component: Patients,
  },
  {
    path: '/reports',
    name: 'Doctors',
    component: Reports,
  },
  {
    path: '/settings',
    name: 'Doctors',
    component: Settings,
  },
]

export default routes
