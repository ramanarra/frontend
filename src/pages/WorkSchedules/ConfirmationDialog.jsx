import React from "react"
import { Box, Dialog, DialogTitle, DialogContent, Typography, makeStyles } from "@material-ui/core"


const useStyle = makeStyles(() => ({

    titleText: {
        color: '#676565',
        fontSize: 25,
    },

    content: {
        width:  340,
    },

    confimationText: {
        color: '#898989',
        fontSize: 18,
    },

    note: {
        paddingTop: 13,
    },

    noteHeader: {
        color: '#e41919'
    },

    noteText: {
        paddingLeft: 10,
        color: '#776d6d',
    },

    button: {
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: 25,
        paddingBottom: 20,
    },

    cancelBtn: {
        backgroundColor: '#f4f2f2',
        borderRadius: 27,
        padding: '8px 30px',
        cursor:'pointer',
    },

    submitBtn: {
        backgroundColor: '#0bb5ff',
        borderRadius: 27,
        padding: '8px 30px',
        marginLeft: 15,
        cursor: 'pointer',
    },

    cancleText:{   
        color: '#a8a8a8',
    },

    submitText: {
        color: '#f7f7f7',
    },

}))

function ConfirmationDialog({open, onClose, handleChange, value}) {

    const classes = useStyle()


    function handleClose (event) {
        onClose(event)
    }

    function handleOnClick (event) {
        onClose(event)
        handleChange(value)
    }
    return (
        <Box>   
            <Dialog open={open}>
                <DialogTitle>
                    <Typography className={classes.titleText}>Confimation</Typography>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Box>
                        <Typography className={classes.confimationText}>Are you sure want to change your consultation session timing?</Typography>
                    </Box>
                    <Box display="flex" className={classes.note}>
                        <Typography className={classes.noteHeader}>Note:</Typography>
                        <Typography className={classes.noteText}>This session time change may affect the slot timings</Typography>
                    </Box>
                    <Box className={classes.button}>
                        <Box onClick={handleClose} className={classes.cancelBtn}>
                            <Typography className={classes.cancleText}>NO</Typography>
                        </Box>
                        <Box onClick={handleOnClick} className={classes.submitBtn}>
                            <Typography className={classes.submitText}>YES</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default ConfirmationDialog