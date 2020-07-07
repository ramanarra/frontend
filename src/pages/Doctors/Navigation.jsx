import React from 'react'
import { Grid, AppBar, Tabs, Tab, IconButton, TextField } from '@material-ui/core'

const Navigation = (props) => {
  return (
    <div>
      <Grid container className="doctor-dash-nav-wrap" justify="space-between">
        <Grid item xs={6}>
          <AppBar position="sticky">
            <Tabs>
              <Tab label="My Doctor" />
              <Tab label="Appointment" />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid item xs={6}>
          <TextField />
          <IconButton>
            <img src={require('../../assets/img/icons/view.svg')} alt="View" />
          </IconButton>
          <IconButton>
            <img src={require('../../assets/img/icons/filter.svg')} alt="Filter" />
          </IconButton>
          <IconButton>
            <img src={require('../../assets/img/icons/dot-menu.svg')} alt="Menu" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navigation
