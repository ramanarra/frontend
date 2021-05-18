import { makeStyles } from '@material-ui/core/styles'

const useLeaveCallStyle = makeStyles(() => ({
  icon: {
    textAlign: 'end',
  },
  closeIcon: {
    cursor: 'pointer',
    marginRight: -12,
    color: '#a8a8a8',
  },
  text: {
    fontSize: 22,
    color: '#4f4f4f',
    textAlign: 'center'
  },
  buttons: {
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  cancelButton: {
    padding: '2px 15px',
    borderRadius: 20,
    backgroundColor: '#e1e0e0',
    marginRight: 15,
    cursor: 'pointer',
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#a8a8a8',
  },
  pauseButton: {
    padding: '2px 15px',
    borderRadius: 20,
    border: '1px solid #0bb5ff',
    marginRight: 15,
    cursor: 'pointer',
    marginLeft:15,
  },
  pauseText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#0bb5ff',
    marginLeft:'15px'
  },
  confirmButton: {
    padding: '2px 15px',
    borderRadius: 20,
    backgroundColor: '#0eabff',
    cursor: 'pointer',
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f7f7f7',
  },
}))

export default useLeaveCallStyle
