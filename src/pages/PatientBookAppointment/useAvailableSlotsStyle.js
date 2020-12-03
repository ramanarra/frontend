import { makeStyles } from '@material-ui/core/styles'

const useAvailableSlotsStyle = makeStyles(() => ({
  availableSlots: {
    marginTop: 120,
    paddingLeft: 20,
    height: 305,
    overflowY: 'auto',
  },
  time: {
    width: 100,
    border: '1.5px solid #dadada',
    marginLeft: 13,
    marginBottom: 15,
    borderRadius: 3,
    '&:hover': {
      backgroundColor: '#54cbff',
      border: '1.5px solid #54cbff',
    },
  },
  timeText: {
    fontSize: 12.3,
    paddingTop: 2,
    color: '#6a6969',
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedTab: {
    backgroundColor: '#0bb5ff',
    border: '1.5px solid #0bb5ff',
  },
  selectedText: {
    color: '#ffffff',
    fontSize: 13,
    paddingTop: 2,
  },
  icon: {
    width: 16,
    color: '#ffffff',
    marginLeft: 6,
  },
  errorMessage: {
    color:  '#ff0023',
    position: 'absolute',
    top: '45%',
    right: '11%',
  },
}))

export default useAvailableSlotsStyle
