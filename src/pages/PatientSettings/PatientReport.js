import React, { useState } from 'react'
import { Avatar,Box, Dialog,Typography, DialogTitle, TextareaAutosize,Button } from '@material-ui/core'
import useStyle from './PatientReportStyle'
import CloseIcon from '@material-ui/icons/Close'

import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import pdfIcon  from  '../../assets/img/pdfIcon.svg'
import Image  from  '../../assets/img/image.svg'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

function PatientReport({ open, handleClose }) {
    const classes = useStyle()
    const [file, setFile] = useState([])
  
    const mystyle = {
        visibility: "hidden"
      };
    

    function handlechange(e) {
      if (e.target.files)   {
        const item = e.target.files;
        const files = [...file, ...item]
        setFile(files)
      }

      }
    
    return (
        <Box className={classes.holesize}>
            <Dialog open={open} className={classes.boxsize}>
                
            <DialogTitle className={classes.header}>
            <Box display="flex">
                <Box>
              <Typography className={classes.title} variant="h5">
                Add Report
              </Typography>
              </Box>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Box>
          </DialogTitle>
               
          <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />
          <div>
             <div>
              <label for="files" name="files"  >
                <AddCircleOutlineTwoToneIcon  color="disabled" size="large" />
              </label>
              <input
                type="file"
                name="files"
                onChange={handlechange}
                id="files"
                accept=".jpg,.svg,.png, .pdf"
                style={mystyle}
              />
          </div>
          <div>
            <Button>save</Button>
          </div>
          </div>
                
                {/* <InfiniteScroll
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
                
                </InfiniteScroll> */}
                <Box className={classes.bordersize}/>
            </Dialog>
        </Box>


    )
}
export default PatientReport;