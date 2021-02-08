import React, { useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import Header from './Header'
import { useHistory, useParams } from 'react-router-dom'
import DocReports from '../../pages/DocReports'
import DocFreeSlots from '../../pages/DocFreeSlots'

import './style.scss'

const DocReport = React.memo(() => {
  const [tab, switchTab] = useState(0)
  const history = useHistory()
  const { pathType } = useParams()

  //panel path name
  const panels = ['list', 'collection', 'emptyslots']

  // filter for all three screens ----------------------
  const initFilter = {
    searchText: '',
    paginationStart: 0,
    paginationLimit: 15,
    fromDate: null,
    toDate: null,
  }
  const [filter, setFilter] = useState({
    0: initFilter,
    1: initFilter,
    2: initFilter,
  })

  const handleFilter = (e) => {
    const { value, name } = e.target

    if (name === 'searchText') {
      setFilter((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [name]: value,
          paginationStart: 0,
        },
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [name]: value,
        },
      }))
    }
  }

  //  -----------------------------------------------------

  //   set tab based on path initally
  useEffect(() => {
    const path = pathType ?? panels[0]
    const currentTab = panels.indexOf(path)
    switchTab(currentTab >= 0 ? currentTab : 0)
  }, [])

  //   change path based on tab
  useEffect(() => {
    history.push(`/reports/${panels[tab]}`)
  }, [tab])

  const allyProps = { tab, switchTab, filter, handleFilter, pathType, panels }

  return (
    <div className="doc-report-pg-wrap">
      <Paper className="card" elevation={0}>
        <Header {...allyProps} />
        <div className="panel-wrap">
          {pathType.includes(panels[2]) ? (
            <DocFreeSlots {...allyProps} />
          ) : (
            <DocReports {...allyProps} />
          )}
        </div>
      </Paper>
    </div>
  )
})

export default DocReport
