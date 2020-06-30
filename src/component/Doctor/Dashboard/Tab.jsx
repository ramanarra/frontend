import React, { Fragment } from 'react'

const Tab = (props) => {
  const { tab, switchTab } = props
  return (
    <div className="tab-header">
      <div className="left-wrapper">
        <ul className="nav nav-tabs ">
          <li
            className={tab === 0 ? 'active' : 'inactive'}
            onClick={() => switchTab(0)}
          >
            <a>
              <i className="icon-doctor tab-ic"></i>
              My Doctors{' '}
            </a>
          </li>
          <li
            className={tab === 1 ? 'active' : 'inactive'}
            onClick={() => switchTab(1)}
          >
            <a>
              <i className="icon-calendar tab-ic"></i>
              Appointments{' '}
            </a>
          </li>
        </ul>
      </div>
      <div className="right-wrapper">
        {tab === 0 ? (
          <Fragment>
            <div className="search-wrap">
              <input
                type="search"
                placeholder="Search Doctors.."
                className="search-ip"
              />
              <div className="search-ic doc-nav-icon-wrap">
                <i
                  className="icon-search doc-nav-icon"
                  style={{ fontSize: '10px' }}
                ></i>
              </div>
            </div>
            <div className="view-wrap doc-nav-icon-wrap">
              <i className="icon-view doc-nav-icon"></i>
            </div>
            <div className="filter-wrap doc-nav-icon-wrap">
              <i className="icon-filter doc-nav-icon"></i>
            </div>
            <div className="menu-wrap doc-nav-icon-wrap">
              <i className="icon-dot-menu doc-nav-icon"></i>
            </div>
          </Fragment>
        ) : (
          <div className="search-wrap">
            <input
              type="search"
              placeholder="Search Doctors.."
              className="search-ip"
            />
            <div className="search-ic doc-nav-icon-wrap">
              <i
                className="icon-search doc-nav-icon"
                style={{ fontSize: '10px' }}
              ></i>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tab
