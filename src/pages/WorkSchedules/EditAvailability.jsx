import React, { useState, useEffect } from 'react'
import { Dialog, IconButton, Typography, TextField, Button } from '@material-ui/core'
import { Close, DeleteOutline } from '@material-ui/icons'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

const EditAvailability = ({ open, onClose, data, handleUpdate }) => {
  const [slotList, setSlotList] = useState([])
  const [tempId, setTempId] = useState(1)
  const scheduledayid = data && data[0]?.scheduledayid

  useEffect(() => {
    data && data?.length > 0 && setSlotList(data)
  }, [data])

  const handleAdd = () => {
    setSlotList([
      ...slotList,
      {
        tempId,
        scheduledayid,
        startTime: new Date(),
        endTime: new Date(),
      },
    ])
    setTempId((prev) => prev + 1)
  }

  const handleChange = (data, e) => {
    const { scheduletimeid: id, tempId } = data
    const { name, value } = e.target
    setSlotList((prev) => {
      return prev?.map((i) => {
        if ((!!id && i.scheduletimeid === id) || (!!tempId && i.tempId === tempId)) {
          return { ...i, [name]: value }
        }
        return i
      })
    })
  }

  const handleApply = () => {
    handleUpdate({
      updateWorkSchedule: slotList,
    })
    onClose()
  }

  const handleDelete = (data) => {
    if (!!data.tempId) {
      setSlotList((prev) => {
        return prev?.filter((i) => i.tempId !== data.tempId)
      })
    } else {
      handleChange(data, {
        target: {
          name: 'isDelete',
          value: true,
        },
      })
    }
  }

  const slot = (data) => (
    <div className="slot">
      {/* <TextField
        className="txt-field start-time"
        name="startTime"
        variant="outlined"
        size="small"
        value={data?.startTime}
        type="time"
        onChange={(e) => handleChange(data, e)}
      /> */}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TimePicker
          autoOk
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          size="small"
          className="txt-field start-time"
          value={moment(data?.startTime, 'hh:mm')}
          onChange={(e) =>
            handleChange(data, {
              target: {
                name: 'startTime',
                value: e,
              },
            })
          }
          format="hh:mm"
        />
        -
        <TimePicker
          autoOk
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          size="small"
          className="txt-field end-time"
          value={moment(data?.endTime, 'hh:mm')}
          onChange={(e) =>
            handleChange(data, {
              target: {
                name: 'endTime',
                value: e,
              },
            })
          }
          format="hh:mm"
        />
      </MuiPickersUtilsProvider>
      <IconButton className="del-btn" onClick={handleDelete.bind(this, data)}>
        <DeleteOutline fontSize="small" />
      </IconButton>
    </div>
  )

  return (
    <div className="slot-dialog-wrap">
      <Dialog open={true} onClose={onClose} className="slot-dialog">
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
        <div className="slots-wrap">
          {slotList?.filter((f) => !f.isDelete).map((i) => i?.startTime && slot(i))}
        </div>
        <div className="list-btns">
          <div className="btn-wrap">
            <span className="add-time" onClick={handleAdd}>
              + New Interval
            </span>
          </div>
          <div className="btn-wrap">
            <span className="make-unavailable" onClick={setSlotList.bind(this, [])}>
              I'm unavailable
            </span>
          </div>
        </div>
        <div className="ctrl-btns">
          <Button className="apply-btn" onClick={handleApply}>
            Apply
          </Button>
          <Button className="cancel-btn" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default EditAvailability
