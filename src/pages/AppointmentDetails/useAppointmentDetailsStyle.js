import { makeStyles } from '@material-ui/core/styles'

const useAppointmentDetailsStyle = makeStyles((theme) => ({
    header: {
        margin: 20,
    },
    container: {
        width: '100%',
    },
    doctorDetails: {
        width: 300,
        marginLeft: 20,
    },
    appointmentDetails: {
        marginTop: 50
    },
    doctorName: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: '20px',
    },
    doctorSpeciality: {
        marginLeft: 20,
        fontSize: '14px',
        color: '#ADADAD',
    },
    doctorContact: {
        margin: 10,
    },
    title: {
        color: '#ADADAD',
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: '10px',
    },
    val: {
        paddingLeft: 30,
        paddingTop: 5,
        fontSize: '13px',
    },
    location: {
        margin: 10,
    },
    sessionTiming: {
        marginLeft: 10,
        marginTop: 20,

    },
    nameAndValuePair: {
        marginLeft: 10,
        marginTop: 10,
    },
    name: {
        fontSize: '15px',
        color: '#ADADAD',
        marginBottom: 20,
    },
    value: {
        fontSize: '15px',
        marginLeft: 10
    },

    photoContainer: {
        width: 210,
        position: 'relative',

        '& .MuiBackdrop-root': {
            zIndex: '0',
            position: 'absolute',
            width: '144px',
            height: '144px',
            marginTop: '65px',
            borderRadius: '100px',
            backgroundColor: 'transparent',
        }
    },
    photo: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        border: '7px solid #9DE1FF',
        marginTop: 65,
        marginRight: 10,
    },
    detailsContainer: {
        padding: '8px 20px 20px 15px',
        width: 'calc(100% - 210px)',
    },

    rightSide: {
        marginLeft: 30,
    },
    startConsultationButton: {
        padding: '6px 20px',
        backgroundColor: '#0bb5ff',
        borderRadius: 17,
        textAlign: 'center',
        cursor: 'pointer',
        marginRight: 15,
    },
    startConsultationText: {
        fontSize: 10,
        color: '#f7f7f7',
        paddingTop: 2,
    },
    rescheduleButton: {
        marginRight: 15,
        padding: '5px 40px',
        borderRadius: 17,
        border: '1.5px solid #0bb5ff',
        cursor: 'pointer',
    },
    disableReschduleButton: {
        marginRight: 15,
        padding: '5px 40px',
        borderRadius: 17,
        border: '1.5px solid #e4e3e3',
        backgroundColor: '#efefef',
    },
    rescheduleText: {
        fontSize: 10.5,
        color: '#0bb5ff',
    },
    disableRescheduleText: {
        fontSize: 10.5,
        color: '#8a8a8a',
    },
    cancelButton: {
        padding: '6px 47px',
        borderRadius: 17,
        backgroundColor: '#e4e3e3',
        cursor: 'pointer',
    },
    disableCancelButton: {
        padding: '6px 47px',
        borderRadius: 17,
        border: '1.5px solid #e4e3e3',
        backgroundColor: '#efefef',
    },
    cancelText: {
        fontSize: 10.5,
        color: '#7a7979',
    },
    hoursToJoinText: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        paddingLeft: 13,
    },
    starIcon: {
        width: 10,
        color: '#f33b3b',
        marginTop: -5,
    },
    text: {
        fontSize: 16.5,
        color: '#a8a8a8',
    },


}))

export default useAppointmentDetailsStyle
