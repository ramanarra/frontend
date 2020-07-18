import moment from 'moment'

export const customSuffix = (value, format) => {
  const pattern = ('' + value).replace(/[^\d]/g, '')
  if (pattern.length > 0) {
    return pattern.replace(/(\d{1,})/, '$1 ' + format)
  }
  return value
}

export const timeFmt = (time) => {
  return moment(time, 'hh:mm').format('hh:mm')
}
