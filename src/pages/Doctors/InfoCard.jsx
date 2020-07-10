import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const InfoCard = ({ data, ...rest }) => {
  return (
    <Grid container className="info-card">
      <Grid item xs={12} className="name-wrap">
        <div>
          <div>
            <img src={data.photo} alt={data.doctorName} />
          </div>
          <div>
            <Typography component="h1">{data.doctorName}</Typography>
            <Typography component="subtitle1">{data.speciality}</Typography>
          </div>
        </div>
        <div>
          <div>
            <Typography component="h4">Fees</Typography>
            <Typography component="h3">{data.fees}</Typography>
          </div>
          <div>
            <Typography component="h4">Today Available Slot</Typography>
            <div>
              {data.todaysAppointment?.length > 0 &&
                data.todaysAppointment.map((i, index) => (
                  <span key={index}>{i}</span>
                ))}
            </div>
          </div>
          <div>
            <Typography component="h4">Today Available Slot</Typography>
            <Typography component="h3">{data.todaysAvailabilitySeats}</Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default InfoCard
