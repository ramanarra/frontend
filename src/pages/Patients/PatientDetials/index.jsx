import React, { useState } from 'react'
import EditField from '../../WorkSchedules/EditField'

const PatientDetials = (props) => {
  const [data, setData] = useState(props?.data)

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
    <div className="patient-detials">
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
                  value={data?.lasName}
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
                <EditField name="phone" value={data?.phone} onSave={handleChange} />
              </td>
            </tr>
            <tr>
              <td className="tbl-cell field-name">Phone Number</td>
              <td className="tbl-cell field-value">
                <EditField
                  name="dateOfBirth"
                  value={data?.dateOfBirth}
                  onSave={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientDetials
