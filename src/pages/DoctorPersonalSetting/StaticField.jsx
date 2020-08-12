import React from 'react'
import { Box, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  notchedOutline: {
    '& input': {
      backgroundColor: '#f7f7f7',
      color: '#777777',
      height: 10,
    },
    '& fieldset': {
      paddingLeft: 10,
      height: 25,
      color: '#777777',
      border: 'none',
    },
    width: 310,
    color: '#777777',
    paddingBottom: 14,
  },
  text: {
    fontSize: 13.3,
    paddingBottom: 6,
    color: '#4e4e4e'
  },

  right: {
    paddingLeft: 20,
  }
}))

function Static({ doctorDetails }) {
  const classes = useStyles()

  localStorage.setItem('doctorName', doctorDetails?.doctorName)

  return (
    <Box display="flex">
      <Box>
        <Typography className={classes.text}>First Name</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.firstName}
          disabled
        />
        <Typography className={classes.text}>Registration Number</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.registrationNumber}
          disabled
        />
        <Typography className={classes.text}>Qualification</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.qualification}
          disabled
        />
        <Typography className={classes.text}>Contact Number</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.number}
          disabled
        />
      </Box>
      <Box className={classes.right}>
        <Typography className={classes.text}>Last Name</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.lastName}
          disabled
        />
        <Typography className={classes.text}>Specialization</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.speciality}
          disabled
        />
        <Typography className={classes.text}>Years of Experience</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.experience}
          disabled
        />
        <Typography className={classes.text}>Email ID</Typography>
        <TextField
          className={classes.notchedOutline}
          variant="outlined"
          value={doctorDetails?.email}
          disabled
        />
      </Box>
    </Box>
  )
}

export default Static
