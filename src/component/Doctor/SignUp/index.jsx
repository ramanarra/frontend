import React, { Component } from "react";
import TextField from "../../UIComponents/TextField";

class Signup extends Component {
  state = {
    data: {
      name: null,
      ph: null,
      email: null,
      contact_data: null,
    },
  };
  render() {
      const { data } = this.state
    return (
      <div className="signup-container">
        <div className="logo">
          <img
            src={require("../../../assets/img/logo.png")}
            alt="VIRUJH"
            className="logo-img"
          />
        </div>
        <div className="signup-box-wrap">
            <h1 className="signup-head">
                Doctor/Hospital Profile Submission
            </h1>
            <form className="fields">
                <TextField value={data.name} />
            </form>
        </div>
      </div>
    );
  }
}

export default Signup;
