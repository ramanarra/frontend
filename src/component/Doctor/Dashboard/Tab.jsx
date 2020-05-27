import React from "react";

const Tab = (props) => {
  return (
    <div className="tab-header">
      <div className="left-wrapper">
        <ul className="nav nav-tabs ">
          <li className="active">
            <a onClick={props.switchTab.bind(this, 0)}>
              <i className="icon-doctor tab-ic"></i>
              My Doctors{" "}
            </a>
          </li>
          <li>
            <a onClick={props.switchTab.bind(this, 1)}>
              <i className="icon-calendar tab-ic"></i>
              Scheduled Events{" "}
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
          <div className="search-ic">
            <i className="icon-search"></i>
          </div>
        </div>
        <div className="view-wrap">
          <i className="icon-view"></i>
        </div>
        <div className="filter-wrap">
          <i className="icon-filter"></i>
        </div>
        <div className="menu-wrap">
          <i className="icon-dot-menu"></i>
        </div>
      </div>
    </div>
  );
};

export default Tab;
