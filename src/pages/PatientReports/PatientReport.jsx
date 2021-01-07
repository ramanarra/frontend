import React, { useState } from 'react'
import {Box, Dialog, Typography, DialogTitle, TextareaAutosize, Button } from '@material-ui/core'
import useStyle from './PatientReportStyle'
import CloseIcon from '@material-ui/icons/Close'
import './style.scss'
import moment from 'moment'
import pdfIcon from '../../assets/img/pdfIcon.svg'
import SnackBar from '../../components/SnackBar'
import useUpload from '../../hooks/useUpload'

function PatientReport({ open, setOpen, setItem, handleClose, setReportList, patientReportList,appointmentId,reportFile,setReportFile,setVal }) {
  const classes = useStyle()
  const [handleUpload] = useUpload()
  const [file, setFile] = useState([])
  const [opens, setOpens] = useState(false)
  const date = new Date();
  const formdata = new FormData();

  // const [handleReports] = useReports()
  const [report, setReport] = useState({
    title: "",
    reportDate: moment(date).format('YYYY-MM-DD'),
    comments: ""
  })


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

  const mainBox = {
    position: "relative",
    "overflow-y": "auto",
    padding: "20px",
    width: "600px"
  }
  const add = {
    fontSize: " 20px ",
    color: "#2abade",
    paddingLeft: "200px"
  }

  const saveButton = {
    borderRadius: "10px",
    background: "#2abade",
    float: "right",
    color: "white",
    height: "30px",
    fontSize: "16px",
    textTransform: "lowercase"
  }


  function handlechange(e) {
    const item = e.target.files;
    // Commented multiple file selection
    // setFile([...file, ...item])
    setFile([...item])
    const fileName = item[0].name;
    const fileData = item[0]
    setReport({ ...report, title: fileName })
  }

  function handleText(e) {
    const comments = e.target.value
    setReport({ ...report, comments: comments })
  };

  function handleOnClose(reason) {
    if (reason === 'clickaway') {
      return
    }
    setOpens(false);
  }

  function handleSave(e) {
    const comments = report.comments
    const patientId = localStorage.getItem('patientId');
    formdata.append("files", file[0]);
    formdata.append("patientId", patientId);
    formdata.append("comments", comments);

    // Add appoitment if its added through appointment
    if (appointmentId) {
      formdata.append("appointmentId", appointmentId);
    }

    handleUpload(formdata)
    setVal(file[0].name)
    setReportFile( URL.createObjectURL(file[0]))
    setItem(true)
    setOpen(false)
  }

  

  function handleDisabled() {
    setOpens(true)
  }

  var allfiles = file.map((eachfile) => {
    return <img src={eachfile} style={imgStyle} />
  })

  return (
    <Box  >
      <Box className={classes.holesize}  >

        <Dialog open={open} className={classes.boxsize} >
          <Box style={mainBox}>

            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            <DialogTitle className={classes.header} style={{ paddingTop: "0px" }}>
              <Box display="flex">
                <Box>
                  <Typography className={classes.title} variant="h5" style={add}>
                    Add Report
               </Typography>
                </Box>
              </Box>
            </DialogTitle>


            <TextareaAutosize aria-label="minimum height" rowsMin={5} style={{ width: "100%", fontFamily: "sans-serif" }} placeholder="Type here..."
              onChange={handleText}
            />
            <div >

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
                        <img src={URL.createObjectURL(file[index])} alt='img' style={imgStyle} />
                        <abbr style={fontStyle} title={fileName}>{fileName} </abbr>
                      </div>
                    )
                  }
                  else if (fileExtension === "jpg" && index < 3) {
                    return (
                      <div style={{ display: "grid", marginRight: "20px" }}>
                        <img src={URL.createObjectURL(file[index])} alt='img' style={imgStyle} />
                        <abbr style={fontStyle} title={fileName}  > {fileName} </abbr>
                      </div>
                    )
                  }

                })
                }
              </div>
              <div className="left-partition">
                <label for="files" name="files" style={{ fontSize: " 16px ", color: "#2abade" }} > + Select File </label>
                <input
                  type="file"
                  name="files"
                  onChange={handlechange}
                  id="files"
                  accept=".jpg,.svg,.png, .pdf"
                  style={mystyle}
                  required
                />
              </div>

              <div >
                {(report.title !== "") ?
                  <Button variant="contained" style={saveButton}
                    onClick={handleSave}
                  >save</Button>
                  :
                  <Box>
                    <Button variant="contained" style={saveButton} onClick={handleDisabled}
                    >save</Button>

                  </Box>
                }
              </div>
            </div>

            <Box className={classes.bordersize} />
          </Box>
        </Dialog>

      </Box>
      {
        <SnackBar
          openDialog={opens}
          message={"Please Select File"}
          onclose={handleOnClose}
          severity={'error'}
        />
      }
    </Box>


  )
}
export default PatientReport;