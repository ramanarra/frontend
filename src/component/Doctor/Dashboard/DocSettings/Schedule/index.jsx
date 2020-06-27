import React, { Component } from 'react'
import { MdEdit } from 'react-icons/md'
import { Switch, DatePicker } from 'antd'
import moment from 'moment'
import './schedule.scss'
import AvailabilityDialog from './Dialogs/AvailabilityDialog'

class Schedule extends Component {
  state = {
    date_edit: false,
    booking_edit: false,
    avail_dlg: {
      status: false,
      slots: null,
    },
    data: {
      session_time: 35,
      date_range: 7,
      add_booking: false,
      tot_booking: 10,
      pay_type: 'hrs',
      schedule: {
        monday: ['2:00 - 3:00'],
        thusday: ['2:00 - 3:00', '4:00 - 5:00'],
      },
    },
    week: null,
  }

  componentDidMount = () => {
    const today = new Date()
    const this_week = moment(today, 'W')
    this.setState({
      week: this_week,
    })
  }

  openDlg = (name, value) => {
    this.setState({
      [name]: {
        status: true,
        slots: value,
      },
    })
  }

  closeDlg = (name) => {
    this.setState({
      [name]: {
        status: false,
        slots: null,
      },
    })
  }

  handleDateChange = (date) => {
    const week = moment(date, 'w')
    this.setState({ week })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState((prev) => {
      return {
        data: {
          ...prev.data,
          [name]: value,
        },
      }
    })
  }

  render() {
    const { data, week, avail_dlg } = this.state
    const week_days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thusday',
      'friday',
      'saturday',
    ]

    const EditBtn = (name) => (
      <span className="edit-btn" onClick={this.openDlg.bind(this, name)}>
        <MdEdit />
      </span>
    )

    const values = (name, value) => {
      return {
        target: { name, value },
      }
    }

    const activeBox = (name, value) => {
      if (value !== -1) {
        return data[name] === value ? ' active' : ''
      } else {
        const listSet = [15, 30, 45, 60]
        return listSet.includes(data[name]) ? '' : ' active'
      }
    }

    const dispDate = moment(week).format('MMM, YYYY')

    return (
      <div className="doc-setting-schedule">
        <h1 className="schedule-head">Work Schedules</h1>
        <div className="session-time">
          <h3 className="session-head sch-sub-head">Consultation Session Timing</h3>
          <div className="timer-fields">
            <div
              className={'timer-box' + activeBox('session_time', 15)}
              onClick={this.handleChange.bind(this, values('session_time', 15))}
            >
              15 minutes
            </div>
            <div
              className={'timer-box' + activeBox('session_time', 30)}
              onClick={this.handleChange.bind(this, values('session_time', 30))}
            >
              30 minutes
            </div>
            <div
              className={'timer-box' + activeBox('session_time', 45)}
              onClick={this.handleChange.bind(this, values('session_time', 45))}
            >
              45 minutes
            </div>
            <div
              className={'timer-box' + activeBox('session_time', 60)}
              onClick={this.handleChange.bind(this, values('session_time', 60))}
            >
              60 minutes
            </div>
            <div
              className={
                'timer-box custom-timer-box' + activeBox('session_time', -1)
              }
              onChange={this.handleChange}
            >
              {data.session_time < 61 &&
              data.session_time % 15 === 0 &&
              document.activeElement.className.includes('custom-timer-box') ? (
                <input
                  name="session_time"
                  className="custom-time-input"
                  type="number"
                  placeholder="Custom minutes"
                  value=""
                />
              ) : (
                <input
                  name="session_time"
                  className="custom-time-input"
                  type="number"
                  placeholder="Custom minutes"
                  value={data.session_time}
                />
              )}
            </div>
          </div>
        </div>
        <div className="date-range">
          <h3 className="sch-sub-head date-head">Date Range</h3>
          <p>
            Availablity can be scheduled over{' '}
            <span className="field-value">7 rolling days</span>
            {EditBtn('date_edit')}
          </p>
        </div>
        <div className="add-booking">
          <h3 className="add-book-head sch-sub-head">
            Add overbooking
            <span className="toggle">
              <Switch />
            </span>
          </h3>
          <div className="booking-fields">
            Total overbooking allowed <span className="field-value">10</span>
            {EditBtn('booking_edit')}
            <span className="pay-type">
              <div
                className={'timer-box' + activeBox('pay_type', 'hrs')}
                onClick={this.handleChange.bind(this, values('pay_type', 'hrs'))}
              >
                Per Hour
              </div>
              <div
                className={'timer-box' + activeBox('pay_type', 'day')}
                onClick={this.handleChange.bind(this, values('pay_type', 'day'))}
              >
                Per Day
              </div>
            </span>
          </div>
        </div>
        <div className="schedule-calender">
          <div className="calender-head">
            <span className="month-year">{dispDate}</span>
            <span className="date-picker">
              <DatePicker
                value={week}
                onChange={this.handleDateChange}
                picker="week"
                allowClear={false}
                format={'MMM'}
              />
            </span>
            <div className="ctrl-btns">
              <span className="back-btn"></span>
              <span className="next-btn"></span>
            </div>
          </div>
          <div className="calender-wrap">
            <table className="table">
              <thead>
                <tr>
                  {week_days.map((i) => (
                    <th className="table-head">{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {week_days.map((i) => (
                    <td
                      className="table-cell"
                      onClick={this.openDlg.bind(
                        this,
                        'avail_dlg',
                        data.schedule[i]
                      )}
                    >
                      <div className="appointments">
                        {data.schedule[i]?.map((s) => (
                          <div className="slot-wrap">
                            <span className="slot">{s}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <AvailabilityDialog
          display={avail_dlg.status}
          slots={avail_dlg.slots}
          onClose={this.closeDlg.bind('avail_dlg')}
        />
      </div>
    )
  }
}

export default Schedule
