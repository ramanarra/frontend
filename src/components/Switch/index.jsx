import { Switch as MatSwitch, withStyles } from '@material-ui/core'

const Switch = withStyles((theme) => ({
  root: {
    width: 40,
    height: 20,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    top: 1.5,
    left: 1,
    padding: 1.5,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(20px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 14,
    height: 14,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.grey[500],
  },
  checked: {},
}))(MatSwitch)

export default Switch
