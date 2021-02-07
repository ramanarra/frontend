import React from 'react'
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from '@material-ui/core'
import { Cancel, Visibility, VisibilityOff, Star } from '@material-ui/icons'
import './style.scss'

const Textfield = ({
  className,
  placeholder,
  label,
  value,
  name,
  type,
  onChange,
  prefix,
  suffix,
  clear,
  error,
  hasValidation,
  inputProps,
  isRequired,
  matLabel,
  ...rest
}) => {
  const [textType, setType] = React.useState(type || 'text')
  const labelStatus = !!label ? ' with-label' : ''
  const errorStatus = hasValidation ? ' with-error' : ''

  const handleClear = () => {
    onChange({
      target: {
        name,
        value: '',
      },
    })
  }

  const toggleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'))
  }

  const suffixElement = () => {
    if (clear && !suffix && !!value) {
      return (
        <InputAdornment position="end">
          <IconButton className="clr-btn" onClick={handleClear} edge="end">
            <Cancel />
          </IconButton>
        </InputAdornment>
      )
    } else if (!!suffix) {
      return <InputAdornment position="end">{suffix}</InputAdornment>
    } else if (!suffix && !!value && type?.toLowerCase() === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton className="pass-rvl-btn" onClick={toggleType} edge="end">
            {textType === 'text' ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    } else {
      return null
    }
  }

  return (
    <div className={'txt-field-wrap' + labelStatus + errorStatus}>
      <FormControl
        className={'txt-field' + (!!className ? ` ${className}` : '')}
        variant="outlined"
        size="small"
      >
        {!!label && (
          <div className="txt-label-wrap">
            <label className="txt-field-label">{label}</label>
            {isRequired && <Star className="star-icon" />}
          </div>
        )}
        {!!matLabel && <InputLabel>{matLabel}</InputLabel>}
        <OutlinedInput
          className="txt-field-inp"
          placeholder={placeholder}
          value={value}
          name={name}
          type={textType}
          onChange={onChange}
          inputProps={inputProps}
          startAdornment={
            !!prefix && <InputAdornment position="start">{prefix}</InputAdornment>
          }
          endAdornment={suffixElement()}
          {...rest}
        />
      </FormControl>
      {!!error && <label className="txt-field-error err-msg">{error}</label>}
    </div>
  )
}

export default Textfield
