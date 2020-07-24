import {makeStyles} from '@material-ui/core/styles'

const useStyleForCancelAppointment = makeStyles(() => ({
    cancellation: {
        height: 950,
      },
      confirmation: {
        fontSize: 20,
        color: 'black',
      },
      closed: {
        marginLeft: 285,
        marginRight: -10,
        cursor: 'pointer',
      },
      askConfirmation: {
        width: 400,
      },
      askConfirmationText: {
        color: '#a8a8a8',
      },
      confirmationStar: {
        width: 7,
        color: 'red',
        marginTop: -5,
      },
      confirmationNote: {
        fontSize: 13,
        paddingLeft: 1,
      },
      notes: {
        paddingTop: 10,
      },
      cancleButton: {
        width: 100,
        height: 35,
        borderRadius: 17,
        backgroundColor: '#f7f7f7',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 220,
        paddingTop: 5,
        cursor: 'pointer',
      },
      cancleText: {
        color: '#a8a8a8',
      },
      confirmButton: {
        width: 100,
        height: 35,
        borderRadius: 17,
        backgroundColor: '#0bb5ff',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 15,
        paddingTop: 5,
        cursor: 'pointer',
      },
      confirmText: {
        color: 'white',
      },
}))

export default useStyleForCancelAppointment