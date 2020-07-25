import React, { useState, useEffect } from 'react'
import EditField from '../../../components/EditField'
import { useParams } from 'react-router-dom'
import useCustomFecth from '../../../hooks/useCustomFetch'
import { URL } from '../../../api'

import './style.scss'
import { Description } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import useManualFetch from '../../../hooks/useManualFetch'

const PatientDetials = (props) => {
  const { patientId } = useParams()
  const doctorKey = localStorage.getItem('docKey')
  const params = { patientId, doctorKey }
  const [patientDet] = useCustomFecth('GET', URL.patient.detials, params)
  const [handleUpdate, error, isLoading, res] = useManualFetch()
  const [data, setData] = useState(null)

  const handleSave = () =>
    handleUpdate('POST', URL.patient.update, { ...data, patientId })

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
              <td className="tbl-cell field-value">
                <EditField
                  name="firstName"
                  value={data?.firstName}
                  onSave={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Last Name</td>
              <td className="tbl-cell field-value">
                <EditField
                  name="lasName"
                  value={data?.lastName}
                  onSave={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Email Address</td>
              <td className="tbl-cell field-value">
                <EditField name="email" value={data?.email} onSave={handleChange} />
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Date of Birth</td>
              <td className="tbl-cell field-value">
                <EditField
                  name="dateOfBirth"
                  value={data?.dateOfBirth}
                  onSave={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Phone Number</td>
              <td className="tbl-cell field-value">
                <EditField name="phone" value={data?.phone} onSave={handleChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="more-desc">
          <h4 className="sub-title">Additional Details</h4>
          <div className="field-label">Description</div>
          <EditField type="textarea" />
        </div>
        <div className="allergy-list">
          <table>
            <tbody>
              <tr>
                <td className="tbl-cell field-name">Allergies List</td>
                <td className="tbl-cell field-value">
                  <EditField
                    name="firstName"
                    value={'Skin Allergy'}
                    onSave={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="save-btn-wrap">
          <Button className="save-btn" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PatientDetials
