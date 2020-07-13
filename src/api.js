import axios from 'axios'

export default axios.create({
  baseURL: 'http://13.232.206.31:8081/api',
})

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
}

export const URL = {
  doctorLogin: 'auth/doctorLogin',
  doctorList: `/calendar/doctor/list?key=$`,
  workScheduleView: '/calendar/workScheduleView'
}
