import List from './../../pages/DocReports/List'
import Collection from './../../pages/DocReports/Collection'
import EmptySlots from './../../pages/DocReports/EmptySlots'

const routes = [
  {
    path: '/reports/list',
    component: List,
  },
  {
    path: '/reports/collection',
    component: Collection,
  },
  {
    path: '/reports/emptyslots',
    component: EmptySlots,
  },
]

export default routes
