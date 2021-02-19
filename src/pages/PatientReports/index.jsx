import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import useFetch from '../../hooks/useFetch'
import useUpload from '../../hooks/useUpload'
import api, { URL } from '../../api'
import PatientReport from './PatientReport'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone'
import { Button, IconButton } from '@material-ui/core'
import { MdInsertDriveFile as FileIcon } from 'react-icons/md'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '@material-ui/core/Grid'
import SnackBar from '../../components/SnackBar'
import moment from 'moment'
import useStyle from './useStyle'
import './style.scss'
import FileViewer from '../../components/FileViewer'

const Reports = (props) => {
  const [searchText, setSearchText] = useState('')
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(false)
  const [paginationStart, setPaginationStart] = useState(0)
  const [count, setCount] = useState(0)
  const [openFile, setOpenFile] = useState({
    status: false,
    url: null,
    type: null,
  })
  const classes = useStyle()
  const location = useLocation()

  const paginationLimit = 15

  // fetch paitent list
  const { patientList, fetchPatientList } = useFetch(
    {
      name: 'patientList',
      url: URL.patientReportList,
      params: {
        paginationStart: paginationStart,
        paginationLimit: paginationLimit,
        searchText: searchText,
        appointmentId: location.state,
      },
      initLoad: false,
    },
    [searchText, paginationStart]
  )

  const [handleUpload, data, Loading] = useUpload({
    onSuccess: () => {
      fetchPatientList()
    },
  })
  const show = patientList?.totalCount

  const handlePopupMsg = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setItem(false)
  }

  const handlePageBack = () => {
    setCount(count - 1)

    if (paginationStart >= 0) {
      setPaginationStart(paginationStart - 15)
      if (paginationStart - 15 > 0) setPaginationStart(paginationStart - 15)
    }
  }

  const handlePageNext = () => {
    console.log('next')
    setCount(count + 1)
    if (paginationStart >= show - 15) {
      setPaginationStart(paginationStart - 15)
    } else if (paginationStart + 15 < show) {
      setPaginationStart(paginationStart + 15)
    }
  }

  const handleFileClose = () => {
    setOpenFile({
      status: false,
      url: null,
      type: null,
    })
  }

  const openFileViewer = (url, type) => {
    setOpenFile({
      status: true,
      url,
      type,
    })
  }

  useEffect(() => {
    setCount(0)
  }, [searchText])

  console.log(patientList?.list?.length)

  return (
    <div className="doctor-patients-list">
      <Grid container direction="row" className="header-bar">
        <Grid className="left-report" item xs={6}>
          <h1 className="title">Lab Reports</h1>
        </Grid>
        <Grid
          container
          item
          xs={6}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid item xs={10} className="search-bar right-report">
            <SearchBar
              label="Search Reports"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>

          <Grid item xs={2} className=" right-report ">
            <Button onClick={handlePopupMsg} className={classes.addbtn}>
              Add &nbsp;
              <AddCircleOutlineTwoToneIcon />
            </Button>
            {open && (
              <PatientReport
                // setReportList={setReportList}
                open={open}
                setOpen={setOpen}
                setItem={setItem}
                handleClose={handleClose}
                handleUpload={handleUpload}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid className="patient-table-wrap">
        <div dataLength={patientList?.list?.length || 0}>
          <div className="table-wrap">
            <table className="patient-table">
              <thead className="head">
                <tr>
                  <th className="tbl-head title">Title</th>
                  <th className="tbl-head reportDate">Report Date</th>
                  <th className="tbl-head comments">Comments</th>
                  <th className="tbl-head view_attchmnt"></th>
                </tr>
              </thead>
              <tbody className="body">
                {patientList &&
                  patientList?.list?.length > 0 &&
                  patientList?.list?.map((i) => (
                    <tr>
                      <td className="tbl-cell fileName">{i?.fileName}</td>
                      <td className="tbl-cell reportDate">
                        {i?.reportDate
                          ? moment(i?.reportDate).format('YYYY-MM-DD')
                          : '-'}
                      </td>
                      <td className="tbl-cell comments">{i?.comments}</td>
                      <td className="tbl-cell attchmnt">
                        <div className="view-icon-wrap">
                          <IconButton
                            className="view-icon-btn"
                            onClick={openFileViewer.bind(
                              this,
                              i?.attachment,
                              i?.fileType
                            )}
                          >
                            <FileIcon className="view-icon" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                {!patientList?.list?.length && (
                  <tr className="no-data">
                    <td className="tbl-cell fileName"></td>
                    <td className="tbl-cell reportDate no-data">No Data Found</td>
                    <td className="tbl-cell comments"></td>
                    <td className="tbl-cell attchmnt"></td>
                  </tr>
                )}
              </tbody>
            </table>

            {patientList?.list?.length > 0 && <hr width="100%" />}
          </div>
        </div>

        {data && (
          <SnackBar
            openDialog={item}
            message={'Your report added successfully'}
            onclose={handleClose}
            severity={'success'}
          />
        )}
      </Grid>
      {patientList?.list?.length > 0 && (
        <div className={classes.pagination}>
          {count > 0 && (
            <div className={classes.prev}>
              <Button onClick={handlePageBack} className={classes.prevbtnShow}>
                Prev
              </Button>
            </div>
          )}
          {show > 15 && paginationStart < show - 15 && (
            <div className={classes.next}>
              <Button onClick={handlePageNext} className={classes.nextbtn}>
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {openFile.status && <FileViewer {...openFile} onClose={handleFileClose} />}
    </div>
  )
}

export default Reports
