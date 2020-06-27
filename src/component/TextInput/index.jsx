import React, { Fragment } from 'react'
import { Input } from 'antd'

import './input.scss'

function TextInput(props) {
  return (
    <Fragment>
      <p className="label">
        <span>{props.label}</span>
      </p>
      <Input className="input-elemet" {...props} />
    </Fragment>
  )
}

export default TextInput
