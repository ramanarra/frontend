import React, { useState } from 'react'
import { Input, Row, Col } from 'antd'

import useSaveDoctorConfig from '../../../hooks/useSaveDoctorConfig'
import EditSave from '../../../../EditSave'

function ConsulationBaseFees({ configDetails, reFetch, docKey }) {
  const [editConsultationBaseFees, setEditConsultationBaseFees] = useState(false)

  const [consultationBaseFees, setConsultationBaseFees] = useState(
    configDetails.consultationCost
  )

  const [handleOnSaveDoctorConfig] = useSaveDoctorConfig()

  const handleOnBaseFeesEdit = () => {
    setEditConsultationBaseFees(!editConsultationBaseFees)
  }

  const handleOnBaseFeesSave = () => {
    if (
      configDetails &&
      (configDetails.consultationCost === consultationBaseFees ||
        consultationBaseFees == '')
    ) {
      return
    }
    const params = {
      doctorKey: docKey,
      consultationCost: consultationBaseFees,
    }

    handleOnSaveDoctorConfig(params)
    setEditConsultationBaseFees(false)
    reFetch()
  }

  const handleOnBaseFeesCancel = () => {
    setConsultationBaseFees(configDetails.consultationCost)
    setEditConsultationBaseFees(false)
  }

  const addToolTipText = () => {
    if (configDetails && configDetails.consultationCost === consultationBaseFees) {
      return 'you have not made any changes'
    }

    return ''
  }

  const handleOnBaseFeesChange = (event) => {
    setConsultationBaseFees(event.target.value)
  }

  return (
    <Row>
      <Col span={12}>
        <p style={{ marginBottom: '0.4em' }}>
          <span className="font-styles">Consultation Base Fees</span>
        </p>
        <Input
          style={{ width: 'calc(94% + 37px)', paddingBottom: '7px' }}
          addonAfter={
            <EditSave
              isEdit={editConsultationBaseFees}
              handleOnEdit={handleOnBaseFeesEdit}
              handleOnSave={handleOnBaseFeesSave}
              handleOnCancel={handleOnBaseFeesCancel}
              tooltipText={addToolTipText()}
            />
          }
          name="fees"
          id="consultationBaseFees"
          className="set-field fees-field"
          prefix="INR"
          type="number"
          value={consultationBaseFees}
          disabled={!editConsultationBaseFees}
          placeholder="Fees"
          onChange={handleOnBaseFeesChange}
        />
      </Col>
    </Row>
  )
}

export default ConsulationBaseFees
