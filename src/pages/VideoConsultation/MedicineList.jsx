import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

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
}))

function MedicineList() {

    const classes = usestyle()

    return (
        <Box className={classes.container}>

        </Box>
    )
}

export default MedicineList