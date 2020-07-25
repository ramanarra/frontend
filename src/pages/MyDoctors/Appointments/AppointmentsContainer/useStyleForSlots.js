import {makeStyles} from '@material-ui/core/styles'

const useStyleForSlots = makeStyles(() => ({
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
        borderRadius: 3,
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
      },
      schedule: {
        width: 10,
        height: 10,
        marginTop: 1,
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
        paddingLeft: 34,
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
}))

export default useStyleForSlots