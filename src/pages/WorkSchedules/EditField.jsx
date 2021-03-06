import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import { Edit, Done, Close } from '@material-ui/icons'

const EditField = ({ value, type, name, onChange, onSave, error }) => {
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

  const handleKey = (e) => {
    if (e.keyCode === 13) {
      handleSave()
    }
  }

  const handleChange = (e) => setNewValue(e.target.value)

  return (
    <div className="edit-field-wrap">
      <input
        type={type || 'text'}
        className="edit-field"
        name={name}
        value={newValue}
        onChange={onChange || handleChange}
        disabled={!isEdit}
        onKeyDown={handleKey}
      />
      <IconButton className="edit-toggle-btn" onClick={handleCancel}>
        {isEdit ? <Close fontSize="small" /> : <Edit fontSize="small" />}
      </IconButton>
      {isEdit && (
        <IconButton className="save-btn" onClick={handleSave}>
          <Done fontSize="small" />
        </IconButton>
      )}
      {!!error && <div className="err-msg">{error}</div>}
    </div>
  )
}

export default EditField
