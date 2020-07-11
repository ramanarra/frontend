import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import { Edit, Done, Close } from '@material-ui/icons'

const EditField = ({ value, onChange }) => {
  const [isEdit, setEdit] = useState(false)
  return (
    <div className="edit-field-wrap">
      <input
        type="text"
        className="edit-field"
        value={value}
        onChange={onChange}
        disabled={!isEdit}
      />
      <IconButton
        className="edit-toggle-btn"
        onClick={setEdit.bind(this, (prev) => !prev)}
      >
        {isEdit ? <Done fontSize="small" /> : <Edit fontSize="small" />}
      </IconButton>
      {isEdit && (
        <IconButton
          className="cncl-edit-btn"
          onClick={setEdit.bind(this, (prev) => !prev)}
        >
          <Close fontSize="small" />
        </IconButton>
      )}
    </div>
  )
}

export default EditField
