import React, { useMemo, useState, useEffect } from 'react'
import {
    Box,
    Typography,
    TextField,
    makeStyles,
    Avatar,
    Button,
} from '@material-ui/core'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import useCustomFecth from '../../hooks/useCustomFetch'
import useAppointmentUpdate from '../../hooks/useAppointmentUpdate'
import SnackBar from '../../components/SnackBar'
import { METHOD, URL } from '../../api'
import useStyle from './useAppointmentDetailsStyle'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import { MdInsertDriveFile as FileIcon } from 'react-icons/md'
import clsx from 'clsx'
import './style.scss'
import { dateFmt } from '../../components/commonFormat'
import moment from 'moment'
import CancelAppointmentModal from '../PatientAppoinments/CancelAppointmentModal'
import RescheduleAppointmentModal from '../PatientAppoinments/RescheduleAppointmentModal'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined'
import PatientReport from '../PatientReports/PatientReport.jsx'
import useUpload from '../../hooks/useUpload'
import API from '../../api'
import getTimeFormatWithNoon from '../../lib/dateLib'
import socketIOClient from 'socket.io-client'
import { setSocket, setTimer } from '../../actions/doctor'
import { useSelector, useDispatch } from 'react-redux'
import { baseURL } from '../../baseURL'
import NumberToWords from 'number-to-words'

const ENDPOINT = baseURL

