import React from 'react'
import { Grid } from '@material-ui/core'
import useCustomFetch from '../../hooks/useCustomFetch'
import { URL } from '../../api'
import InfoCard from './InfoCard'
import Navigation from './Navigation'

const Doctors = () => {
  const key = localStorage.getItem('docKey')
  const [data] = useCustomFetch('GET', URL.doctorList, { key })

  return (
    <Grid container>
      <Grid item md={11}>
        <Grid container>
          <Grid item xs={12}>
            <Navigation />
          </Grid>
          <Grid item xs={12}>
            {data?.doctorList?.map((i) => (
              <InfoCard key={i.doctor_id} data={i} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Doctors
