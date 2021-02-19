import { IconButton } from '@material-ui/core'
import React from 'react'
import { FaFileDownload as DownloadIcon } from 'react-icons/fa'

const Entry = ({ data }) => {
  const { medicine, dose, comment } = data

  return (
    <tr className="entry">
      <td>
        <div className="cell">{medicine}</div>
      </td>
      <td>
        <div className="cell">{dose}</div>
      </td>
      <td>
        <div className="cell">{comment}</div>
      </td>
    </tr>
  )
}

const Attachment = ({ url, index, hasMultiple }) => {
  const name = hasMultiple ? `Prescription-${index + 1}.pdf` : `Prescription.pdf`
  return (
    <a href={url} target="_blank" className="attachment-entry">
      <IconButton className="dwld-btn">
        <DownloadIcon className="dwld-icon" />
      </IconButton>
      <p className="name" target="_blank">
        {name}
      </p>
    </a>
  )
}

const PrescriptionMsg = ({ text }) => {
  const { data } = text

  // const attachments = data?.reduce((a, c) => {
  //   const current = a.includes(c.attachment) ? [] : [c.attachment]
  //   return [...a, ...current]
  // }, [])

  return (
    <div className="presription-msg">
      <div className="table-wrap">
        <table>
          <thead>
            <th>
              <div className="head">Medicine</div>
            </th>
            <th>
              <div className="head">Quantity/Dose</div>
            </th>
            <th>
              <div className="head">Consumption comments</div>
            </th>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <Entry key={index} data={i} />
            ))}
          </tbody>
        </table>

        <p className="note-msg">NOTE: You can find the PDF of prescription in a appointment details page</p>

        {/* <div className="attachments">
          {attachments?.map((i, index) => (
            <Attachment
              key={index}
              url={i}
              index={index}
              hasMultiple={attachments.length > 1}
            />
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default PrescriptionMsg