function AppoinmentDetails() {
    const classes = useStyle()
    const dispatch = useDispatch()
    const socketRef = useSelector(state => state.doctor.socket)
    const listRef = useSelector(state => state.patient.appointmentList)
    const appointmentDetail = useSelector(state => state.patient.appointment)
    const past = useSelector(state => state.patient.isPast)
    const timer = useSelector(state => state.doctor.timer)

    const [item, setItem] = useState(false)
    const [open, setOpen] = useState(false)
    const [reportOpen, setReportOpen] = useState(false)
    const location = useLocation()
    const history = useHistory()
    const [reportFile, setReportFile] = useState()
    const [report, setReport] = useState([])
    const [val, setVal] = useState()
    const appointmentReportArray = useHistory()
    const [handleUpload, data, Loading] = useUpload({
        onSuccess: () => {

        }
    });

    const doctorKey = localStorage.getItem('docKey')
    const { appointmentId } = useParams()
    const params = { appointmentId: parseInt(appointmentId), doctorKey }

    let reportFileArray = []

    const refetch = () => { }

    function handleLabReport() {
        setReportOpen(true)
    }

    function handleReportClose() {
        setReportOpen(false)
        setItem(false)
        let image = { name: val, url: reportFile }
        console.log(image)
        setReport([
            ...report,
            image
        ])
        reportFileArray.push(reportFile)

    }

    //Passing appointmentId to patient report
    function handleClick() {
        appointmentReportArray.push({
            pathname: '/patient/reports',
            state: params.appointmentId
        })
    }

    const [onSave, response] = useAppointmentUpdate(refetch)

    const key = useMemo(() => {
        return {
            doctorKey: params.doctorKey,
            appointmentId: params.appointmentId,
        }
    }, [])
    const [appointmentDetails, reFetch] = useCustomFecth(
        METHOD.GET,
        URL.appointmentDoctorDetails,
        key
    )

    useEffect(() => {
        if (response) {
            setOpen(true)
        }
        if(data?.statusCode === 200) {
            reFetch()
        }
    }, [response, data])
    const role = localStorage.getItem('role')

    const [openReschedule, setOpenReschedule] = useState(false)

    function handleOnReschedule(event) {
        setOpenReschedule(true)
        event.stopPropagation()
    }

    const [openCancel, setOpenCancel] = useState(false)
    function handleOnCancel(event) {
        setOpenCancel(true)
        event.stopPropagation()
    }

    function handleClose() {
        setOpenCancel(false)
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    function handleCloseReschedule() {
        setOpenReschedule(false)
    }

    const doctorName = appointmentDetails?.doctorLastName
        ? `${appointmentDetails?.doctorFirstName}${' '}${appointmentDetails?.doctorLastName}`
        : appointmentDetails?.doctorFirstName

    useEffect(() => {
        if (!past) {
            const socket = socketIOClient(ENDPOINT, {
                transports: ['websocket'],
                jsonp: false,
                query: {
                    token: localStorage.getItem('virujhToken'),
                },
                path: '/socket.io',
            })

            socket.on('connect', function () {
                dispatch(setSocket(socket))

                if (localStorage.getItem('loginUser') === 'doctor') {
                    socket.emit('createTokenForDoctor')
                } else {
                    if (!past) {
                        socket.emit('updateLiveStatusOfUser', { status: 'online' })
                        socket.emit('getPatientTokenForDoctor', params.appointmentId)
                    }

                }

                socket.on('videoTokenForPatient', (data) => {
                    if (data.isToken) {
                        socket.emit('updateLiveStatusOfUser', { status: 'videoSessionReady' })
                        if (data.appointmentId !== params.appointmentId) {
                            //  handleOnOpen(data.appointmentId)
                        }
                    }
                })
            })

        }

    }, [])

    function handleOnStartConsulation() {
        console.log(params.appointmentId)
        socketRef.emit('getPatientTokenForDoctor', params.appointmentId)
        socketRef.on('videoTokenForPatient', (data) => {
            socketRef.emit('updateLiveStatusOfUser', { status: 'videoSessionReady' })
            if (data.isToken) {
                socketRef.emit('updateLiveStatusOfUser', { status: 'videoSessionReady' })
            }
        })
        history.push({
            pathname: '/video-consultation',
            state: params.appointmentId,
            doctorName: doctorName,
            liveStatus: appointmentDetails?.doctorLiveStatus,
            socket: socketRef,
            list: listRef,
        })
    }

    const currentTime = moment().format('DD/MM/YYY HH:mm:ss')

    const appoinmentDate = moment(appointmentDetails?.appointmentDate).format(
        'DD/MM/YYYY'
    )
    const startTime = getTimeFormatWithNoon(appointmentDetails?.startTime)

    const endTime = getTimeFormatWithNoon(appointmentDetails?.endTime)

    const appointmentDateWithTime = appoinmentDate + ' ' + startTime

    const difference = moment(appointmentDateWithTime, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(currentTime, 'DD/MM/YYYY HH:mm:ss')
    )

    const differenceInDays = moment.duration(difference)

    const days =
        NumberToWords.toWords(differenceInDays.days()).charAt(0).toUpperCase() +
        NumberToWords.toWords(differenceInDays.days()).slice(1)

    const hours =
        NumberToWords.toWords(differenceInDays.hours()).charAt(0).toUpperCase() +
        NumberToWords.toWords(differenceInDays.hours()).slice(1)

    const minutes =
        NumberToWords.toWords(differenceInDays.minutes()).charAt(0).toUpperCase() +
        NumberToWords.toWords(differenceInDays.minutes()).slice(1)

    const cancelDisable =
        appointmentDetails?.cancellationDays !== null
            ? differenceInDays.days() >= Number(appointmentDetails?.cancellationDays) &&
                differenceInDays.hours() >= Number(appointmentDetails?.cancellationHours) &&
                differenceInDays.minutes() >= Number(appointmentDetails?.cancellationMins)
                ? false
                : true
            : false

    const rescheduleDisable =
        appointmentDetails?.rescheduleDays !== null
            ? differenceInDays.days() >= Number(appointmentDetails?.rescheduleDays) &&
                differenceInDays.hours() >= Number(appointmentDetails?.rescheduleHours) &&
                differenceInDays.minutes() >= Number(appointmentDetails?.rescheduleMins)
                ? false
                : true
            : false

    const prescriptionDisplay =
        (appointmentDetails?.prescriptionUrl && appointmentDetails?.prescriptionUrl.length)
            ? true : false

    const Entry = ({ data, role }) => {
        return (
            <tr>
                <td className="cell">{data?.fileName}</td>
                <td className="cell">{dateFmt(data?.reportDate)}</td>
                <td className="cell">{data?.comments}</td>
                <td className="cell">
                    <a href={data?.reportURL} target="_blank" download>
                        <IconButton className="view-icon-btn" title="View">
                            <FileIcon className="view-icon" />
                        </IconButton>
                    </a>
                </td>
            </tr>
        )
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.header}> Appointment Details </Box>

            {Boolean(appointmentDetails) && (<Box display="flex">

                <Box className={classes.doctorDetails}>
                    <Box className={classes.photoContainer} display="flex">
                        <Avatar
                            src={appointmentDetails.doctorPhoto}
                            className={classes.photo}
                            alt="doctor profile photo"
                            name="photo"
                        />
                    </Box>
                    <Box ><Typography className={classes.doctorName}>
                        {doctorName}
                    </Typography>
                        <Typography className={classes.doctorSpeciality}>{appointmentDetails.speciality}</Typography>
                    </Box>

                    <Box className={classes.sessionTiming}>
                        <Typography className={classes.title}>Session Timing</Typography>
                        <Typography className={classes.val}>{appointmentDetails.consultationTimeSlot + "mins"}</Typography>
                    </Box>

                    <Box className={classes.doctorContact}>
                        <Typography className={classes.title}>Contact Number</Typography>
                        <Typography className={classes.val}>{appointmentDetails.mobileNo}</Typography>
                    </Box>

                    <Box className={classes.location}>
                        <Typography className={classes.title}>Location</Typography>
                        <Typography className={classes.val}>{appointmentDetails.location}</Typography>
                    </Box>
                </Box>
                <Box className={classes.appointmentDetails}>
                    <Box display="flex" className={classes.details}>
                        <Box>
                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>Email:</Typography>
                                <Typography className={classes.value} variant="h5">
                                    {appointmentDetails.email}
                                </Typography>
                            </Box>
                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>
                                    Invite Time Zone:
                                </Typography>
                                <Typography className={classes.value} variant="h5">
                                    Indian standard Time
                                </Typography>
                            </Box>
                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>Hospital Name: </Typography>
                                <Typography className={classes.value} variant="h5">
                                    {appointmentDetails.hospitalName}
                                </Typography>
                            </Box>
                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>Time: </Typography>
                                <Typography
                                    className={classes.value}
                                    variant="h5"
                                >{`${startTime}${' - '}${endTime}`}</Typography>
                            </Box>


                        </Box>
                        <Box className={classes.rightSide}>

                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>Date: </Typography>
                                <Typography className={classes.value} variant="h5">
                                    {appoinmentDate}
                                </Typography>
                            </Box>

                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>Doctor Status: </Typography>
                                <Typography className={classes.value} variant="h5">
                                    {appointmentDetails.doctorLiveStatus}
                                </Typography>
                            </Box>

                            <Box display="flex" className={classes.nameAndValuePair}>
                                <Typography className={classes.name}>Speciality: </Typography>
                                <Typography className={classes.value} variant="h5">
                                    {appointmentDetails.speciality}
                                </Typography>
                            </Box>

                            {(prescriptionDisplay) ?
                                past && (
                                    <Box display="flex" className={classes.nameAndValuePair}>

                                        <Typography className={classes.name}>Prescription : </Typography>
                                        <Box display="flex" className={classes.download}>
                                            <a className={classes.value} href={appointmentDetails.prescriptionUrl[0]}
                                                target="_blank"
                                                style={{ color: '#37befa', textDecorationLine: 'none' }}
                                                variant="h5">
                                                Click here
                                            </a>
                                            <VerticalAlignBottomOutlinedIcon
                                                onClick={appointmentDetails.prescriptionUrl[0]}
                                                className={classes.downloadIcon}
                                            />
                                        </Box>
                                    </Box>
                                )
                                :
                                <div></div>
                            }

                            <Box>
                                <Box className={classes.nameAndValuePair} style={{ display: "flex" }}>
                                    <Typography className={classes.name}>Lab Report:</Typography>
                                    <Button className="title" onClick={handleLabReport} style={{ textTransform: "none", position: "relative", top: "-6px", left: "-10px" }} >
                                        <AddCircleOutlineTwoToneIcon />
                                    </Button>
                                </Box>
                            </Box>

                            {
                                reportOpen &&
                                <PatientReport
                                    open={reportOpen}
                                    setOpen={setReportOpen}
                                    setItem={setItem}
                                    appointmentId={params.appointmentId}
                                    handleClose={handleReportClose}
                                    setReportFile={setReportFile}
                                    setVal={setVal}
                                    handleUpload={handleUpload}
                                    handleClick={handleClick}
                                />
                            }

                        </Box>

                        {/* table view of lab reports */}
                        <Box>
                            {!!appointmentDetails?.reportDetail?.length &&
                                <div className="report-list-panel">
                                    <div className={clsx('table-wrap')}>
                                        <div className="tableTitle">Lap Reports</div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="head">File Name</th>
                                                    <th className="head">Report Date</th>
                                                    <th className="head">Comment</th>
                                                    <th className="head">Attachment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!!appointmentDetails?.reportDetail?.length &&
                                                    appointmentDetails.reportDetail?.map((i, index) => (
                                                        <Entry data={i} key={index} role={role} />
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>}
                        </Box>

                    </Box>

                    <Box>
                        {/* <Box display="flex" className={classes.preConsultaion}>
                  <InfoOutlinedIcon className={classes.infoIcon} />
                  <Typography className={classes.preConsultaionTime}>
                    PreConsultaion starts at <b>{preConsultationTime}</b>. Doctor
                    consultation starts at <b>{startTime}</b>
                  </Typography>
                    </Box> */}
                        <Box className={classes.button} display="flex">
                            <Button
                                className={rescheduleDisable ? classes.disableReschduleButton : classes.rescheduleButton}
                                onClick={handleOnReschedule}
                                disabled={rescheduleDisable}
                            >
                                <Typography className={rescheduleDisable ? classes.disableRescheduleText : classes.rescheduleText}>
                                    RESCHEDULE
                                </Typography>
                            </Button>
                            <Box className={classes.startConsultationButton}>
                                <Typography
                                    onClick={handleOnStartConsulation}
                                    className={classes.startConsultationText}
                                >
                                    START CONSULTATION
                                </Typography>
                            </Box>

                            <Button
                                className={cancelDisable ? classes.disableCancelButton : classes.cancelButton}
                                onClick={handleOnCancel}
                                disabled={cancelDisable}
                            >
                                <Typography className={classes.cancelText}>CANCEL</Typography>
                            </Button>

                        </Box>
                        <Box display="flex" className={classes.hoursToJoinText}>
                            {(differenceInDays.days() > 0 ||
                                differenceInDays.hours() > 0 ||
                                differenceInDays.minutes() > 0) && (
                                    <StarIcon className={classes.starIcon} />
                                )}
                            {differenceInDays.days() > 0 ? (
                                differenceInDays.days() === 1 ? (
                                    <Typography
                                        className={classes.text}
                                    >{`${days} day and ${hours} more hours to join`}</Typography>
                                ) : (
                                        <Typography
                                            className={classes.text}
                                        >{`${days} days and ${hours} more hours to join`}</Typography>
                                    )
                            ) : differenceInDays.hours() > 0 ? (
                                differenceInDays.hours() === 1 ||
                                    differenceInDays.hours() === 0 ? (
                                        <Typography
                                            className={classes.text}
                                        >{`${hours} more hour to join`}</Typography>
                                    ) : (
                                        <Typography
                                            className={classes.text}
                                        >{`${hours} more hours to join`}</Typography>
                                    )
                            ) : (
                                        differenceInDays.minutes() > 0 &&
                                        (differenceInDays.minutes() === 1 ? (
                                            <Typography
                                                className={classes.text}
                                            >{`${minutes} more minute to join`}</Typography>
                                        ) : (
                                                <Typography
                                                    className={classes.text}
                                                >{`${minutes} more minutes to join`}</Typography>
                                            ))
                                    )}
                        </Box>


                    </Box>


                </Box>

            </Box>
            )
            }
            {
                openCancel && (
                    <CancelAppointmentModal
                        open={openCancel}
                        time={appointmentDetails.startTime}
                        date={appoinmentDate}
                        onClose={handleClose}
                        appointmentId={params.appointmentId}
                        onSave={onSave}
                    />
                )
            }
            {openReschedule && (
                <RescheduleAppointmentModal
                    open={openReschedule}
                    onClose={handleCloseReschedule}
                    time={appointmentDetails.startTime}
                    date={appoinmentDate}
                    appointmentDetail={appointmentDetail}
                    onSave={onSave}
                />
            )}


            {response && response.data?.appointment && (
                <SnackBar
                    openDialog={open}
                    message={'Appointment Rescheduled Sucessfully'}
                    onclose={handleSnackBarClose}
                    severity={'success'}
                />
            )}
            {(response && response.name === 'Error' && response.status === 500 && (
                <SnackBar
                    openDialog={open}
                    message={'Internal server error'}
                    onclose={handleSnackBarClose}
                    severity={'error'}
                />
            )) ||
                (response && response.name === 'Error' && response.status !== 500 && (
                    <SnackBar
                        openDialog={open}
                        message={'Something went wrong'}
                        onclose={handleSnackBarClose}
                        severity={'error'}
                    />
                ))}
            {(response &&
                response.data?.statusCode &&
                response.data?.statusCode === 200 && (
                    <SnackBar
                        openDialog={open}
                        message={response.data.message}
                        onclose={handleSnackBarClose}
                        severity={'success'}
                    />
                )) ||
                (response && response.data?.statusCode === 404 && (
                    <SnackBar
                        openDialog={open}
                        message={response.data.message}
                        onclose={handleSnackBarClose}
                        severity={'info'}
                    />
                )) ||
                (response && response.data?.statusCode === 400 && (
                    <SnackBar
                        openDialog={open}
                        message={response.data.message}
                        onclose={handleSnackBarClose}
                        severity={'info'}
                    />
                )) ||
                (response && response.data?.statusCode === 502 && (
                    <SnackBar
                        openDialog={open}
                        message={response.data.message}
                        onclose={handleSnackBarClose}
                        severity={'error'}
                    />
                )) ||
                (response && response.data?.statusCode && (
                    <SnackBar
                        openDialog={open}
                        message={response.data.message}
                        onClose={handleSnackBarClose}
                        severity={'error'}
                    />
                ))}

            {/* SnakeBar for lap report Upload */}
            {
                <SnackBar
                    openDialog={item}
                    message={"Your report added successfully"}
                    onclose={handleReportClose}
                    severity={'success'}
                />
            }


        </Box >

    )
}



export default AppoinmentDetails
