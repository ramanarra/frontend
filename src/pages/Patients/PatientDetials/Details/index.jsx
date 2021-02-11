import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'

import api, { URL } from '../../../../api'
import './style.scss'
import { dateFmt } from '../../../../components/commonFormat'

const Details = ({ params, headers }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    api.get(URL.patient.info, { params, headers }).then((res) => {
      setData(res.data)
    })
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
      </div>
    </div>
  )
}

export default Details
