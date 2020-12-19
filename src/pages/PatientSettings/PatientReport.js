import React, { useState } from 'react'
import { Avatar,Box, Dialog,Typography, DialogTitle } from '@material-ui/core'
import useStyle from './PatientReportStyle'
import CloseIcon from '@material-ui/icons/Close'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import pdfIcon  from  '../../assets/img/pdfIcon.svg'
import Image  from  '../../assets/img/image.svg'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function PatientReport({ open, handleClose }) {
    const classes = useStyle()
    const [array, setArray] = useState([])
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image .pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    array.push("image.pdf");
    array.push("moment.circle,enjoy.pdf");
    array.push("image1.jpg");
    array.push("true.png");
    
    return (
        <Box className={classes.holesize}>
            <Dialog open={open} className={classes.boxsize}>
                
            <DialogTitle className={classes.header}>
            <Box display="flex">
                <Box>
              <Typography className={classes.title} variant="h5">
                Medical Report
              </Typography>
              </Box>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Box>
          </DialogTitle>
               
                
                <InfiniteScroll
                dataLength={array.length}
                 hasMore={true}
                 height={'100%'}
                 >
                <Box className={classes.root}>
               
                    <Box>
                      {
                        array.map((then) =>
                            (!then.endsWith("pdf")) ?
                                <Box className={classes.line}>
                                           
                                    <img className={classes.logoImg} src={Image} alt="picture" />
                                    <Box className={classes.filename}>{then}</Box>
                                             
                                </Box>
                                :
                                <Box className={classes.line}>
                                            
                                    <img className={classes.logoImg} src={pdfIcon} alt="pdf" />
                                    <Box className={classes.filename}>{then}</Box>
                                </Box>
                            )

                      }
                        
                    </Box>    
                </Box>
                
                </InfiniteScroll>
                <Box className={classes.bordersize}/>
            </Dialog>
        </Box>


    )
}
export default PatientReport;