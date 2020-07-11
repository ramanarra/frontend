import React from 'react'
import { Typography } from '@material-ui/core'

const Schedules = (props) => {
  const week_days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thusday',
    'friday',
    'saturday',
  ]
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
              <td className="table-cell" onClick={null}>
                <div className="appointments">
                  {/* {props.data?.schedule[i]?.map((s) => (
                    <div className="slot-wrap">
                      <span className="slot">{s}</span>
                    </div>
                  ))} */}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Schedules
