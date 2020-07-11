import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import EditAvailability from './EditAvailability'

const Schedules = (props) => {
  const [dialog, setDialog] = useState({
    status: false,
    data: null,
  })
  const week_days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thusday',
    'friday',
    'saturday',
  ]

  const handleDialog = (status, data) => {
    setDialog({
      status,
      data,
    })
  }

  return (
    <div className="schedule-calender-wrap">
      <Typography variant="h1" className="main-title">
        Work Schedules
      </Typography>
      <table className="table">
        <thead>
          <tr>
            {week_days.map((i) => (
              <th className="table-head">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {week_days.map((i) => (
              <td
                className="table-cell"
                onClick={handleDialog.bind(this, true, props.data && props.data[i])}
              >
                <div className="appointments">
                  {props.data &&
                    props.data[i]?.map((s) => (
                      <div className="slot-wrap">
                        <span className="slot">{`${s?.startTime} - ${s?.endTime}`}</span>
                      </div>
                    ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <EditAvailability
        open={dialog.status}
        data={dialog.data}
        onClose={handleDialog.bind(this, false, null)}
      />
    </div>
  )
}

export default Schedules
