import React from 'react'

const OptionBox = ({ value, name, onClick, className }) => {
  const handleClick = () => {
    onClick({
      target: {
        value,
        name,
      },
    })
  }
  return (
    <div
      className={'option-box' + (className ? ` ${className}` : '')}
      onClick={handleClick}
    >
      {value}
    </div>
  )
}

export default OptionBox
