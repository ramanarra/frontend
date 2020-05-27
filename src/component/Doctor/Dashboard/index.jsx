import React, { Component } from "react";
import Sidebar from "../Sidebar";
import Tab from "./Tab";
import MyDoctor from "./MyDoctors";
import Schedule from "./Schedule";
import './dashboard.scss'

class Dashboard extends Component {
  state = {
    tab: 0,
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { tab } = this.state;
    return (
      <section className="app-content doc-dashboard">
        <Sidebar />
        <section class="content-wrapper">
          <div class="dashboard-wrapper">
            <div className="tabbable-panel">
              <div className="tabbable-line">
                <Tab
                  tab={tab}
                  switchTab={(value) => this.handleChange("tab", value)}
                />
                <div className="tab-content">
                  {tab === 0 && <MyDoctor />}
                  {tab === 1 && <Schedule />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Dashboard;
