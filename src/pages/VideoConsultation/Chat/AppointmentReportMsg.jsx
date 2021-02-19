import clsx from 'clsx'
import React from 'react'

const Entry = ({ data, index, hasMultiple }) => {
  const { attachment, comments, filename, filetype, reportdate } = data
  return (
    <div className="rprt-entry">
      <a className="report" href={attachment} target="_blank">
        {`${hasMultiple ? `${index+1}) ` : ''}${filename}`}
      </a>
      {comments && <span className={clsx("comment", hasMultiple && 'has-index')}>( {comments} )</span>}
    </div>
  )
}

const AppointmentReportMsg = ({ text }) => {
  const { data } = text

  return (
    <div className="app-rprt-msg">
      <h3 className="title">Reports</h3>

      <div className="report-list-wrap">
        {data?.map((i, index) => (
          <Entry key={index} data={i} index={index} hasMultiple={data?.length > 1} />
        ))}
      </div>
    </div>
  )
}

export default AppointmentReportMsg
