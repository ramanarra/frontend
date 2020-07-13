import React from 'react'
import { Dialog, IconButton, Typography, TextField, Button } from '@material-ui/core'
import { Close, DeleteOutline } from '@material-ui/icons'

const EditAvailability = ({ open, onClose, data }) => {
  const slot = (data) => (
    <div className="slot">
      <TextField
        className="txt-field start-time"
        variant="outlined"
        size="small"
        value={data?.startTime}
      />
      -
      <TextField
        className="txt-field end-time"
        variant="outlined"
        size="small"
        value={data?.endTime}
      />
      <IconButton className="del-btn">
        <DeleteOutline fontSize="small" />
      </IconButton>
    </div>
  )

  return (
    <div className="slot-dialog-wrap">
      <Dialog open={open} onClose={onClose} className="slot-dialog">
        <div className="title-wrap">
          <Typography variant="h1" className="popup-title">
            Edit Availability
          </Typography>
          <div className="close-btn-wrap">
            <IconButton onClick={onClose} className="close-btn">
              <Close />
            </IconButton>
          </div>
        </div>
        <div className="slots-wrap">{data?.map((i) => slot(i))}</div>
        <div className="list-btns">
          <div className="btn-wrap">
            <span className="add-time">+ New Interval</span>
          </div>
          <div className="btn-wrap">
            <span className="make-unavailable">I'm unavailable</span>
          </div>
        </div>
        <div className="ctrl-btns">
          <Button className="apply-btn">Apply</Button>
          <Button className="cancel-btn">Cancel</Button>
        </div>
      </Dialog>
    </div>
  )
}

export default EditAvailability
