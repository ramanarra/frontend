import React from 'react'
import { Input, Form } from 'antd'
import './textfield.scss'

// type Props = {
//   className: String,
//   name: String,
//   value: String,
//   onChange: String,
//   placeholder: String,
//   label: String,
//   addonBefore: String,
//   addonAfter: String,
//   prefix: String,
//   postfix: String,
//   size: 'small' | 'large',
//   type: 'text' | 'number' | 'password' | 'password-wicon',
//   hasFeedback: Boolean,
//   rules: Array,
//   maxLength: Number,
//   inputProps: Object,
//   error: Boolean,
// }

const TextField = ({
  className,
  name,
  value,
  onChange,
  placeholder,
  label,
  addonBefore,
  addonAfter,
  prefix,
  postfix,
  size,
  type = 'text',
  rules,
  hasFeedback,
  error,
  maxLength,
  inputProps,
}) => {
  const isError = error ? 'error' : undefined
  const handleChange = (e) => {
    if (!!maxLength) {
      if (e.target.value?.length <= parseInt(maxLength)) {
        onChange(e)
      }
    } else {
      onChange(e)
    }
  }

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      hasFeedback={hasFeedback}
      validateStatus={isError}
    >
      {type !== 'password-wicon' ? (
        <Input
          name={name}
          className={'txt-field' + (className ? ` ${className}` : '')}
          size={size}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          prefix={prefix}
          postfix={postfix}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          type={type}
          maxLength={maxLength}
          {...inputProps}
        />
      ) : (
        <Input.Password
          name={name}
          className={className}
          size={size}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          prefix={prefix}
          postfix={postfix}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          {...inputProps}
        />
      )}
    </Form.Item>
  )
}

export default TextField
