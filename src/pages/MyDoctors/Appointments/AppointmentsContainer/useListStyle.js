import {makeStyles} from '@material-ui/core/styles'

const useListStyle = makeStyles(() => ({
    container: {
        marginLeft: 19,
        marginBottom: 10,
        marginRight: 10,
        height: 45,
        background: '#f9f9f9',
        backgroundColor: 'white',
      },
      box: {
        width: 145,
        height: 42,
        cursor: 'pointer',
      },
      day: {
        textAlign: 'center',
        fontSize: 10.5,
        color: '#a8a8a8',
        paddingTop: 4,
        paddingBottom: 10,
        letterSpacing: 1,
      },
      date: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
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
        fontSize: 12,
        paddingTop: 3,
        paddingLeft: 2,
        alignSelf: 'flex-start',
      },
      schedule: {
        width: 10,
        height: 10,
      },
      fromTime: {
        fontSize: 8,
        paddingLeft: 2,
      },
      toTime: {
        fontSize: 8,
        paddingLeft: 5,
      },
      total: {
        fontSize: 8,
        paddingLeft: 35,
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
}))

export default useListStyle