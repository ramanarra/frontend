import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { connect } from 'react-redux'

import { setOpenSideBar } from '../../actions/doctor'
import usestyle from './useMedicineListStyle'

function MedicineList({ onClose, setOpenTopBar, setOpenSideBar }) {
  const classes = usestyle()

  function handleOnClose() {
    onClose()
    setOpenTopBar(false)
    setOpenSideBar(false)
  }

  return (
    <Box>
      <Box className={classes.backButton}>
        <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
      </Box>
      <Box className={classes.container}></Box>
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

export default connect(null, mapDispatchToProps)(MedicineList)
