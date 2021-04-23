import { makeStyles } from '@material-ui/core/styles'

const useAppointmentDetailsStyle = makeStyles((theme) => ({
    header: {
        marginTop: 30,
        marginLeft: 10,
    },
    leftArrows:{
    width: 20,
    marginTop: 35,
    marginLeft: 8,
    },
   
    container: {
        width: '100%',
    },
    doctorDetails: {
        marginLeft: 20,
    },
    appointmentDetails: {
        marginTop: 20
    },
    doctorName: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: '20px',
    },
    doctorSpeciality: {
        marginLeft: 20,
        fontSize: '14px',
        color: '#777777',
    },
    doctorContact: {
        margin: 10,
    },
    title: {
        color: '#777777',
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
        width:'60%'
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
        color: '#777777',
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
            marginTop: '20px',
            borderRadius: '100px',
            backgroundColor: 'transparent',
        }
    },
    photo: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        border: '7px solid #9DE1FF',
        marginTop: 20,
        marginRight: 10,
    },
    detailsContainer: {
        padding: '8px 20px 20px 15px',
        width: 'calc(100% - 210px)',
    },

    rightSide: {
        marginLeft: 30,
    },

    button: {
        marginTop: 50,
    },
    startConsultationButton: {
        padding: '6px 20px',
        backgroundColor: '#0bb5ff',
        borderRadius: 17,
        textAlign: 'center',
        cursor: 'pointer',
        marginRight: 40,
    },
    startConsultationText: {
        fontSize: 10,
        color: '#f7f7f7',
        paddingTop: 2,
    },
    rescheduleButton: {
        marginRight: 40,
        padding: '5px 40px',
        borderRadius: 17,
        border: '1.5px solid #0bb5ff',
        cursor: 'pointer',
    },
    disableReschduleButton: {
        marginRight: 40,
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
        fontSize: 14,
        color: '#a8a8a8',
        marginTop: 10
    },


}))

export default useAppointmentDetailsStyle
