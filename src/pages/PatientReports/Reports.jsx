import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Sort } from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'

import './style.scss'
import useCustomFetch from '../../hooks/useCustomFetch'
import useManualFetch from '../../hooks/useManualFetch'
import api, { URL, METHOD } from '../../api'
import SearchBar from '../../components/SearchBar'
import { dateFmt } from '../../components/commonFormat'
import SnackBar from '../../components/SnackBar'

import PatientReport from './PatientReport'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { Button, Typography, Box } from '@material-ui/core'

const Reports = (props) => {
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState(null)

  const [open, setOpen] = useState(false)

  const history = useHistory()
  const doctorKey = localStorage.getItem('docKey')
  const accountKey = localStorage.getItem('accountKey')
  const [paginationNumber, setPaginationNumber] = useState(0)
  const [patientList, setPatientList] = useState([])
  const url =
    localStorage.getItem('role') === 'ADMIN'
      ? `${URL.patient.list}?accountKey=${accountKey}`
      : `${URL.patient.listForDoctor}?paginationNumber=${paginationNumber}`
  // const [patientList] = useCustomFetch('GET', url)
  const [updateData, error, loading, data] = useManualFetch()
  const patientData = !!searchData && !!searchText ? searchData : patientList

  // useEffect(() => {
  //   searchList()
  // }, [searchText])

  // useEffect(() => {
  //   if (data?.patientsList) {
  //     setPatientList(patientList.concat(data.patientsList))
  //   }

    if (localStorage.getItem('role') === 'ADMIN') {
      if (data) {
        setPatientList(patientList.concat(data))
      }
    }

  //   if(data?.name) {
  //     setOpen(true)
  //   }
  // }, [data])

  // useEffect(() => {
  //   updateData(METHOD.GET, url)
  // }, [paginationNumber])

  // const searchList = () => {
  //   if (!!searchText) {
  //     const token = localStorage.getItem('virujhToken')
  //     const authStr = 'Bearer '.concat(token)
  //     api
  //       .get(URL.patient.search, {
  //         params: {
  //           patientSearch: searchText,
  //           doctorKey,
  //         },
  //         headers: {
  //           Authorization: authStr,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setSearchData(res.data)
  //         }
  //       })
  //   } else {
  //     setSearchData(null)
  //   }
  // }

  // const openDetials = (data) => history.push(`/patients/${data?.patient_id}`)

  // const ctrlBtn = (data) => (
  //   <div className="ctrl-btns">
  //     {/* <IconButton
  //       className="tbl-btn view-btn"
  //       onClick={openDetials.bind(this, data)}
  //     >
  //       <img src={require('../../assets/img/icons/eye.svg')} alt="View info" />
  //     </IconButton> */}
  //     {/* <IconButton className="tbl-btn add-btn">
  //       <img
  //         src={require('../../assets/img/icons/calender2.svg')}
  //         alt="View scheduel"
  //       />
  //     </IconButton> */}
  //   </div>
  // )

  // const fetchData = () => {
  //   if (localStorage.getItem('role') !== 'ADMIN') {
  //     setPaginationNumber(paginationNumber + 1)
  //   }
  // }

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }
  //   setOpen(false)
  // }
  function handlePopupMsg() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <div className="doctor-patients-list">
      <div className="header-bar">
        <div className="left-partition">
          <h1 className="title">Reports</h1>
        </div>
        <div className="right-partition">
          
          <Button  className="title"  onClick={handlePopupMsg} >Add
            <AddCircleOutlineTwoToneIcon />
          </Button>
          {
          open &&
          <PatientReport
            open={open}
            handleClose={handleClose}
          />
        }
          
        </div>
        
        {/* <div className="right-partition">
          <IconButton className="sort-icon">
            <Sort fontSize="small" />
          </IconButton>
          <div className="search-bar">
            <SearchBar
              label="Search Patients"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div> */}

      </div>
      <div className="patient-table-wrap">
        <InfiniteScroll
          dataLength={patientList.length}
          // next={fetchData}
          // hasMore={true}
          // height={'100%'}
          // className="infiniteScroll"
        >
          <div className="table-wrap">
            <table className="patient-table">
              <thead className="head">
                <tr>
                  <th className="tbl-head fname">Title</th>
                  <th className="tbl-head lname">reportDate</th>
                  <th className="tbl-head email">Comments</th>
                  
                </tr>
              </thead>
              <tbody className="body">
                {patientData
                  ?.filter((f) => !!f)
                  .map((i) => (
                    <tr>
                      <td className="tbl-cell fname">{i?.firstName}</td>
                      <td className="tbl-cell lname">
                        {!!i?.lastName ? i.lastName : '-'}
                      </td>
                      <td className="tbl-cell email">
                        {!!i?.email ? i.email : '-'}
                      </td>
                      <td className="tbl-cell phone">
                        {!!i?.phone ? `+91 ${i.phone}` : '-'}
                      </td>
                      <td className="tbl-cell dob">
                        {!!i?.dateOfBirth ? dateFmt(i?.dateOfBirth) : '-'}
                      </td>
                      <td className="tbl-cell ctrl-btns-cell">{ctrlBtn(i)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      </div>

     

      {/* {!data && <CircularProgress className="spinner" />} */}
      {/* {
        (data && data.name === 'Error' && data.status === 500 &&
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
        ) ||
        (data && data.name === 'Error' && data.status !== 500 &&
        <SnackBar
          openDialog={open}
          message={'something went wrong'}
          onclose={handleClose}
          severity={'error'}
        />
        )
      } */}
    </div>
  )
}

export default Reports
