import React from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'

export const customSuffix = (value, format) => {
  const pattern = ('' + value).replace(/[^\d]/g, '')
  if (pattern.length > 0) {
    return pattern.replace(/(\d{1,})/, '$1 ' + format)
  }
  return value
}

export const timeFmt = (time) => {
  return moment(time, 'hh:mmA').format('hh:mmA')
}

export const dateFmt = (date) => {
  return !!date ? moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY') : ''
}

export const dateFmtWthOutTimeZone = (date) => {
  let formattedDate = date ? moment(date).format('DD-MM-YYYY') : '-'
  formattedDate = formattedDate === 'Invalid date' ? '-' : formattedDate
  return formattedDate
}

export const minsSuffix = (details) => {
  const { inputRef, onChange, ...other } = details

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: details.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      suffix=" mins."
    />
  )
}

export const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
