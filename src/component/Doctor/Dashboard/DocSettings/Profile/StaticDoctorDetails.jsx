import React from 'react'
import { Row, Col } from 'antd'

import TextInput from '../../../../TextInput'

function StaticDoctorDetails({ doctorDetails }) {
  const doctorName = doctorDetails ? doctorDetails.doctorName.split(' ') : ''

  return (
    <div>
      <Row>
        <Col span={12}>
          <TextInput
            label="First Name"
            value={doctorName && doctorName[0]}
            disabled
          />
        </Col>
        <Col span={12}>
          <TextInput
            label="Last Name"
            value={doctorName && doctorName[1]}
            disabled
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TextInput
            label="Registation Number"
            value={doctorDetails && doctorDetails.doctor_id}
            disabled
          />
        </Col>
        <Col span={12}>
          <TextInput
            label="Specialization"
            value={doctorDetails && doctorDetails.speciality}
            disabled
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TextInput
            label="Qualification"
            value={doctorDetails && doctorDetails.qualification}
            disabled
          />
        </Col>
        <Col span={12}>
          <TextInput
            label="Year Of Experience"
            value={doctorDetails && doctorDetails.experience.concat(' +years')}
            disabled
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TextInput
            label="Contact Number"
            value={doctorDetails && doctorDetails.number}
            disabled
          />
        </Col>
        <Col span={12}>
          <TextInput label="Email Id" value="test@softsuave.com" disabled />
        </Col>
      </Row>
    </div>
  )
}

export default StaticDoctorDetails
