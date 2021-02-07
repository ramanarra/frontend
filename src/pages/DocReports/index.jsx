import React from 'react'
import { URL } from '../../api'
import useFetch from '../../hooks/useFetch'
import { dateFmtWthOutTimeZone } from '../../components/commonFormat'
import moment from 'moment'
import './styles.scss'
import NoReport from './NoReport'

const Entry = ({ data, key, role }) => {
  return (
    <tr>
      {role === 'ADMIN' && 
      <td className="cell">{data?.doctorName}</td>
      }
      <td className="cell">{data?.patientName}</td>
      <td className="cell">{dateFmtWthOutTimeZone(data?.createdTime)}</td>
      <td className="cell">{dateFmtWthOutTimeZone(data?.appointment_date)}</td>
      <td className="cell">{data?.phone}</td>
      <td className="cell">
        {data?.amount} {data?.amount && <span className="currency">INR</span>}
      </td>
    </tr>
  )
}

const DocReports = React.memo(({ filter, handleFilter, pathType, tab }) => {
  //prettier-ignore
  
  // Based on role doctor name will disply
  const role = localStorage.getItem('role')

  let { searchText, fromDate, toDate, paginationStart, paginationLimit } = filter[tab]
  const isCollection = tab === 1

  const url = isCollection ? URL.docReport.collection : URL.docReport.list

  // Formatting date
  fromDate = (fromDate ? moment(fromDate).format('YYYY-MM-DD') : null);
  toDate = (toDate ? moment(toDate).format('YYYY-MM-DD') : null);

  const { handleFetch, data } = useFetch(
    {
      url,
      params: {
        paginationStart,
        paginationLimit,
        searchText,
        fromDate,
        toDate,
      },
    },
    [searchText, fromDate, toDate, paginationLimit, paginationStart, tab]
  )

  return (
    <div className="report-list-panel">
      <table>
        <thead>
          <tr>
            {role === 'ADMIN' && 
            <th className="head">Doctor name</th>
            }
            <th className="head">Patient name</th>
            <th className="head">Booked date</th>
            <th className="head">Appointment date</th>
            <th className="head">Phone number</th>
            <th className="head">Amount</th>
          </tr>
        </thead>
        <tbody>
          {!!data?.data?.list?.length && data.data?.list.map((i, index) => <Entry data={i} key={index} role={role}/>)}
        </tbody>
      </table>
      {!data?.data?.list?.length && <NoReport />}
    </div>
  )
})

export default DocReports