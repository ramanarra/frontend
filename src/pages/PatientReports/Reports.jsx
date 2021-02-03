import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchBar from '../../components/SearchBar'
import './style.scss'
import useStyle from './useStyle'
import api, { URL } from '../../api'
import PatientReport from './PatientReport'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import SnackBar from '../../components/SnackBar'
import moment from 'moment'
import { useLocation } from "react-router-dom"
import messages from '../../lib/iconMsg'
import { AddIcon } from '../../components/Tooltip'

const Reports = (props) => {
  const classes = useStyle();
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState(null)
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(false)
  const [paginationStart, setPaginationStart] = useState(0)
  const [paginationLimit, setPaginationLimit] = useState(15)
  const [reportList, setReportList] = useState([])
  const [show, setShow] = useState(0)
  const [count, setCount] = useState(0)

  const location = useLocation();

  const reportData = !!searchData && !!searchText ? searchData : reportList

  useEffect(() => {
    if(searchText !== "") {
      setPaginationStart(0)
      patientReportList(0)
      setCount(0)
    }
    else if(searchText.trim()==="")
    {
      patientReportList(0)
      setCount(0)
    }
    else{
      patientReportList(paginationStart)
    }
  }, [searchText])

  const patientReportList = (paginationStart) => {
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)
    api.get(`${URL.patientReportList}?paginationStart=${paginationStart}&&paginationLimit=${paginationLimit}&&searchText=${searchText}&&appointmentId=${location.state}`, {
      headers: {
        Authorization: authStr,
      },
    })
      .then((res) => {

        setShow((res.data.totalCount))
        setReportList(((res.data && res.data.list && res.data.list.length) ? res.data.list : []))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    patientReportList(paginationStart);
    setPaginationStart(0)
  }, []);

  function handlePopupMsg() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    setItem(false);

    setTimeout(() => {
      patientReportList();
    }, 4000)
  }

  function handlePageBack() {
    setCount(count - 1)

    if (paginationStart >= 0) {
      setPaginationStart(paginationStart - 15)
      if ((paginationStart - 15) > 0)
        setPaginationStart(paginationStart - 15)
      setTimeout(() => {
        patientReportList(paginationStart-15);

      }, 500)
    }
  }

  function handlePageNext() {
    console.log("next");
    
    setCount(count + 1)

    if (paginationStart >= (show - 15)) {
      setPaginationStart(paginationStart - 15);
    }
    else if ((paginationStart + 15) < show) {
      setPaginationStart(paginationStart + 15);
    } 
    setTimeout(() => {
      patientReportList(paginationStart+15);

    }, 500)
  }

  function handlePage() {
    setPaginationStart(0)
  }

  console.log(reportData);
  return (
    <div className="doctor-patients-list">
      <Grid  container item xs={12} direction="row" className="header-bar">
        <Grid className="left-report" item xs={8}>
          <h1 className="title">Reports</h1>
        </Grid>
        <Grid item xs={3} className="right-report right-pad">
          <div className="search-bar">
            <SearchBar
              label="Search Reports"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onClick={handlePage}
            />
          </div>
        </Grid>
        <Grid item xs={1} className="right-report">

          <Button onClick={handlePopupMsg} className={classes.addbtn}>Add &nbsp;
            <AddIcon title={messages.reportadd} placement='top' />
          </Button>
          {
            open &&
            <PatientReport
              setReportList={setReportList}
              open={open}
              setOpen={setOpen}
              setItem={setItem}
              handleClose={handleClose}
              patientReportList={patientReportList}
            />
          }
        </Grid>

      </Grid>
      <Grid className="patient-table-wrap">
        <InfiniteScroll
          dataLength={reportList.length}
        >
          <div className="table-wrap">

            <table className="patient-table"  >
              <thead className="head" >
                <tr>
                  <th className="tbl-head title" width="30%" >Title</th>
                  <th className="tbl-head reportDate" width="30%">Report Date</th>
                  <th className="tbl-head comments" width="30%">Comments</th>
                </tr>
              </thead>
              <tbody className="body">
                {reportData && reportData.length > 0 && reportData.map((i) => (
                  <tr>
                    <td className="tbl-cell fileName" >{i?.fileName}</td>
                    <td className="tbl-cell reportDate">{i?.reportDate ? (moment(i?.reportDate).format('YYYY-MM-DD')) : '-'}</td>
                    <td className="tbl-cell comments">{i?.comments}</td>
                  </tr>
                ))}
                {
                  reportData.length <= 0 &&
                  <tr>
                    <td className="tbl-cell fileName" ></td>
                    <td className="tbl-cell reportDate"></td>
                    <td className="tbl-cell comments"></td>
                  </tr>
                }
                {
                  reportData.length <= 0 &&
                  <tr>
                    <td className="tbl-cell fileName" ></td>
                    <td className="tbl-cell reportDate">No Data Found</td>
                    <td className="tbl-cell comments"></td>
                  </tr>
                }

              </tbody>
            </table>

            {
              reportData.length > 0 &&
              <hr width="100%" />
            }


          </div>
        </InfiniteScroll>
        {reportData.length > 0 &&

          <div className={classes.pagination}>
            {count > 0 &&
              <div className={classes.prev}>
                <Button onClick={handlePageBack} className={classes.prevbtnShow}  >Prev</Button>
              </div>
            }
            {!(count > 0) &&
              <div>
                <Button onClick={handlePageBack} className={classes.prevbtnHide}  >Prev</Button>
              </div>
            }
            {show > 15 && paginationStart < show - 15 &&
              <div className={classes.next}>
                <Button onClick={handlePageNext} className={classes.nextbtn}  >Next</Button>
              </div>
            }
          </div>
        }
        <SnackBar
          openDialog={item}
          message={"Your report added successfully"}
          onclose={handleClose}
          severity={'success'}
        />

      </Grid>
    </div>
  )
}

export default Reports
