import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'

import api, { URL } from '../../../api'
import './style.scss'
import AppointmentCard from './Appointment/AppointmentCard'
import { dateFmt } from '../../../components/commonFormat'

const PatientDetials = (props) => {
  const [data, setData] = useState(null)
  const [appointment, setAppointment] = useState(null)
  const [tab, setTab] = useState(0)

  const { patientId } = useParams()
  const doctorKey = localStorage.getItem('docKey')
  const params = { patientId: parseInt(patientId), doctorKey }
  const token = localStorage.getItem('virujhToken')
  const headers = {
    Authorization: 'Bearer '.concat(token),
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadAppointment()
  }, [tab])

  const loadData = () => {
    api.get(URL.patient.info, { params, headers }).then((res) => {
      setData(res.data)
    })
  }
  const loadAppointment = () => {
    const url = !tab ? URL.patient.upcomingApp : URL.patient.pastApp
    api.post(url, params, { headers }).then((res) => setAppointment(res.data))
  }

  const switchTab = (id) => {
    setTab(id)
  }

  const description = data?.description

  return (
    <div className="patient-detials-edit">
      <h3 className="title">Patient Details</h3>
      <div className="detials-table-wrap">
        <table>
          <tbody>
            <tr>
              <td className="tbl-cell field-name">First Name</td>
              <td className="tbl-cell field-value">
                {data?.firstName ? data.firstName : '-'}
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Last Name</td>
              <td className="tbl-cell field-value">
                {data?.lastName ? data.lastName : '-'}
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Email Address</td>
              <td className="tbl-cell field-value">
                {data?.email ? data.email : '-'}
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Date of Birth</td>
              <td className="tbl-cell field-value">
                {!!data?.dateOfBirth &&
                  dateFmt(data?.dateOfBirth ? data.dateOfBirth : '-')}
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Phone Number</td>
              <td className="tbl-cell field-value">
                {data?.phone ? `+91 ${data.phone}` : '-'}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="more-desc">
          <h4 className="sub-title">Additional Details</h4>
          <div className="field-label">Description</div>
          <div className="field-area">{description}</div>
        </div>
        <div className="allergy-list">
          <table>
            <tbody>
              <tr>
                <td className="tbl-cell field-name">Allergies List</td>
                <td className="tbl-cell field-value">
                  <ul className="allergies">
                    {data?.allergiesList?.map((i) => (
                      <li className="allergy">{i}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="edit-btn-wrap">
          <Button className="edit-btn">Edit</Button>
        </div>
        <div className="appointment-section">
          <div className="appointment-type-tab">
            <div className="upcoming-tab-wrap">
              <span
                className={'upcoming-tab appointment-tab' + (!tab ? ' active' : '')}
                onClick={switchTab.bind(this, 0)}
              >
                Upcoming
              </span>
            </div>
            <div className="past-tab-wrap">
              <span
                className={'past-tab appointment-tab' + (!!tab ? ' active' : '')}
                onClick={switchTab.bind(this, 1)}
              >
                Past
              </span>
            </div>
          </div>

          <Grid container spacing={2} className="appointment-list-wrap">
            {!!appointment?.length ? (
              appointment?.map((i, index) => (
                <Grid item xs={tab === 0 ? 6 : 5.5}>
                  <AppointmentCard data={i} isPast={!!tab} index={index} />
                </Grid>
              ))
            ) : (
              <Grid item xs={6} className="no-appointment">
                No {tab === 0 ? 'upcoming' : 'past'} appointments
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default PatientDetials
