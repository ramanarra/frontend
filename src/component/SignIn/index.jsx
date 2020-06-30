import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdMailOutline, MdLockOutline } from 'react-icons/md'
import { Form, Button, Card } from 'antd'

import Api from '../../api'
import TextField from '../UIComponents/TextField'
import { paths } from '../../config'
import logo from '../../assets/img/logo.png'
import './signin.scss'

const SignIn = (props) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState({
    status: false,
    msg: null,
    type: null,
  })

  useEffect(() => {
    if (error) {
      setError({
        status: false,
        msg: null,
        type: null,
      })
    }
  }, [username, password])

  const handleSubmit = () => {
    const credentials = {
      email: username,
      password: password,
    }

    Api.post('auth/doctorLogin', credentials)
      .then((res) => {
        const { data } = res
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('role', data.role)
        localStorage.setItem('docKey', data.doctorKey)
        localStorage.setItem('accountKey', data.accountKey)
        props.history.push(paths.hospital.dashboard)
      })
      .catch(() => {
        setError({
          status: true,
          msg: 'Invalid Password or Email',
          type: 'error',
        })
      })
  }

  return (
    <div className="signin-container">
      <div className="logo">
        <img src={logo} alt="VIRUJH" className="logo-img" />
      </div>
      <Card className="signin-box-wrap">
        <div className="signin-box">
          <h1 className="signin-head">Login into your virujh account</h1>
          <Form className="fields">
            <div className="username-field-wrap field-wrap">
              <TextField
                className="user-field"
                prefix={<MdMailOutline />}
                placeholder="Enter Your Email"
                value={username}
                name="username"
                error={error.status}
                onChange={(e) => setUsername(e.target.value)}
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
            </div>
            <div className="password-field-wrap field-wrap">
              <TextField
                className="pass-field"
                type="password-wicon"
                prefix={<MdLockOutline />}
                placeholder="Enter Your Password"
                value={password}
                name="password"
                error={error.status}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                ]}
              />
              <a className="forgot-password">Forgot Password?</a>
            </div>
            <div className="submit-btn-wrap">
              {error.msg && (
                <p className={`error-status ${error.type}`}>{error.msg}</p>
              )}
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Login
              </Button>
              <p className="sign-up-wrap">
                I am new?{' '}
                <Link to="/doctor/signup" className="sign-up">
                  Signup
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  )
}

export default SignIn
