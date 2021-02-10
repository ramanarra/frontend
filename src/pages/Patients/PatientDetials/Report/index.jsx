import React from 'react'
import useFetch from '../../../../hooks/useFetch'
import { URL } from '../../../../api'
import { dateFmt } from '../../../../components/commonFormat'
import clsx from 'clsx'
import { IconButton } from '@material-ui/core'
import { MdInsertDriveFile as FileIcon } from 'react-icons/md'
import './style.scss'

const Entry = ({ data, role }) => {
  return (
    <tr>
      <td className="cell">{data?.filename}</td>
      <td className="cell">{dateFmt(data?.reportdate)}</td>
      <td className="cell">{data?.comment}</td>
      <td className="cell">
        <a href={data?.attachment} target="_blank" download>
          <IconButton className="view-icon-btn" title="View">
            <FileIcon className="view-icon" />
          </IconButton>
        </a>
      </td>
    </tr>
  )
}

const Report = ({ params }) => {
  const { data } = useFetch({
    url: URL.patient.report,
    params,
  })

  const role = localStorage.getItem('role')

  return (
    <div className="report-list-panel">
      <div className={clsx('table-wrap')}>
        <table>
          <thead>
            <tr>
              <th className="head">File Name</th>
              <th className="head">Report Date</th>
              <th className="head">Comment</th>
              <th className="head">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {!!data?.data?.length &&
              data.data?.map((i, index) => (
                <Entry data={i} key={index} role={role} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Report
