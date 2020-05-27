import React, { Component } from "react";
import Sidebar from "../Sidebar";
import Tab from "./Tab";
import MyDoctor from "./MyDoctors";

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
      <section class="app-content">
        <Sidebar />
        <div className="tabbable-panel">
          <div className="tabbable-line">
            <Tab tab={tab} switchTab={ value => this.handleChange('tab', value)} />
            <div class="tab-content">
                {tab === 0 && <MyDoctor/>}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
