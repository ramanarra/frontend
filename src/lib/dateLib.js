import moment from 'moment'

function getTimeFormatWithNoon(date) {
  return moment(date, ['h:mm A']).format('h:mm A')
}

export function getTimeFormat(date) {
  return moment(date, ['h:mm A']).format('h:mm')
}

export default getTimeFormatWithNoon
