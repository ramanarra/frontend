import clsx from 'clsx'
import React from 'react'
import PrescriptionMsg from './PrescriptionMsg'

const SpecialMessage = (props) => {
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
      default:
        return <></>
    }
  }

  return (
    <div
      className={clsx('special-msg-wrap', from === 'user' ? 'is-user' : 'is-sender')}
    >
      <div className="chat-name"></div>
      <div
        className={clsx('chat-message', from === 'user' ? 'is-user' : 'is-sender')}
      >
        {renderElement()}
      </div>
    </div>
  )
}

export default SpecialMessage
