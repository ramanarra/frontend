import React from "react";

const Tab = (props) => {
  return (
    <div className="tab-header" style={{paddingTop: '10px', marginRight: '10px'}}>
      <div className="left-wrapper">
        <ul className="nav nav-tabs ">
          <li
            className={props.tab === 0 ? "active" : "inactive"}
            onClick={props.switchTab.bind(this, 0)}
          >
            <a>
              <i className="icon-doctor tab-ic"></i>
              My Doctors{" "}
            </a>
          </li>
          <li
            className={props.tab === 1 ? "active" : "inactive"}
            onClick={props.switchTab.bind(this, 1)}
          >
            <a>
              <i className="icon-calendar tab-ic"></i>
              Appointments{" "}
            </a>
          </li>
        </ul>
      </div>
      <div className="right-wrapper">
        <div className="search-wrap">
          <input
            type="search"
            placeholder="Search Doctors.."
            className="search-ip"
          />
          <div className="search-ic doc-nav-icon-wrap">
            <i className="icon-search doc-nav-icon" style={{fontSize: '10px'}}></i>
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
      </div>
    </div>
  );
};

export default Tab;
