import React from 'react'
import { Box, makeStyles, TextField } from '@material-ui/core'

import sentIcon from '../../assets/img/sent-icon.svg'

const usestyle = makeStyles(() => ({
    container: {
        position: 'absolute',
        right: 0,
        margin: 0,
        top: 56,
        backgroundColor: '#ffffff',
        width: 355,
        padding: '25px 15px 10px 23px',
        height: 'calc(100% - 63px)',
        overflowY: 'auto',
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
      }
}))

function chat() {

    const classes = usestyle()

    return (
        <Box className={classes.container}>
            <Box className={classes.messageBox}>
                <TextField className={classes.text}
                placeholder="send message"
                InputProps={{
                    endAdornment: <img src={sentIcon} position="end" className={classes.sentIcon}  />
                  }}
                 />
            </Box>
        </Box>
    )
}

export default chat