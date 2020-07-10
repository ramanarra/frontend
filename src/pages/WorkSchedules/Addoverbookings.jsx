import React, { useState, useEffect } from 'react'
import { Typography, Button, TextField, Grid } from '@material-ui/core';
import classNames from 'classnames'
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Switch from "react-switch";

import useStyles from './useStyles'
import updateWorkScheduleForsessionAndoverbooking from '../hooks/updateWorkScheduleForsessionAndoverbooking'
const Addoverbookings = (props) => {
    const [consultationSessionTimings, setConsultationSessionTimings] = useState('');
    const [editOverBookings, setEditOverBookings] = useState()
    const [overBookingType, setOverBookingType] = useState()
    const [enableswitch, setEnableSwitch] = useState()
    const [mins, setMins] = useState(20);
    const [updateWorkSchedule] = updateWorkScheduleForsessionAndoverbooking()

    useEffect(() => {
        if (props.responseData) {
            setConsultationSessionTimings(props.responseData.configDetails.consultationSessionTimings)
            setEditOverBookings(props.responseData.configDetails.overBookingCount)
            setOverBookingType(props.responseData.configDetails.overBookingType)
            setEnableSwitch(props.responseData.configDetails.overBookingEnabled)
        }
    }, [props.responseData])

    const classes = useStyles();
    const [selectedEditIcon, setSelectedEditIcon] = useState(false);
    const clickEditIcon = () => {
        setSelectedEditIcon(true)

    }
    const clickCancelIcon = () => {
        setSelectedEditIcon(false)
        setEditOverBookings(props.responseData.configDetails.overBookingCount)
    }
    const clickSaveIcon = () => {
        if (props.responseData.configDetails.overBookingCount !== editOverBookings) {
            updateWorkSchedule({
                doctorKey: localStorage.getItem('docKey'),
                workScheduleConfig: {
                    overBookingType: overBookingType,
                    overBookingCount: editOverBookings,
                    overBookingEnabled: enableswitch,
                    consultationSessionTimings: consultationSessionTimings,
                }
            });
            // props.refetch()
            setSelectedEditIcon(false)
        }
    }
    const handleChange = () => {
        switchEnable(!enableswitch, () => {
            callingRefetch(
                {
                    doctorKey: localStorage.getItem('docKey'),
                    workScheduleConfig: {
                        overBookingType: overBookingType,
                        overBookingCount: editOverBookings,
                        overBookingEnabled: enableswitch,
                        consultationSessionTimings: consultationSessionTimings,
                    }
                }, () => {
                    // props.refetch();
                })
        })

    }
    const callingRefetch = (updateWorkScheduleData, callbackTorefetch) => {
        updateWorkSchedule(updateWorkScheduleData)
        callbackTorefetch();
    }
    const switchEnable = (switchActive, callBackOfSwitch) => {
        setEnableSwitch(switchActive);
        callBackOfSwitch();
    }
    const handlemins = (event) => {
        setMins(event.target.value);
    }
    const updateConsultationSessionTimings = (timings) => {
        if (consultationSessionTimings !== timings) {
            setConsultationSessionTimings(timings)
            updateWorkSchedule({
                doctorKey: localStorage.getItem('docKey'),
                workScheduleConfig: {
                    overBookingType: overBookingType,
                    overBookingCount: editOverBookings,
                    overBookingEnabled: enableswitch,
                    consultationSessionTimings: consultationSessionTimings,
                }
            });
            props.refetch();

        }
    }
    const updateOverBookingType = (bookingtype) => {

        if (overBookingType !== bookingtype) {
            setOverBookingType(bookingtype);
            updateWorkSchedule({
                doctorKey: localStorage.getItem('docKey'),
                workScheduleConfig: {
                    overBookingType: overBookingType,
                    overBookingCount: editOverBookings,
                    overBookingEnabled: enableswitch,
                    consultationSessionTimings: consultationSessionTimings,
                }
            });
            // props.refetch();
        }
    }
    const changeOverbookingsValue = (event) => {
        setEditOverBookings(event.target.value);
    }

    return (
        <div className={classes.container}>

            <Typography variant="h5" gutterBottom className={classNames(classes.title, classes.spaceBetweenTitle)}>
                Work Schedules
      </Typography>
            <Typography variant="subtitle1" gutterBottom className={classNames(classes.subtitle, classes.spaceBetweenSubTitle)}>
                Consultation Session Timing
      </Typography>
            <Button variant="outlined" onClick={() => updateConsultationSessionTimings("15 minutes")} className={classNames(classes.button, consultationSessionTimings === "15 minutes" ? classes.active : '')}>15 minutes</Button>
            <Button variant="outlined" onClick={() => updateConsultationSessionTimings("30 minutes")} className={classNames(classes.button, consultationSessionTimings === "30 minutes" ? classes.active : '')}>30 minutes</Button>
            <Button variant="outlined" onClick={() => updateConsultationSessionTimings("45 minutes")} className={classNames(classes.button, consultationSessionTimings === "45 minutes" ? classes.active : '')}>45 minutes</Button>
            <Button variant="outlined" onClick={() => updateConsultationSessionTimings("60 minutes")} className={classNames(classes.button, consultationSessionTimings === "60 minutes" ? classes.active : '')} >60 minutes</Button>
            <TextField value={mins + 'min'} InputProps={{ classes: { input: classes.input, notchedOutline: classes.notchedOutline } }} onChange={handlemins}>min</TextField>

            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item><Typography variant="subtitle1" gutterBottom className={classNames(classes.subtitle, classes.spaceBetweenSubTitle)}>
                    Add overbookings
      </Typography></Grid>
                <Grid item>
                    <Switch onChange={handleChange} checked={enableswitch} uncheckedIcon={false} checkedIcon={false} onColor='#0BB5FF' width={40} height={23} className={classes.Switchbutton} />
                </Grid>
            </Grid>
            {enableswitch &&
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="subtitle1" gutterBottom className={classes.bookingallowed}>
                            Total overbookings are allowed {!selectedEditIcon ? <span className={classes.overbookingCount}>{editOverBookings}</span> : <span className={classes.textfieldCount}><TextField id="outlined-basic" value={editOverBookings} onChange={changeOverbookingsValue} InputProps={{ classes: { input: classes.input2 } }} variant="outlined" /></span>}<span className={classes.editicon}> {!selectedEditIcon ? <EditIcon className={classes.iconbutton} onClick={clickEditIcon} /> : <div><CancelOutlinedIcon className={classes.cancelation} onClick={clickCancelIcon} /><SendOutlinedIcon className={classes.iconbutton} onClick={clickSaveIcon} /></div>} </span>
                        </Typography>
                    </Grid>
                    <Grid item style={{ marginBottom: '6px' }}>
                        <Button variant="outlined" onClick={() => updateOverBookingType('Per Hour')} className={classNames(classes.button2, overBookingType === "Per Hour" ? classes.active : '')}>per hour</Button>
                        <Button variant="outlined" onClick={() => updateOverBookingType('Per Day')} className={classNames(classes.button2, overBookingType === "Per Day" ? classes.active : '')}>per day</Button>
                    </Grid>
                </Grid>
            }
        </div>
    )
}

export default Addoverbookings;