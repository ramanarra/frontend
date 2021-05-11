import React, { useState, useEffect } from 'react'
import {
  Box,
  Dialog,
  Typography,
  DialogTitle,
  TextareaAutosize,
  Button,
  Checkbox,
  Grid,
} from '@material-ui/core'
import useStyle from './useStyle'
import CloseIcon from '@material-ui/icons/Close'
import './style.scss'
import moment from 'moment'
import pdfIcon from '../../assets/img/pdfIcon.svg'
import imageIcon from '../../assets/img/imageIcon.svg'
import SnackBar from '../../components/SnackBar'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router'
import { MdInsertDriveFile as FileIcon } from 'react-icons/md'
// import { URL } from '../../api'
import InfiniteScroll from 'react-infinite-scroll-component'
import FileViewer from '../../components/FileViewer'

function PatientAppointmentReport({
  open,
  setOpen,
  setItem,
  handleClose,
  appointmentId,
  setReportFile,
  setVal,
  handleUpload,
  upload,
  setUpload,
  savedFiles
}) {
  const classes = useStyle()
  const [file, setFile] = useState([])
  const [opens, setOpens] = useState(false)
  const [largeSizeOpens, setLargeSizeOpens] = useState(false)
  const [paginationStart, setPaginationStart] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState(savedFiles || [])
  const location = useLocation()
  const paginationLimit = 15
  const date = new Date()
  const [fileName, setFileName] = useState('')
  let ids = []
  const [lastfileId, setLastfiledId] = useState()

  const [report, setReport] = useState({
    title: '',
    reportDate: moment(date).format('YYYY-MM-DD'),
    comments: '',
  })
  const [openFile, setOpenFile] = useState({
    status: false,
    url: null,
    type: null,
  })

  const { patientList, fetchPatientList } = useFetch(
    {
      name: 'patientList',
      url: '/calendar/patient/report/list',
      params: {
        paginationStart: paginationStart,
        paginationLimit: paginationLimit,
        searchText: '',
        appointmentId: location.state,
      },
      initLoad: false,
    },
    ['', paginationStart]
  )

  useEffect(() => {
    if (lastfileId) fetchPatientList()
  }, [paginationStart, upload])

  useEffect(() => {
    console.log(patientList, patientList?.list, lastfileId)
    if (lastfileId) {
      const tempArr = [...selectedFiles]

      patientList?.list?.map(function (o) {
        if (lastfileId < o.id) {
          tempArr.push(o)
        } 
      })
      setSelectedFiles(tempArr)
      setFile([])
    }
  }, [patientList])

  const handlechange = (e) => {
    const items = [...e.target.files]
    let selectItem = []
    items.map((value, index) => {
      //checking file size less than or equal to 5 Mb
      value.size < 5242881
        ? (selectItem = [...selectItem, value])
        : setLargeSizeOpens(true)
    })
    setFile([...file, ...selectItem])
    const fileName = items[0]?.name
    setReport({ ...report, title: fileName })
    setUpload(true)
  }

  const handleText = (e) => {
    const comments = e.target.value
    setReport({ ...report, comments: comments })
  }

  const handleOnClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpens(false)
    setLargeSizeOpens(false)
  }

  const handleUploadReport = (e) => {
    // setFileName(file[0].name)
    const comments = report.comments
    const patientId = localStorage.getItem('patientId')
    file.map((value, index) => {
      const formdata = new FormData()
      formdata.append('files', value)
      formdata.append('patientId', patientId)
      formdata.append('comments', comments)

      // Add appoitment if its added through appointment
      if (appointmentId) {
        formdata.append('appointmentId', appointmentId)
      }

      if (handleUpload) {
        handleUpload(formdata)
        //fetchPatientList()
      }
    })

    console.log(fileName)

    //Passing  patient report fileName to the report when setVal is true
    if (setVal) {
      setVal(fileName)
      // setReportFile(URL.createObjectURL(file[0]))
    }

    setLastfiledId(
      Math.max.apply(
        Math,
        patientList?.list?.map(function (o) {
          return o.id
        })
      )
    )
    setItem(true)
    // setOpen(false)
  }

  const handleDisabled = () => {
    setOpens(true)
  }

  const fetchData = () => {
    setPaginationStart(paginationStart + 1)
  }

  const handleFileClose = () => {
    setOpenFile({
      status: false,
      url: null,
      type: null,
    })
  }

  //update report id to appointment
  const { fetchUpdateReport, isDeleteReportLoading } = useFetch({
    name: 'updateReport',
    method: 'PUT',
    url: '/calendar/patient/reportId',
    initLoad: false,
    onSuccess: fetchPatientList,
  })

  const handleSave = () => {
    selectedFiles.map((a) => ids.push(a.id.toString()))

    fetchUpdateReport({
      params: {
        appointmentId: appointmentId,
        insertId: ids.toString(),
      },
    })
    setItem(true)
    setOpen(false)
  }

  const removeFile = (index) => {
   
    file.splice(index, 1)
    setFile([...file])

  }
  return (
    <Box>
      <Box className={classes.holesize}>
        <Dialog
          open={open}
          className={classes.boxsize}
          maxWidth="md"
          fullWidth
          style={{ minHeight: 500 }}
          // style={{ width: 750 }}
        >
          <Box className={classes.mainBox}>
            {/* <CloseIcon className={classes.closeIcon} onClick={handleClose} /> */}

            <DialogTitle className={classes.header} style={{ paddingTop: '0px' }}>
              <Grid container spacing={24}>
                <Grid
                  item
                  xs={10}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography
                    className={classes.title}
                    variant="h5"
                    className={classes.heading}
                  >
                    Add Report
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                </Grid>
              </Grid>
            </DialogTitle>
            <Grid className="model-patient-table-wrap">
              <div className="table-wrap">
                <InfiniteScroll
                  dataLength={patientList?.list?.length || 0}
                  children={patientList?.list || []}
                  style={{ maxHeight: '330px', marginBottom: 12 }}
                  next={fetchData}
                  hasMore={true}
                >
                  <table className="patient-table" style={{ width: '100%' }}>
                    <thead
                      className="head"
                      style={{ height: '100%', tableLayout: 'fixed' }}
                    >
                      <tr>
                        <th className="tbl-head view_attchmnt"></th>
                        <th className="tbl-head title">Title</th>
                        <th className="tbl-head reportDate">Report Date</th>
                        <th className="tbl-head comments">Comments</th>
                      </tr>
                    </thead>
                    <tbody className="body" id="table-body">
                      {patientList &&
                        patientList?.list?.length > 0 &&
                        patientList?.list?.map((i) => (
                          <tr>
                            <td
                              className="tbl-cell"
                              style={{ paddingLeft: 20, width: 30 }}
                            >
                              {/* {fileName === i.fileName && (
                                <Checkbox checked={true} />
                              )} */}
                              {/* {fileName !== i.fileName && ( */}
                                <Checkbox
                                  // defaultChecked={selectedFiles.some((file) => file.id === i.id)}
                                  checked={selectedFiles.some((file) => file.id === i.id)}
                                  onChange={(event) => {
                                    const tempArr = [...selectedFiles]
                                  
                                    if (event.target.checked) {
                                      tempArr.push(i)
                                      setSelectedFiles(tempArr)
                                      console.log(tempArr)
                                    } else {
                                      const newSelectedList = tempArr.filter(
                                        (file) => file.id !== i.id
                                      )
                                      setSelectedFiles(newSelectedList)
                                      console.log(selectedFiles)
                                    }
                                  }}
                                />
                              {/* )} */}
                            </td>
                            <td className="tbl-cell fileName">{i?.fileName}</td>
                            <td className="tbl-cell reportDate">
                              {i?.reportDate
                                ? moment(i?.reportDate).format('YYYY-MM-DD')
                                : '-'}
                            </td>
                            <td className="tbl-cell comments">{i?.comments}</td>
                          </tr>
                        ))}
                      {!patientList?.list?.length && (
                        <tr className="no-data">
                          <td className="tbl-cell fileName"></td>
                          <td className="tbl-cell reportDate no-data">
                            No Data Found
                          </td>
                          <td className="tbl-cell comments"></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </InfiniteScroll>
              </div>
            </Grid>

            <Grid container spacing={24} style={{ marginTop: '20px' }}>
              <Grid item xs={2}>
                <div className={classes.reportLeft}>
                  <label htmlFor="files" name="files" className={classes.selectFile}>
                    {' '}
                    + Select File{' '}
                  </label>
                  <input
                    type="file"
                    name="files"
                    onChange={handlechange}
                    id="files"
                    // accept=".jpg,.svg,.png, .pdf"
                    className={classes.inputField}
                    required
                    multiple
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={2}
                  className={classes.reportText}
                  placeholder="Type here..."
                  onChange={handleText}
                />
              </Grid>
              <Grid item xs={2}>
                <div>
                  {ids.length > 0 ? (
                    <Button
                      variant="contained"
                      className={classes.saveButton}
                      style={{ outline: 'none' }}
                      onClick={handleDisabled}
                    >
                      save
                    </Button>
                  ) : (
                    <Box>
                      <Button
                        variant="contained"
                        className={classes.saveButton}
                        style={{ outline: 'none' }}
                        onClick={handleSave}
                      >
                        save
                      </Button>
                    </Box>
                  )}
                </div>
              </Grid>
            </Grid>

            <div>
              <div className={classes.files}>
                {file.map((value, index) => {
                  const fileName = file[index].name

                  const fileExtension = fileName.split('.').pop()
                  if (fileExtension === 'pdf' && index < 6) {
                    return (
                      <div
                        key={`uploadedfile-${value.name}-${value.lastModified}`}
                        className={classes.firstReportFile}
                      >
                        <img src={pdfIcon} alt="img1" className={classes.image} />
                        <abbr className={classes.font} title={fileName}>
                          {fileName}
                        </abbr>
                        <div
                          className={classes.fileremove}
                          onClick={() => removeFile(index)}
                        >
                          x
                        </div>
                      </div>
                    )
                  } else if (
                    (fileExtension === 'svg' ||
                      fileExtension === 'png' ||
                      fileExtension === 'jpg') &&
                    index < 6
                  ) {
                    return (
                      <div
                        key={`uploadedfile-${value.name}-${value.lastModified}`}
                        className={classes.reportFiles}
                      >
                        <img
                          src={URL.createObjectURL(file[index])}
                          alt="img"
                          className={classes.image}
                        />
                        <abbr className={classes.font} title={fileName}>
                          {fileName}{' '}
                        </abbr>
                      </div>
                    )
                  } else if (index < 6) {
                    return (
                      <div
                        key={`uploadedfile-${value.name}-${value.lastModified}`}
                        className={classes.reportFiles}
                      >
                        <img src={imageIcon} alt="img" className={classes.image} />
                        <abbr className={classes.font} title={fileName}>
                          {' '}
                          {fileName}{' '}
                        </abbr>
                      </div>
                    )
                  }
                })}
              </div>
              <div>
                {report.title !== '' && file.length > 0 && (
                  <Button
                    variant="contained"
                    className={classes.uploadButton}
                    style={{ outline: 'none' }}
                    onClick={handleUploadReport}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
            <Box className={classes.bordersize} />
          </Box>
        </Dialog>
        {openFile.status && <FileViewer {...openFile} onClose={handleFileClose} />}
      </Box>

      <SnackBar
        openDialog={opens}
        message={'Please Select File'}
        onclose={handleOnClose}
        severity={'error'}
        style={{ outline: 'none' }}
      />

      <SnackBar
        openDialog={largeSizeOpens}
        message={'Please Select File Less than 5 Mb'}
        onclose={handleOnClose}
        severity={'error'}
        style={{ outline: 'none' }}
      />
    </Box>
  )
}
export default PatientAppointmentReport
