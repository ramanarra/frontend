import React from 'react'
import { Tab, Tabs } from '@material-ui/core'
import SearchBar from '../../components/SearchBar'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { dateFmt } from '../../components/commonFormat'
import DateRangePicker from '../../components/DateRangePicker'
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'
import downloadIcon from '../../assets/img/excel_icon.svg'

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

  const data = useSelector(state => state.doctor.reportList)

  const returnData = () => {
    if (data.data.list.length > 0) { return data.data.list }
    else { return [] }
  }

  const exportExcel = () => {
    const data = returnData()
    const fileName = 'download'
    const exportType = 'xls'

    exportFromJSON({ data, fileName, exportType })
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
            <Tab label="Appointments Report" className="report-tab" />
            <Tab label="Amount Collection Report" className="report-tab" />
            {/* <Tab label="Doctor Empty Slots" className="report-tab" /> */}
          </Tabs>
        </div>
      </div>
      <div className="right-partition">

        {/* button for downloading the report in excel form */}
        {Boolean(data?.data?.list?.length) &&
          <div className='ExportButton' onClick={exportExcel}>
            <img src={downloadIcon} alt='export as excel' className='downloadIconImg' />
          </div>
        }
        <div className="date-filter">
          <div className="date-label">Report period:</div>
          <DateRangePicker
            value={{
              startDate: fromDate,
              endDate: toDate,
            }}
            emptyText="Click here to select the period..."
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
