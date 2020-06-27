import React, { Fragment } from 'react'
import { Tooltip } from 'antd'
import { MdEdit } from 'react-icons/md'
import { GoCheck, GoX } from 'react-icons/go'

import './style.scss'

const EditSave = ({
  isEdit,
  handleOnEdit,
  handleOnSave,
  handleOnCancel,
  tooltipText,
}) => {
  return (
    <span className="ctrl-btn">
      {isEdit ? (
        <Fragment>
          <GoX onClick={handleOnCancel} />
          <Tooltip placement="topLeft" title={tooltipText}>
            <span style={{ paddingLeft: 10 }}>
              <GoCheck onClick={handleOnSave} />
            </span>
          </Tooltip>
        </Fragment>
      ) : (
        <MdEdit onClick={handleOnEdit} />
      )}
    </span>
  )
}

export default EditSave
