import React, { Component } from 'react'
import { Input } from 'antd'
import { MdEdit } from 'react-icons/md'
import { GoCheck } from 'react-icons/go'
import './settings.scss'

class Settings extends Component {
  state = {
    data: {
      name: 'Amrit Meddcare Pvt. Ltd.',
      address: {
        street: '#89, Peddu naicken street',
        landmark: 'Near Knondithope Market',
        city: 'Chennai, Tamilnadu',
        country: 'India',
        zipcode: '600079',
      },
      phone: 1234567890,
      email: `amritmedicare@gmail.com`,
      profile: require('../../assets/img/med.png'),
      discount: 0,
    },
    edit: {
      name: false,
      street: false,
      landmark: false,
      city: false,
      country: false,
      zipcode: false,
      phone: false,
      email: false,
      profile: false,
      discount: false,
    },
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

  handleAddrChange = (e) => {
    const { name, value } = e.target
    this.setState((prev) => {
      return {
        data: {
          ...prev.data,
          address: {
            ...prev.data.address,
            [name]: value,
          },
        },
      }
    })
  }

  handleEdit = (name) => {
    this.setState((prev) => {
      return {
        edit: {
          ...prev.edit,
          [name]: !prev.edit[name],
        },
      }
    })
  }

  render() {
    const { name, address, phone, email, profile, discount } = this.state.data
    const { edit } = this.state

    const editBtn = (name) => (
      <span
        className={'ctrl-btn ' + (this.state.edit[name] ? 'done-btn' : 'edit-btn')}
        onClick={this.handleEdit.bind(this, name)}
      >
        {this.state.edit[name] ? <GoCheck /> : <MdEdit />}
      </span>
    )

    return (
      <div className="settings-wrap">
        <h1 className="settings-head">Hospital Settings</h1>
        <div className="settings-area">
          <div className="profile">
            <img src={profile} alt={name} />
          </div>
          <div className="fields">
            <div className="set-inputs">
              <Input
                name="name"
                className="set-field name-field"
                value={name}
                size="large"
                disabled={!edit.name}
                addonAfter={editBtn('name')}
                placeholder="Name"
                onChange={this.handleChange}
              />
              <Input
                name="street"
                className="set-field street-field"
                value={address.street}
                size="large"
                disabled={!edit.street}
                addonAfter={editBtn('street')}
                placeholder="Street Name"
                onChange={this.handleAddrChange}
              />
              <Input
                name="landmark"
                className="set-field land-field"
                value={address.landmark}
                size="large"
                disabled={!edit.landmark}
                addonAfter={editBtn('landmark')}
                placeholder="Landmark"
                onChange={this.handleAddrChange}
              />
              <Input
                name="city"
                className="set-field city-field"
                value={address.city}
                size="large"
                disabled={!edit.city}
                addonAfter={editBtn('city')}
                placeholder="City"
                onChange={this.handleAddrChange}
              />
              <Input
                name="country"
                className="set-field country-field"
                value={address.country}
                size="large"
                disabled={!edit.country}
                addonAfter={editBtn('country')}
                placeholder="Country"
                onChange={this.handleAddrChange}
              />
              <Input
                name="zipcode"
                className="set-field zip-field"
                value={address.zipcode}
                size="large"
                disabled={!edit.zipcode}
                addonAfter={editBtn('zipcode')}
                placeholder="Pincode"
                onChange={this.handleAddrChange}
              />
              <Input
                name="phone"
                className="set-field phone-field"
                value={phone}
                size="large"
                disabled={!edit.phone}
                addonAfter={editBtn('phone')}
                placeholder="Phone number"
                onChange={this.handleChange}
              />
              <Input
                name="email"
                className="set-field email-field"
                value={email}
                size="large"
                disabled={!edit.email}
                addonAfter={editBtn('email')}
                placeholder="Email address"
                onChange={this.handleChange}
              />
            </div>
            <p className="set-discount">
              Discount for new Patient First Consultancy{' '}
              <span className="value">
                <Input
                  name="discount"
                  className="discount-field"
                  value={discount}
                  disabled={!edit.discount}
                  addonAfter={editBtn('discount')}
                  onChange={this.handleChange}
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
