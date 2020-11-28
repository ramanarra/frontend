import { makeStyles } from '@material-ui/core/styles'

const useToolBarStyle = makeStyles(() => ({
  root: {
    position: 'fixed',
    zIndex: 5,
    left: '36.5%',
    top: '85%',
  },

  rootForFullScreen: {
    position: 'fixed',
    zIndex: 5,
    left: '33.5%',
    top: '85%',
  },

  iconButton: {
    marginLeft: 30,
    background: '#ffffff',
    width: 60,
    height: 60,
    '&:hover': {
      background: '#ffffff',
    },
  },

  videoIcon: {
    width: 27,
    height: 27,
  },

  addIcon: {
    width: 32,
    height: 32,
    marginLeft: 3,
  },

  topBar: {
    width: 355,
    height: 60,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '3px',
    right: '0px',
  },
  groupIcon: {
    fontSize: 44,
    marginLeft: 30,
    cursor: 'pointer',
    marginTop: 5,
    color: '#908e8e',
  },
}))

export default useToolBarStyle
