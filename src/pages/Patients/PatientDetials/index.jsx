import React, { useState, useEffect } from 'react'
import EditField from '../../../components/EditField'
import { useParams } from 'react-router-dom'
import useCustomFecth from '../../../hooks/useCustomFetch'
import { URL } from '../../../api'

import './style.scss'
import { Button } from '@material-ui/core'
import useManualFetch from '../../../hooks/useManualFetch'
import moment from 'moment'

const PatientDetials = (props) => {
  const { patientId } = useParams()
  const doctorKey = localStorage.getItem('docKey')
  const params = { patientId, doctorKey }
  const [patientDet] = useCustomFecth('GET', URL.patient.detials, params)
  const [handleUpdate, error, isLoading, res] = useManualFetch()
  const [data, setData] = useState(null)
  const description =
    'sadlkfas;ldk fsahdjfalskdjflsa dflajsld fasldkjf asldfj saldfas dflkasd flasdf;saldflasjd fsaljdfsald flsadjflsajdlfajsldfj'
  const allergies = ['asdfads', 'asdfasdf', 'adsfasdfa', 'adsfasfa']

  const handleSave = () =>
    handleUpdate('POST', URL.patient.update, {
      ...data,
      patientId: parseInt(patientId),
    })

  useEffect(() => {
    !!patientDet?.patientDetails && setData(patientDet.patientDetails)
  }, [patientDet])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <div className="patient-detials-edit">
      <h3 className="title">Patient Details</h3>
      <div className="detials-table-wrap">
        <table>
          <tbody>
            <tr>
              <td className="tbl-cell field-name">First Name</td>
              <td className="tbl-cell field-value">{data?.firstName}</td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Last Name</td>
              <td className="tbl-cell field-value">{data?.lastName}</td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Email Address</td>
              <td className="tbl-cell field-value">{data?.email}</td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Date of Birth</td>
              <td className="tbl-cell field-value">
                {data?.dataOfBirth &&
                  moment(data?.dateOfBirth, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Phone Number</td>
              <td className="tbl-cell field-value">{data?.phone}</td>
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
                    {allergies.map((i) => (
                      <li className="allergy">{i}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="edit-btn-wrap">
          <Button className="edit-btn" onClick={handleSave}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PatientDetials
