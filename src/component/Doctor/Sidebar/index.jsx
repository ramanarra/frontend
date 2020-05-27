import React, { useState } from "react";

const Sidebar = (props) => {
  return (
    <sidebar className="app-sidebar">
      <ul id="main-menu-navigation" className="navigation navigation-main">
        <li className=" nav-item active">
          <a href="color-palette.html">
            <i className="icon-doctor menu-ic"></i>
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className=" nav-item">
          <a href="inbox.html">
            <i className="icon-patient menu-ic"></i>
            <span className="menu-title">Inbox</span>
          </a>
        </li>
        <li className=" nav-item">
          <a href="taskboard.html">
            <i className="icon-progress menu-ic"></i>
            <span className="menu-title">Task Board</span>
          </a>
        </li>
        <li className=" nav-item">
          <a href="calendar.html">
            <i className="icon-settings menu-ic"></i>
            <span className="menu-title">Calendar</span>
          </a>
        </li>
      </ul>
    </sidebar>
  );
};

export default Sidebar;
