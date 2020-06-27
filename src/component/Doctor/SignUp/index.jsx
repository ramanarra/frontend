import React, { Component } from 'react'
import TextField from '../../UIComponents/TextField'
import { Form, DatePicker, Button } from 'antd'
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import './signup.scss'

class Signup extends Component {
  state = {
    data: {
      name: null,
      phone: null,
      email: null,
      contact_data: null,
    },
    error: null,
  }

  validation = () => {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { name, phone, email, contact_data } = this.state.data
    if (!!name && !!phone && !!email && emailPattern.test(email) && !!contact_data) {
      return true
    }
    return false
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

  handleSubmit = () => {
    if (this.validation()) {
      this.props.history.push('/login')
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className="signup-container">
        <div className="logo">
          <img
            src={require('../../../assets/img/logo.png')}
            alt="VIRUJH"
            className="logo-img"
          />
        </div>
        <div className="signup-box-wrap">
          <h1 className="signup-head">Doctor/Hospital Profile Submission</h1>
          <Form className="fields">
            <TextField
              className="name-field"
              prefix={<AiOutlineUser />}
              placeholder="Full Name"
              value={data.name}
              name="name"
              onChange={this.handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
            />
            <TextField
              className="phone-field"
              prefix={<AiOutlinePhone />}
              placeholder="Phone Number"
              value={data.phone}
              name="phone"
              type="number"
              onChange={this.handleChange}
              maxLength="10"
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone',
                },
                // {
                //   min: 10,
                //   message: "Please enter a valid phone number"
                // },
                // {
                //   max: 10,
                //   message: "Please enter a valid phone number"
                // }
              ]}
            />
            <TextField
              className="email-field"
              prefix={<AiOutlineMail />}
              placeholder="Email ID"
              value={data.email}
              name="email"
              onChange={this.handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please enter your email',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
            />
            <Form.Item
              name="contact_data"
              rules={[
                {
                  required: true,
                  message: 'Please select a date for us to contact you',
                },
              ]}
            >
              <DatePicker
                className="contact-date"
                showTime={{ format: 'hh:mm' }}
                suffixIcon={null}
                allowClear={false}
                placeholder="When can we contact?"
                value={data.contact_data}
                inputReadOnly
                onOk={(e) =>
                  this.handleChange({
                    target: { value: e, name: 'contact_data' },
                  })
                }
              />
            </Form.Item>
            <Button
              className="signup-btn"
              htmlType="submit"
              type="primary"
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
            <p className="signin-btn">
              Already have an Account?
              <span onClick={() => this.props.history.push('/login')}>Sign in</span>
            </p>
          </Form>
        </div>
      </div>
    )
  }
}

export default Signup
