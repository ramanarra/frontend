import React from 'react'
import { Dialog, IconButton, Typography, TextField, Button } from '@material-ui/core'
import { Close, Delete } from '@material-ui/icons'

const EditAvailability = ({ open, onClose, data }) => {
  const slot = (data) => (
    <div className="slot">
      <TextField variant="outlined" size="small" value={data?.startTime} />
      -
      <TextField variant="outlined" size="small" value={data?.endTime} />
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  )

  return (
    <div className="slot-dialog">
      <Dialog open={open} onClose={onClose}>
        <div className="closebtn">
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <Typography variant="h1" className="popup-title">
          Edit Availability
        </Typography>
        <div className="slots-wrap">{data?.map((i) => slot(i))}</div>
        <div className="list-btns">
          <span className="add-time">+ New Interval</span>
          <span className="make-unavailable">I'm unavailable</span>
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
