import React from 'react'
import { Modal, Button } from 'antd'

const AvailabilityDialog = ({ display, onClose }) => {
  return (
    <Modal visible={display} onCancel={onClose}>
      <div className="availability-dlg">
        <h3 className="dlg-head">Edit Availablility</h3>
        <div className="availability">
          <div className="slots-wrap"></div>
          <span className="new-interval">+ New Interval</span>
        </div>
        <div className="ctrl-btns">
          <Button className="apply-btn">Apply to all</Button>
          <Button className="cncl-btn">Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AvailabilityDialog
