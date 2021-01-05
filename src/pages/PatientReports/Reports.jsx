import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchBar from '../../components/SearchBar'
import './style.scss'
import api, { URL } from '../../api'
import PatientReport from './PatientReport'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { Button } from '@material-ui/core'
import SnackBar from '../../components/SnackBar'
import moment from 'moment'

const Reports = (props) => {
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState(null)
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(false)
  const [paginationStart, setPaginationStart] = useState(0)
  const [paginationLimit, setPaginationLimit] = useState(15)
  const [reportList, setReportList] = useState([])
  const [show, setShow] = useState(0)
  const [count, setCount] = useState(0)


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
    api.get(`${URL.patientReportList}?paginationStart=${paginationStart}&&paginationLimit=${paginationLimit}&&searchText=${searchText}`, {
      headers: {
        Authorization: authStr,
      },
    })
      .then((res) => {
        console.log(res);
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
    }, 5000)
  }

  function handlePageBack() {
    setCount(count - 1)
    console.log(paginationStart)

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
    console.log(paginationStart)
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
      <div className="header-bar col-md-12">
        <div className="col-md-4 col-sm-4 col-xs-4 col-lg-4 left-report">
          <h1 className="title">Reports</h1>
        </div>
        <div className="col-md-7 col-sm-7 col-xs-7 col-lg-7 right-report right-pad">
          <div className="search-bar">
            <SearchBar
              label="Search Reports"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onClick={handlePage}
            />
          </div>
        </div>
        <div className="col-md-1 col-sm-1 col-xs-1 col-lg-1 right-report">

          <Button className="title" onClick={handlePopupMsg} style={{ textTransform: "none" }} >Add &nbsp;
            <AddCircleOutlineTwoToneIcon />
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
        </div>

      </div>
      <div className="patient-table-wrap">
        <InfiniteScroll
          dataLength={reportList.length}
        >
          <div className="table-wrap">

            <table className="patient-table" style={{ paddingRight: "80px" }} >
              <thead className="head" >
                <tr>
                  <th className="tbl-head fname" width="30%" >Title</th>
                  <th className="tbl-head lname" width="30%">Report Date</th>
                  <th className="tbl-head email" width="30%">Comments</th>

                </tr>

              </thead>
              <tbody className="body">
                {reportData && reportData.length > 0 && reportData.map((i) => (
                  <tr>
                    <td className="tbl-cell fname" >{i?.fileName}</td>
                    <td className="tbl-cell lname">{i?.reportDate ? (moment(i?.reportDate).format('YYYY-MM-DD')) : '-'}</td>
                    <td className="tbl-cell email">{i?.comments}</td>
                  </tr>
                ))}
                {
                  reportData.length <= 0 &&
                  <tr>
                    <td className="tbl-cell fname" ></td>
                    <td className="tbl-cell lname"></td>
                    <td className="tbl-cell email"></td>
                  </tr>
                }
                {
                  reportData.length <= 0 &&
                  <tr>
                    <td className="tbl-cell fname" ></td>
                    <td className="tbl-cell lname">No Data Found</td>
                    <td className="tbl-cell email"></td>
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

          <div style={{ display: 'flex', paddingTop: "20px" }}>
            {count > 0 &&
              <div style={{ padding: "1px", borderRadius: "20px", color: "#ffffff", backgroundColor: "rgb(11, 181, 255)" }}>
                <Button onClick={handlePageBack} style={{ padding: "2px", color: "#ffffff", textTransform: 'capitalize' }}>Prev</Button>
              </div>
            }
            {!(count > 0) &&
              <div>
                <Button onClick={handlePageBack} style={{ padding: "2px", color: "#ffffff", textTransform: 'capitalize', visibility: 'hidden' }}>Prev</Button>
              </div>
            }
            {show > 15 && paginationStart < show - 15 &&
              <div style={{ position: "absolute", right: "0%", borderRadius: "20px", color: "#ffffff", backgroundColor: "rgb(11, 181, 255)" }}>
                <Button onClick={handlePageNext} style={{ padding: "2px", color: "#ffffff", textTransform: 'capitalize' }}>Next</Button>
              </div>
            }


          </div>
        }

        {
          <SnackBar
            openDialog={item}
            message={"Your report added successfully"}
            onclose={handleClose}
            severity={'success'}
          />
        }

      </div>
    </div>
  )
}

export default Reports
