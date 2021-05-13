import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MatTooltip from '@material-ui/core/Tooltip'
import {
  Info,
  Edit,
  DeleteOutline,
  ArrowBackIos,
  ArrowForwardIos,
  AddCircleOutlineTwoTone,
} from '@material-ui/icons'
import CloseIcon from '@material-ui/icons/Close'
import classNames from 'classnames'
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded'
import eyeimage from '../../assets/img/icons/eye.svg'
import LeftArrow from '../../assets/img/left-arrow.svg'

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: '#0bb5ff',
  },
  tooltip: {
    backgroundColor: '#0bb5ff',
    fontSize: 10,
    fontFamily: 'inherit',
    fontWeight: 'normal',
    padding: 5,
  },
}))

const useStylesBootstrapMenu = makeStyles((theme) => ({
  arrow: {
    color: '#495057c2',
  },
  Toolmenu: {
    backgroundColor: '#fbfbfb',
    fontSize: 10,
    fontFamily: 'inherit',
    fontWeight: 'normal',
    padding: 5,
    color: '#da4878',
  },
}))

const useStyle = makeStyles((theme) => ({
  add_icon: {
    position: 'absolute',
    right: 15,
    fontSize: 22,
  },
  notificationImg: {
    fontSize: 17,
    color: '#a8a8a8',
  },
  editIcon: {
    fontSize: 19,
  },
  closeIcon: {
    marginLeft: 130,
    marginTop: 4,
    cursor: 'pointer',
  },
  arrowBackward: {
    width: 12,
    // marginTop: 2,
    marginLeft: 10,
    color: '#383535',
    cursor: 'pointer',
  },
  arrowForward: {
    width: 12,
    // marginTop: 2,
    color: '#383535',
    cursor: 'pointer',
  },
  leftArrow: {
    width: 20,
    cursor: 'pointer',
    paddingTop: '10px'
    /* height: '3.7%',
    marginTop: 3, */
  },
  imageUploadIcon: {},
}))

export const Tooltip = (props) => {
  const classes = useStylesBootstrap()
  return <MatTooltip arrow placement="top-start" classes={classes} {...props} />
}
export const Toolmenu = (props) => {
  const classes = useStylesBootstrapMenu()
  return <MatTooltip arrow placement="top-start" classes={classes} {...props} />
}
export const InfoTip = (props) => {
  const tooltipProps = { ...props }
  return (
    <span className={'info-tip' + (props.className ? ` ${props.className}` : '')}>
      <Tooltip {...props}>
        <Info fontSize="small" className="info-tip-icon" />
      </Tooltip>
    </span>
  )
}

export const CloseTipEnd = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <span className={classes.add_icon}>
      <Tooltip {...props}>
        <CloseIcon fontSize="small" className={classes.add_icon} />
      </Tooltip>
    </span>
  )
}

export const CloseTip = (props) => {
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <CloseIcon fontSize="small" className="info-tip-icon" />
    </Tooltip>
  )
}

export const NotificationTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }

  return (
    <span className={'info-tip' + (props.className ? ` ${props.className}` : '')}>
      <Tooltip {...props}>
        <i className={classNames('icon-notify', classes.notificationImg)}></i>
      </Tooltip>
    </span>
  )
}

export const EditTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <span className={'info-tip' + (props.className ? ` ${props.className}` : '')}>
      <Tooltip {...props}>
        <Edit fontSize="small" className={classes.editIcon} />
      </Tooltip>
    </span>
  )
}

export const UploadImageTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  delete tooltipProps.className
  return (
    <span className={'info-tip' + (props.className ? ` ${props.className}` : '')}>
      <Tooltip {...props}>
        <PhotoCameraRounded fontSize="small" className={classes.imageUploadIcon} />
      </Tooltip>
    </span>
  )
}

export const ClosedTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <CloseIcon fontSize="small" className={classes.closeIcon} />
    </Tooltip>
  )
}

export const DeleteTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <DeleteOutline fontSize="small" />
    </Tooltip>
  )
}

export const ArrowBackTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <ArrowBackIos fontSize="small" className={classes.arrowBackward} />
    </Tooltip>
  )
}

export const ArrowForwardTip = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <ArrowForwardIos fontSize="small" className={classes.arrowForward} />
    </Tooltip>
  )
}

export const ImageShow = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <img src={eyeimage} alt="View info" />
    </Tooltip>
  )
}

export const AddIcon = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <AddCircleOutlineTwoTone />
    </Tooltip>
  )
}

export const LeftCircleArrow = (props) => {
  const classes = useStyle()
  const tooltipProps = { ...props }
  return (
    <Tooltip {...props}>
      <img src={LeftArrow} className={classes.leftArrow} alt="Left Arrow" />
    </Tooltip>
  )
}
