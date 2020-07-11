import axios from 'axios'

export default axios.create({
  baseURL: 'http://13.232.206.31:8081/api',
})

export const URL = {
  doctorList: `/calendar/doctorList`,
  workScheduleView: '/calendar/workScheduleView'
}
