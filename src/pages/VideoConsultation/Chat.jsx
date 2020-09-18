import React from 'react'
import { Box, makeStyles, TextField } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import sentIcon from '../../assets/img/sent-icon.svg'

const usestyle = makeStyles(() => ({
  container: {
    position: 'absolute',
    right: 0,
    margin: 0,
    top: 56,
    backgroundColor: '#ffffff',
    width: '23%',
    padding: '25px 15px 10px 23px',
    height: 'calc(100% - 63px)',
    overflowY: 'auto',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'absolute',
    top: 58,
    right: 348,
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  icon: {
    marginTop: 7.5,
    marginLeft: 8,
    color: '#a8a8a8',
  },
  messageBox: {
    position: 'absolute',
    bottom: 20,
  },
  text: {
    width: 300,
    height: 30,
  },
  sentIcon: {
    width: 15,
    cursor: 'pointer',
    marginRight: 2,
    marginTop: 5,
  },
}))

function chat({ onClose, setOpenTopBar }) {
  const classes = usestyle()

  function handleOnClose() {
    onClose()
    setOpenTopBar(false)
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

export default chat
