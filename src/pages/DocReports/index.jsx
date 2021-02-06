import React from 'react'
import { URL } from '../../api'
import useFetch from '../../hooks/useFetch'
import { dateFmt } from '../../components/commonFormat'

import './styles.scss'
import NoReport from './NoReport'

const Entry = ({ data }) => {
  return (
    <tr>
      <td className="cell">{data?.name}</td>
      <td className="cell">{dateFmt(data?.createdTime)}</td>
      <td className="cell">{dateFmt(data?.appointment_date)}</td>
      <td className="cell">{data?.phone}</td>
      <td className="cell">
        {data?.amount} <span className="currency">INR</span>
      </td>
    </tr>
  )
}

const DocReports = React.memo(({ filter, handleFilter, pathType, tab }) => {
  //prettier-ignore
  const { searchText, fromDate, toDate, paginationStart, paginationLimit } = filter[tab]
  const isCollection = tab === 1

  const url = isCollection ? URL.docReport.collection : URL.docReport.list
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

  // const data = [
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  //   {
  //     appointment_date: new Date(),
  //     patient_id: 4,
  //     createdTime: new Date(),
  //     name: 'asdfasdfa',
  //     phone: 8687686,
  //     amount: 234,
  //     slotTiming: 60,
  //   },
  // ]

  return (
    <div className="report-list-panel">
      <table>
        <thead>
          <tr>
            <th className="head">Patient name</th>
            <th className="head">Booked date</th>
            <th className="head">Appointment date</th>
            <th className="head">Phone number</th>
            <th className="head">Amount</th>
          </tr>
        </thead>
        <tbody>
          {!!data?.length && data.map((i, index) => <Entry data={i} key={index} />)}
        </tbody>
      </table>
      {!data?.length && <NoReport />}
    </div>
  )
})

export default DocReports
