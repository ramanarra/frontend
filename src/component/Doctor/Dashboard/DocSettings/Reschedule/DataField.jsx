import React from 'react'
import { Input } from 'antd'
import EditSave from '../../../../EditSave/index'
const DataField = (props) => {
  return (
    <span className="date-field-wrap">
      <Input
        name={`${props.name} days`}
        type="number"
        maxLength="2"
        className="date-field days-field"
        value={props.days}
        disabled={!props.edit}
        onChange={props.handleDayChange}
        addonAfter="Days"
      />
      <Input
        name={`${props.name} hrs`}
        type="number"
        maxLength="2"
        className="date-field hrs-field"
        value={props.hours}
        disabled={!props.edit}
        onChange={props.handleHrsChange}
        addonAfter="Hrs"
      />
      <Input
        name={`${props.name} mins`}
        type="number"
        maxLength="2"
        className="date-field mins-field"
        value={props.minutes}
        disabled={!props.edit}
        onChange={props.handleMinsChange}
        addonAfter="Mins"
      />
      <EditSave
        isEdit={props.edit}
        handleOnEdit={props.handleEdit}
        handleOnSave={props.handleSave}
        handleOnCancel={props.handleCancel}
        tooltipText={props.toolTip}
      />
    </span>
  )
}

export default DataField
