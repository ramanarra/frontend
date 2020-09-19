import { makeStyles } from '@material-ui/core/styles'

const useSideBarStyle = makeStyles(() => ({
  topBar: {
    width: '23%',
    height: 60,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
  groupIcon: {
    width: 26,
    marginLeft: 53,
    marginRight: 50,
    cursor: 'pointer',
    marginTop: 3,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },
  icon: {
    marginTop: 8,
    marginLeft: 12,
    color: '#a8a8a8',
  },
  chatIcon: {
    width: 30,
    marginLeft: 44,
    marginRight: 40,
    cursor: 'pointer',
    marginTop: 7,
  },
  tabIcon: {
    width: 28,
    marginLeft: 30,
    cursor: 'pointer',
    marginTop: 21,
  },
  icons: {
    display: 'flex',
  },
  groupIconHeader: {
    width: 125,
    borderRight: '1px solid #d9d6d6',
    marginTop: 13,
  },
  chatIconHeader: {
    width: 120,
    borderRight: '1px solid #d9d6d6',
    marginTop: 13,
  },
}))

export default useSideBarStyle
