import React from 'react'
import { Tab, Tabs } from '@material-ui/core'
import SearchBar from '../../components/SearchBar'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { dateFmt } from '../../components/commonFormat'
import DateRangePicker from '../../components/DateRangePicker'

const Header = ({ tab, switchTab, filter, handleFilter }) => {
  const { searchText, fromDate, toDate } = filter[tab]

  const handleDate = (e) => {
    handleFilter({
      target: {
        name: 'fromDate',
        value: e.startDate,
      },
    })
    handleFilter({
      target: {
        name: 'toDate',
        value: e.endDate,
      },
    })
  }

  return (
    <div className="header-wrap">
      <div className="left-partition">
        <div className="tab-wrap">
          <Tabs
            className="report-tab-switcher"
            value={tab}
            onChange={(e, value) => switchTab(value)}
          >
            <Tab label="Appointment List" className="report-tab" />
            <Tab label="Appointment Collection" className="report-tab" />
            <Tab label="Doctor Empty Slots" className="report-tab" />
          </Tabs>
        </div>
      </div>
      <div className="right-partition">
        <div className="date-filter">
          <div className="date-label">Report period:</div>
          <DateRangePicker
            value={{
              startDate: fromDate,
              endDate: toDate,
            }}
            setChange={handleDate}
          />
        </div>
        {tab !== 2 && (
          <div className="search-wrap">
            <SearchBar
              label="Search"
              value={searchText}
              name="searchText"
              onChange={handleFilter}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
