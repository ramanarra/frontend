import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import EditAvailability from './EditAvailability'
import { timeFmt } from '../../components/commonFormat'

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
              <th key={i} className="table-head">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {week_days.map((i) => (
              <td
                key={i}
                className="table-cell"
                onClick={handleDialog.bind(this, true, props.data && props.data[i])}
              >
                <div className="appointments">
                  {props.data &&
                    props.data[i]?.map((s, index) => (
                      <div
                        key={index}
                        className={
                          'slot-wrap' +
                          (index === props.data?.length - 1 ? ' last-slot' : '')
                        }
                      >
                        {s?.startTime && (
                          <span className="slot">{`${timeFmt(
                            s.startTime
                          )} - ${timeFmt(s?.endTime)}`}</span>
                        )}
                      </div>
                    ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {dialog?.status && (
        <EditAvailability
          data={dialog.data}
          onClose={handleDialog.bind(this, false, null)}
          handleUpdate={props.handleUpdate}
        />
      )}
    </div>
  )
}

export default Schedules
