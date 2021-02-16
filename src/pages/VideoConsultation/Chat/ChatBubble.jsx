import React from 'react'
import clsx from 'clsx'
import Linkify from '../../../components/Linkify'

const ChatBubble = React.forwardRef(
  ({ text, doctorName, patientName, userRole, isLast }, ref) => {
    const { from, message } = text
    const name =
      from === 'user' ? 'You' : userRole === 'DOCTOR' ? patientName : doctorName

    return (
      <div
        className={clsx(
          'chat-bubble-wrap',
          from === 'user' ? 'is-user' : 'is-sender'
        )}
        ref={isLast ? ref : undefined}
      >
        <div className="chat-name">{name}</div>
        <div
          className={clsx('chat-message', from === 'user' ? 'is-user' : 'is-sender')}
        >
          <Linkify color={from === 'user' ? '#4e4e4e' : '#fff'} noUnderline isBold>
            {message}
          </Linkify>
        </div>
      </div>
    )
  }
)

export default ChatBubble
