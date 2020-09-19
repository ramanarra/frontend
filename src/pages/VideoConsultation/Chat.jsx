import React from 'react'
import { connect } from 'react-redux'
import { Box, TextField } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import sentIcon from '../../assets/img/sent-icon.svg'
import {setOpenSideBar} from '../../actions/doctor'
import usestyle from './useChatStyle'

function chat({ onClose, setOpenTopBar, setOpenSideBar }) {
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
      <Box className={classes.container}>
        <Box className={classes.messageBox}>
          <TextField
            className={classes.text}
            placeholder="send message"
            InputProps={{
              endAdornment: (
                <img src={sentIcon} position="end" className={classes.sentIcon} />
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

export default connect(null, mapDispatchToProps)(chat)
