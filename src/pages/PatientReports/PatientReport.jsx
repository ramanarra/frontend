import React, { useState } from 'react'
import { Box, Dialog, Typography, DialogTitle, TextareaAutosize, Button } from '@material-ui/core'
import useStyle from './useStyle'
import CloseIcon from '@material-ui/icons/Close'
import './style.scss'
import moment from 'moment'
import pdfIcon from '../../assets/img/pdfIcon.svg'
import SnackBar from '../../components/SnackBar'


function PatientReport({ open, setOpen, setItem, handleClose, appointmentId, setReportFile, setVal, handleUpload }) {
  const classes = useStyle()
  const [file, setFile] = useState([])
  const [opens, setOpens] = useState(false)
  const [largeSizeOpens, setLargeSizeOpens] = useState(false)
  const date = new Date();
  const [report, setReport] = useState({
    title: "",
    reportDate: moment(date).format('YYYY-MM-DD'),
    comments: ""
  })

  const handlechange = (e) => {
    const items = [...e.target.files];
    let selectItem = []
    items.map((value, index) => {
      //checking file size less than or equal to 5 Mb
      (value.size < 5242881) ? selectItem = [...selectItem, value] : setLargeSizeOpens(true)

    })
    setFile([...file, ...selectItem])
    const fileName = items[0]?.name;
    setReport({ ...report, title: fileName })
  }

  const handleText = (e) => {
    const comments = e.target.value
    setReport({ ...report, comments: comments })
  };

  const handleOnClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpens(false);
    setLargeSizeOpens(false);
  }

  const handleSave = (e) => {
    const comments = report.comments
    const patientId = localStorage.getItem('patientId');
    file.map((value, index) => {
      const formdata = new FormData();
      formdata.append("files", value);
      formdata.append("patientId", patientId);
      formdata.append("comments", comments);

      // Add appoitment if its added through appointment
      if (appointmentId) {
        formdata.append("appointmentId", appointmentId);
      }

      if (handleUpload) {
        handleUpload(formdata)
      }
    })


    const fileName = file[0].name;

    //Passing  patient report fileName to the report when setVal is true
    if (setVal) {
      setVal(fileName);
      setReportFile(URL.createObjectURL(file[0]))
    }

    setItem(true)
    setOpen(false)
  }

  const handleDisabled = () => {
    setOpens(true)
  }

  var allfiles = file.map((eachfile) => {
    return <img src={eachfile} className={classes.image} />
  })

  return (
    <Box  >
      <Box className={classes.holesize}  >
        <Dialog open={open} className={classes.boxsize} >
          <Box className={classes.mainBox}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />

            <DialogTitle className={classes.header} style={{ paddingTop: "0px" }}>
              <Box display="flex">
                <Box>
                  <Typography className={classes.title} variant="h5" className={classes.heading}>
                    Add Report
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <TextareaAutosize aria-label="minimum height" rowsMin={5} className={classes.reportText} placeholder="Type here..."
              onChange={handleText}
            />

            <div >
              <div className={classes.files}>
                {file.map((value, index) => {
                  const fileName = file[index].name;

                  const fileExtension = fileName.split('.').pop();
                  if (fileExtension === "pdf" && index < 3) {
                    return (
                      <div key={`uploadedfile-${value.name}-${value.lastModified}`} className={classes.firstReportFile}>
                        <img src={pdfIcon} alt='img1' className={classes.image} />
                        <abbr className={classes.font} title={fileName}>{fileName}</abbr>
                      </div>
                    )
                  }
                  else if ((fileExtension === "svg" || fileExtension === "png") && index < 3) {
                    return (
                      <div key={`uploadedfile-${value.name}-${value.lastModified}`} className={classes.reportFiles}>
                        <img src={URL.createObjectURL(file[index])} alt='img' className={classes.image} />
                        <abbr className={classes.font} title={fileName}>{fileName} </abbr>
                      </div>
                    )
                  }
                  else if (fileExtension === "jpg" && index < 3) {
                    return (
                      <div key={`uploadedfile-${value.name}-${value.lastModified}`} className={classes.reportFiles}>
                        <img src={URL.createObjectURL(file[index])} alt='img' className={classes.image} />
                        <abbr className={classes.font} title={fileName}  > {fileName} </abbr>
                      </div>
                    )
                  }

                })
                }
              </div>

              <div className={classes.reportLeft} >
                <label htmlFor="files" name="files" className={classes.selectFile} > + Select File </label>
                <input
                  type="file"
                  name="files"
                  onChange={handlechange}
                  id="files"
                  accept=".jpg,.svg,.png, .pdf"
                  className={classes.inputField}
                  required
                  multiple
                />
              </div>

              <div  >
                {(report.title !== "") ?
                  <Button variant="contained" className={classes.saveButton}
                    style={{ outline: "none" }}
                    onClick={handleSave}
                  >save</Button>
                  :
                  <Box>
                    <Button variant="contained" className={classes.saveButton}
                      style={{ outline: "none" }}
                      onClick={handleDisabled}
                    >save</Button>

                  </Box>
                }
              </div>
            </div>

            <Box className={classes.bordersize} />
          </Box>
        </Dialog>

      </Box>

      <SnackBar
        openDialog={opens}
        message={"Please Select File"}
        onclose={handleOnClose}
        severity={'error'}
        style={{ outline: "none" }}
      />

      <SnackBar
        openDialog={largeSizeOpens}
        message={"Please Select File Less than 5 Mb"}
        onclose={handleOnClose}
        severity={'error'}
        style={{ outline: "none" }}
      />

    </Box>


  )
}
export default PatientReport;