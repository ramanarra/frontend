import DoctorPersonalSetting from '../../pages/DoctorPersonalSetting'
import CancellationResheduleOptions from '../../pages/CancellationResheduleOptions'
import Questionnaire from '../../pages/Questionnaire'
import WorkSchedules from '../../pages/WorkSchedules'

const routes = [
  {
    path: '/doctors/:id/personal-setting',
    component: DoctorPersonalSetting,
    name: 'personal-setting',
  },
  {
    path: '/doctors/:id/cancellation-reshedule',
    component: CancellationResheduleOptions,
    name: 'cancellation-reshedule',
  },
  {
    path: '/doctors/:id/questionnaire',
    component: Questionnaire,
    name: 'questionnaire',
  },
  {
    path: '/doctors/:id/work-schedules',
    component: WorkSchedules,
    name: 'work-schedules',
  },
]

export default routes
