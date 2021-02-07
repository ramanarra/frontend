import React from 'react'
import { Paper } from '@material-ui/core'
import './style.scss'
import moment from 'moment'
import { timeFmt } from '../../../../components/commonFormat'

const AppointmentCard = ({ data, index, isPast }) => {
  const timing = `${timeFmt(data?.startTime)} - ${timeFmt(data?.endTime)}`
  const day = moment(data?.appointmentDate, 'YYYY-MM-DD').format('DD')
  const month = moment(data?.appointmentDate, 'YYYY-MM-DD').format('MMM')
  const doctorName = `${data?.doctorFirstName} ${data?.doctorLastName}`
  const hospital = data?.hospitalName

  const consultTime = () => {
    const stime = data?.startTime?.split(':')
    return new Date(0, 0, 0, stime[0], stime[1] - data?.preConsultationTime, 0, 0)
  }

  const preConsult = !isPast
    ? `Preconsultation starts at ${timeFmt(
        consultTime()
      )}, Doctor consultation at ${timeFmt(data?.startTime)}`
    : null
  const colorCode =
    parseInt(index + 1) % 2 === 0
      ? (index + 1) % 4 === 0
        ? 4
        : 2
      : (index + 2) % 4 === 0
      ? 3
      : 1
  const classes = {
    type: isPast ? 'past-card' : 'upcomming-card',
    color: ` color-${colorCode}`,
  }

  return (
    <Paper
      className={'appointment-card ' + classes.type + classes.color}
      elevation={3}
    >
      <div className="appointment-card-timing">{timing}</div>
      <div className="appointment-card-details">
        <div className="appointment-date">
          <div className="date-day">{day}</div>
          <div className="date-month">{month}</div>
        </div>
        <div className="appointment-info">
          <div className="info-doc-name info-field">{doctorName}</div>
          <div className="info-hospital info-field">{hospital}</div>
          {!isPast && (
            <div className="info-consult info-field">
              {/* <span className="info-icon">
                <AiOutlineInfoCircle />
              </span> */}
              <span className="info-content">{preConsult}</span>
            </div>
          )}
        </div>
      </div>
    </Paper>
  )
}

export default AppointmentCard
