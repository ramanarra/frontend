import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import { Edit, Done, Close } from '@material-ui/icons'
import './style.scss'

const EditField = ({ value, name, type, onChange, onSave }) => {
  const [isEdit, setEdit] = useState(false)
  const [newValue, setNewValue] = useState(value)

  useEffect(() => {
    setNewValue(value)
  }, [value])

  const handleSave = () => {
    onSave({
      target: {
        value: newValue,
        name,
      },
    })
    setEdit(false)
  }

  const handleCancel = () => {
    if (isEdit) {
      setNewValue(value)
    }
    setEdit((prev) => !prev)
  }

  const handleChange = (e) => setNewValue(e.target.value)

  const inputProps = {
    name: name,
    value: newValue,
    onChange: onChange || handleChange,
    disabled: !isEdit,
  }

  return (
    <div className="edit-field-wrap">
      {type === 'textarea' ? (
        <textarea className="edit-field-area" {...inputProps} />
      ) : (
        <input className="edit-field" type={type || 'text'} {...inputProps} />
      )}
      <IconButton
        className={'edit-toggle-btn' + (type === 'textarea' ? ' is-textarea' : '')}
        onClick={handleCancel}
      >
        {isEdit ? <Close fontSize="small" /> : <Edit fontSize="small" />}
      </IconButton>
      {isEdit && (
        <IconButton className="save-btn" onClick={handleSave}>
          <Done fontSize="small" />
        </IconButton>
      )}
    </div>
  )
}

export default EditField
