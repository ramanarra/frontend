import { makeStyles } from '@material-ui/core/styles'

const useListStyle = makeStyles(() => ({
  container: {
    marginLeft: '1.5%',
    marginBottom: 10,
    marginRight: '0.9%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    width: '11.8%'
  },
  dateContainer: {
    width: '100%',
  },
  box: {
    width: '100%',
    height: 42,
    cursor: 'pointer',
  },
  day: {
    textAlign: 'center',
    fontSize: '55%',
    color: '#727070',
    paddingTop: 4,
    paddingBottom: 10,
    letterSpacing: 1,
  },
  date: {
    textAlign: 'center',
    fontSize: '72%',
    letterSpacing: 2,
    fontWeight: 600,
    color: '#535252',
  },
}))

export default useListStyle
