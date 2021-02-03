import React, { useState, useEffect } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core'
import PageHeader from './PageHeader'
import PageContent from './PageContent'
import '../style.scss'
import Api, { URL } from '../../../api'
import SnackBar from '../../../components/SnackBar'


function AddDoctor({ handleClose, open }) {

    const [popup, setPopup] = useState(false)
    const [Error, setError] = useState(false)
    const [message, setMessage] = useState(null)
    const [detail, setDetail] = useState(null)
    const [response, setResponse] = useState(null)
    const [count, setCount] = useState(false)


    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    function handleOnSubmit(data) {
        setResponse(data)
        Api.post(URL.doctorSignup,
            data, {
            headers: {
                Authorization: authStr,
            },
        })
            .then((res) => {
                const { data } = res
                setCount(true)
                setResponse(data)
                if (data.doctorId) {
                    localStorage.setItem('doctroId', data.doctorId)
                    localStorage.setItem(
                        'doctorName',
                        `${data.firstName} ${data.lastName}`
                    )
                    setPopup(true)
                    setMessage(' Account has been created successfully')
                    setDetail(data)
                    setError(true)
                }
            })
            .catch((err) => {
                setCount(true)
            })
    }

    useEffect(() => {

        if (response) {
            setError(true)
            setMessage(response.message)
            setCount(false)
        }


    }, [response, count])


    function handleOnClose(reason) {
        if (reason === 'clickaway') {
            return
        }
        setError(false)
        handleClose()
    }


    return (
        <Box>
            <Dialog className="hole-dialoge" open={open} >
                <DialogTitle className="hole-dialogetitle">
                    <PageHeader handleClose={handleClose} />
                </DialogTitle>
                <DialogContent className="hole-dialogecontent">
                    <PageContent
                        handleOnSubmit={handleOnSubmit}
                    />
                </DialogContent>
            </Dialog>
            { popup && (
                <SnackBar
                    openDialog={Error}
                    message={message}
                    onclose={handleOnClose}
                    severity={'success'}
                />
            )}
            {response && response.doctor?.update && (
                <SnackBar
                    openDialog={Error}
                    message={message}
                    onclose={handleOnClose}
                    severity={'success'}
                />
            )}
            {response && response.statusCode && (
                <SnackBar
                    openDialog={Error}
                    message={message}
                    onclose={handleOnClose}
                    severity={'info'}
                />
            )}
            {!response && (
                <SnackBar
                    openDialog={Error}
                    message={message}
                    onclose={handleOnClose}
                    severity={'error'}
                />
            )}
        </Box>
    )
}
export default AddDoctor