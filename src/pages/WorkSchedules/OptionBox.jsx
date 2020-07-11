import React from 'react'

const OptionBox = ({ value, onClick, className }) => {
  return (
    <div
      className={'option-box' + (className ? ` ${className}` : '')}
      onClick={onClick}
    >
      {value}
    </div>
  )
}

export default OptionBox
