import React, { useState } from 'react'
import { Avatar,Box, Dialog,Typography, DialogTitle, TextareaAutosize,Button } from '@material-ui/core'
import useStyle from './PatientReportStyle'
import CloseIcon from '@material-ui/icons/Close'
import './style.scss'
import moment from 'moment'
import pdfIcon from '../../assets/img/pdfIcon.svg'

function PatientReport({ open, handleClose }) {
    const classes = useStyle()
    const [file, setFile] = useState([])
    const [report, setReport] = useState([]);
    const date = new Date();
    const array={
      title:"",
      reportDate:moment(date).format('DD/MM/YYYY'),
      comments:""
    }
   
    const mystyle = {
        visibility: "hidden"
      };

    const imgStyle = {
        height: "45px",
        width: "45px",
        "border-radius": "10px"
      };

      const fontStyle = {
        margin: "0px",
        "font-family": "sans-serif",
        "font-size": "x-small",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "45px",
        textDecoration: "none",
        whiteSpace: "nowrap"
    
      }
    
    

    function handlechange(e) {
        const item = e.target.files;
        const files = [...file, ...item]
        setFile(files)
        
        array.title=item[0].name;
        console.log(array)
      }

      function handleText(e){
        array.comments = e.target.value
        console.log(array)
      };
    

    function handleClick(e){
      setReport([...report, array])
      console.log(report);
    }

    var allfiles = file.map((eachfile) => {
      return <img src={eachfile} style={imgStyle} />
    })
    
    return (
        <Box className={classes.holesize}>
            <Dialog open={open} className={classes.boxsize}>
                
            <DialogTitle className={classes.header}>
            <Box display="flex">
                <Box>
              <Typography className={classes.title} variant="h5"  style={{fontSize:" 20px ",color: "#2abade"}}>
                Add Report
              </Typography>
              </Box>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Box>
          </DialogTitle>
               
          <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="Add comments"
           onChange={handleText}
           />
          <div >
            <div  className="left-partition">
                <label for="files" name="files" style={{fontSize:" 14px ",color: "#2abade"}} > + Select File </label> 
                <input
                  type="file"
                  name="files"
                  onChange={handlechange}
                  id="files"
                  accept=".jpg,.svg,.png, .pdf"
                  style={mystyle}
                />
            </div>
           <div style={{ display: "flex", lineHeight: "20px" }}>
            {file.map((value, index) => {
              const fileName = file[index].name;
              const filePath = value.url;

              const fileExtension = fileName.split('.').pop();
              if (fileExtension === "pdf" && index < 3) {
                return (
                  <div style={{ display: "grid", paddingLeft: "0px", marginRight: "20px" }}>
                    <img src={pdfIcon} alt='img1' style={imgStyle} />
                    <abbr style={fontStyle} title={fileName}>{fileName}</abbr>
                  </div>
                )
              }
              else if ((fileExtension === "svg" || fileExtension === "png") && index < 3) {
                return (
                  <div style={{ display: "grid", marginRight: "20px" }}>
                    <img src="https://sample-videos.com/img/Sample-jpg-image-50kb.jpg" alt='img' style={imgStyle} />
                    <abbr style={fontStyle} title={fileName}>{fileName} </abbr>
                  </div>
                )
              }
              else if (fileExtension === "jpg" && index < 3) {
                return (
                  <div style={{ display: "grid", marginRight: "20px" }}>
                    <img src="https://sample-videos.com/img/Sample-jpg-image-2mb.jpg" alt='img' style={imgStyle} />
                    <abbr style={fontStyle} title={fileName}  > {fileName} </abbr>
                  </div>
                )
              }

            })
            }
          </div>
          <div >
            <Button  variant="contained" style={{ borderRadius:"10px",background:"#2abade", float: "right"}}
            onClick={handleClick}
            >save</Button>
          </div>
          </div>
              
                <Box className={classes.bordersize}/>
            </Dialog>
        </Box>


    )
}
export default PatientReport;