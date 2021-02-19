import clsx from 'clsx'
import React from 'react'
import AppointmentReportMsg from './AppointmentReportMsg'
import PrescriptionMsg from './PrescriptionMsg'

const SpecialMessage = React.forwardRef((props, ref) => {
  const { type, from } = props?.text
  const name =
    from === 'user'
      ? 'You'
      : props.userRole === 'DOCTOR'
      ? props.patientName
      : props.doctorName

  const renderElement = () => {
    switch (type) {
      case 'spl_prescription':
        return <PrescriptionMsg {...props} />
      
      case 'spl_appointment_report': return <AppointmentReportMsg {...props}/>

      default:
        return <></>
    }
  }

  return (
    <div
      className={clsx('special-msg-wrap', from === 'user' ? 'is-user' : 'is-sender')}
      ref={props.isLast ? ref : undefined}
    >
      <div className="chat-name">{name}</div>
      <div
        className={clsx('chat-message', from === 'user' ? 'is-user' : 'is-sender')}
      >
        {renderElement()}
      </div>
    </div>
  )
})

export default SpecialMessage
