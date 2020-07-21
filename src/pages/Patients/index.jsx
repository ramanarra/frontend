import React from 'react'
import './style.scss'
import { TextField, IconButton } from '@material-ui/core'
import { Search, Visibility, InsertInvitation, Sort } from '@material-ui/icons'

import useCustomFetch from '../../hooks/useCustomFetch'
import { URL } from '../../api'

const Patients = () => {
  const [patientList] = useCustomFetch('GET', URL.patientList)
  const ctrlBtn = (data) => (
    <div className="ctrl-btns">
      <IconButton className="tbl-btn view-btn">
        <Visibility fontSize="small" />
      </IconButton>
      <IconButton className="tbl-btn add-btn">
        <InsertInvitation fontSize="small" />
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
            <TextField
              InputProps={{ endAdornment: <Search /> }}
              placeholder="Search Patients"
              className="search-field"
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
            {patientList?.map((i) => (
              <tr>
                <td className="tbl-cell fname">{i.firstName}</td>
                <td className="tbl-cell lname">{i.lastName}</td>
                <td className="tbl-cell email">{i.email}</td>
                <td className="tbl-cell phone">{i.phone}</td>
                <td className="tbl-cell dob">{i.dateOfBirth}</td>
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
