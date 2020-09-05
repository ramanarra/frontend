import React, { useState, useEffect } from 'react'
import './style.scss'
import { IconButton } from '@material-ui/core'
import { Sort } from '@material-ui/icons'

import useCustomFetch from '../../hooks/useCustomFetch'
import api, { URL } from '../../api'
import SearchBar from '../../components/SearchBar'
import { useHistory } from 'react-router-dom'
import { dateFmt } from '../../components/commonFormat'

const Patients = (props) => {
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState(null)
  const history = useHistory()
  const doctorKey = localStorage.getItem('docKey')
  const accountKey = localStorage.getItem('accountKey')
  const url = `${URL.patient.list}?accountKey=${accountKey}`
  const [patientList] = useCustomFetch('GET', url)
  const patientData = !!searchData && !!searchText ? searchData : patientList

  useEffect(() => {
    searchList()
  }, [searchText])

  const searchList = () => {
    if (!!searchText) {
      const token = localStorage.getItem('virujhToken')
      const authStr = 'Bearer '.concat(token)
      api
        .get(URL.patient.search, {
          params: {
            patientSearch: searchText,
            doctorKey,
          },
          headers: {
            Authorization: authStr,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setSearchData(res.data)
          }
        })
    } else {
      setSearchData(null)
    }
  }

  const openDetials = (data) => history.push(`/patients/${data?.patient_id}`)

  const ctrlBtn = (data) => (
    <div className="ctrl-btns">
      <IconButton
        className="tbl-btn view-btn"
        onClick={openDetials.bind(this, data)}
      >
        <img src={require('../../assets/img/icons/eye.svg')} alt="View info" />
      </IconButton>
      <IconButton className="tbl-btn add-btn">
        <img
          src={require('../../assets/img/icons/calender2.svg')}
          alt="View scheduel"
        />
      </IconButton>
    </div>
  )

  return (
    <div className="doctor-patients-list">
      <div className="header-bar">
        <div className="left-partition">
          <h1 className="title">Patients</h1>
        </div>
        <div className="right-partition">
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
        </div>
      </div>
      <div className="patient-table-wrap">
        <table className="patient-table">
          <thead>
            <tr>
              <th className="tbl-head fname">First Name</th>
              <th className="tbl-head lname">Last Name</th>
              <th className="tbl-head email">Email Address</th>
              <th className="tbl-head phone">Phone Number</th>
              <th className="tbl-head dob">Date of Birth</th>
              <th className="tbl-head ctrl-btns-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientData
              ?.filter((f) => !!f)
              .map((i) => (
                <tr>
                  <td className="tbl-cell fname">{i?.firstName}</td>
                  <td className="tbl-cell lname">
                    {!!i?.lastName ? i.lastName : '-'}
                  </td>
                  <td className="tbl-cell email">{i?.email}</td>
                  <td className="tbl-cell phone">{i?.phone}</td>
                  <td className="tbl-cell dob">{dateFmt(i?.dateOfBirth)}</td>
                  <td className="tbl-cell ctrl-btns-cell">{ctrlBtn(i)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Patients
