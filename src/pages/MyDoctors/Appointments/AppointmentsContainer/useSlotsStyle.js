import { makeStyles } from '@material-ui/core/styles'

const useSlotsStyle = makeStyles(() => ({
  container: {
    marginLeft: 18,
    marginBottom: 10,
    height: 45,
    background: '#f9f9f9',
    backgroundColor: 'white',
  },
  box: {
    width: 138,
    height: 42,
    cursor: 'pointer',
  },
  day: {
    textAlign: 'center',
  },
  top: {
    paddingLeft: 10,
    paddingTop: 4,
    height: 24,
  },
  bottom: {
    paddingLeft: 11,
  },
  name: {
    fontSize: 11,
    paddingTop: 3,
    paddingLeft: 2,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
  schedule: {
    width: 10,
    height: 10,
    marginTop: 1,
  },
  fromTime: {
    fontSize: 9,
    paddingLeft: 2,
  },
  toTime: {
    fontSize: 9,
    paddingLeft: 5,
  },
  total: {
    fontSize: 8,
    paddingRight: 7,
  },
  radio: {
    marginTop: '-12px',
    '& svg': {
      marginRight: -5,
      width: 15,
    },
  },
  star: {
    width: 12,
    paddingBottom: 3,
  },
  singleSlot: {
    paddingTop: 8,
  },

  round: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: 'white',
    marginTop: 1,
    marginRight: 5,
    '& svg': {
      width: 8,
      height: 8,
      marginBottom: 9.2,
      marginLeft: 1.9,
    },
  },

  star: {
    width: 11,
    marginTop: -1,
  },
}))

export default useSlotsStyle
