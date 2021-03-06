import React, { useState, useEffect } from 'react'
import { Box, Button, makeStyles, TextField, DialogTitle, Dialog, Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import usestyle from './useMedicinesubscriptionstyle'
import CloseIcon from '@material-ui/icons/Close'
import { data } from 'jquery'
import SnackBar from '../../components/SnackBar'
import { red } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/Delete';
import useCustomFetch from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'

function MedicinesubscriptionList({ subIndex, data, handleOnMedicine, handleOnMedicinecountOfDays, handleOndoseOfMedicine, handleRemoveMedicine, list, show }) {

  const useStyle = makeStyles(() => ({
    holesize: {
      maxWidth: 800,
      height: 350,
    },
    medicineField: {
      width: 150,
      borderColor: 'red',
    },
    quantityField: {
      marginLeft: 50,
      width: 75,

    },
    commentField: {
      marginLeft: 55,
      width: 170,
    },
    checkBox: {
      borderColor: ' #bdc7c9',
      height: 40,
      width: 40,
    },
    holebox: {
      width: '550px',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '25px',
    }
  }))
  const style = useStyle()
  return (
    <Box>
      <Box className={style.holebox}>
        {subIndex === 0 &&
          <Box >
            <Box style={{ fontSize: 14, display: 'flex', paddingBottom: '5px' }}>
              <Box style={{ position: 'relative' }}>Medicine Name<sup className="star-color" style={{ color: "red" }}>★</sup></Box>
              <Box style={{ position: 'relative', left: '79px' }}>Quantity/Dosage</Box>
              <Box style={{ position: 'relative', left: list?.length > 1 ? '95px':'120px' }}>Comments</Box>
              <Box style={{ position: 'relative', left: '20px' }}></Box>
            </Box>
          </Box>
        }
        <Box style={{ display: 'flex' }} className={style.textfield}>
          {data.isdone && <TextField autoFocus
            className={style.medicineField} name="name" value={data.nameOfMedicine} placeholder="Paracetamal"
            onChange={(event) => {
              handleOnMedicine(event, subIndex)
            }}
          />}
          {!data.isdone && <TextField
            error
            autoFocus
            className={style.medicineField} name="name" value={data.nameOfMedicine} placeholder="Paracetamal"
            onChange={(event) => {
              handleOnMedicine(event, subIndex)
            }}
          />}
          <TextField className={style.quantityField} value={data.countOfDays} placeholder="3"
            onChange={(event) => { handleOnMedicinecountOfDays(event, subIndex) }} />
          <TextField className={style.commentField} value={data.doseOfMedicine} placeholder="comment on medicine"
            onChange={(event) => { handleOndoseOfMedicine(event, subIndex) }} />
          {list?.length > 1 &&
            <Button
              onClick={(event) => { handleRemoveMedicine(subIndex, 'delete', event) }} value={data.minus}
              color="primary" ><DeleteIcon style={{ color: "#ff0000" }} /></Button>
          }
        </Box>
      </Box>
    </Box>
  )
}
function Medicinesubscription({ open, handlesubscriptionclose, handleOnMedicine, handleAddMedicineList, seperate, existList }) {
  const classes = usestyle()
  const [list, setList] = useState([])
  const [show, setShow] = useState(false)
  const [opens, setOpens] = useState(false)
  const [news, setNews] = useState(true)
  const [doctorData, refetch] = useCustomFetch(METHOD.GET, URL.doctorList)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpens(false)
    setShow(false)
  }
  useEffect(() => {
    if (seperate) {
      let medicine = existList
      let medicineList = [...list]
      medicineList.push(medicine)
      setList(existList)
    }
    else {
      let medicine = { nameOfMedicine: '', countOfDays: '', doseOfMedicine: '', minus: '', isdone: 'true' }
      let medicineList = [...existList]
      medicineList.push(medicine)
      setList(medicineList)
    }
  }, [])

  function handleOnMedicine(event, subIndex) {
    const { value } = event.target

    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, nameOfMedicine: value, isdone:'true' }
      return i
    }))
    setNews(true)
  }

  function handleOnMedicinecountOfDays(event, subIndex) {
    const { value } = event.target

    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, countOfDays: value }
      return i
    }))
  }

  function handleOndoseOfMedicine(event, subIndex) {
    const { value } = event.target

    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, doseOfMedicine: value }
      return i
    }))
  }

  function calling(list) {
    let count = 0;
    list.map((data, index) => {

      list[index].isdone = !!data.nameOfMedicine.trim();

      if (!data.nameOfMedicine || data.nameOfMedicine.trim() === '') {
        count++
      }
    })
    console.log(list)
    if(count===0){
      handleAddMedicine()
      setNews(true)
    }
    else{
      setNews(false)
    }
    // !!list.length
    // handleAddMedicine()
  }

  function handleAddMedicine() {
    let medicine = { nameOfMedicine: '', countOfDays: '', doseOfMedicine: '', minus: '', isdone: 'true' }
    let medicineList = [...list]
    medicineList.push(medicine)
    setList(medicineList)
  }

  function handleRemoveMedicine(index, type, event) {
    console.log('handleRemoveMedicine', event);
    let medicineList = [...list]
    if (medicineList && medicineList.length && medicineList[index].minus !== 'minus' && type === 'delete') {
      medicineList.splice(index, 1)
      setList(medicineList)
    }
  }

  function handlecheck(list) {
    let count = 0;
    list.map((data, index) => {
      list[index].isdone = (!data.nameOfMedicine || data.nameOfMedicine.trim() === '') ? false : true;
      if(!data.nameOfMedicine || data.nameOfMedicine.trim() === '') {
        count++
      }

    })
    if (count !== 0) {
      setShow(true)
      setOpens(true)
    }
    else {
      setShow(false)
      handleAddMedicineList(list)
    }
  }

  return (
    <Box style={classes.dialogBox}>
      <Dialog open={open} >
        <Box >
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Grid container>
              <Grid item xs={12}>
                <DialogTitle style={{ paddingBottom: 0 }} className={classes.title}>{`Dr. ${doctorData && doctorData.doctorList && doctorData.doctorList[0] && doctorData.doctorList[0].doctorName || ""}`}</DialogTitle>
              </Grid>
              <Grid item xs={12} style={{ paddingLeft: 25, fontSize: 14, paddingBottom: 10 }}>
                <span>{doctorData && `${doctorData?.accountDetails?.street1 || ""}, ${doctorData?.accountDetails?.landmark || ""}, ${doctorData?.accountDetails?.cityState || ""} - ${doctorData?.accountDetails?.pincode || ""}` || ""}</span>
              </Grid>
            </Grid>
            <CloseIcon className={classes.closed} onClick={handlesubscriptionclose} />
          </Box>
          <Grid container style={{ background: "#0BB5FF", display: "flex" }}>
            <Grid item xs={8} style={{ fontSize: "12px", color: "white", paddingLeft: 25, paddingTop: 10, paddingBottom: 10 }}>
              <span>{`Phone Number: +91 ${doctorData && doctorData.doctorList && doctorData.doctorList[0] && doctorData.doctorList[0].number || ""}`}</span>
            </Grid>
            <Grid item xs={4} style={{ fontSize: "12px", color: "white", paddingLeft: 25, paddingTop: 10, paddingBottom: 10, display: "flex", justifyContent: "flex-end", paddingRight: 35 }}>
              <span>{`Reg No: ${doctorData && doctorData.doctorList && doctorData.doctorList[0] && doctorData.doctorList[0].registrationNumber || ""}`}</span>
            </Grid>
          </Grid>
          <Box>
            {
              list.map((data, index) => < MedicinesubscriptionList subIndex={index} data={data}
                handleOnMedicine={handleOnMedicine} handleOnMedicinecountOfDays={handleOnMedicinecountOfDays}
                handleOndoseOfMedicine={handleOndoseOfMedicine} handleRemoveMedicine={handleRemoveMedicine}
                list={list} show={show}
              />)}
          </Box>
          <Box className={classes.add}>
            { news &&
              <Button onClick={() => calling(list)} className={classes.added} color="primary" >+ Add Medicine</Button>
            }
          </Box>
          <Box style={{ textAlign: 'center', paddingBottom: '20px' }}>
            {list.length > 0 &&
              <Button className={classes.submit} type="submit" onClick={() => handlecheck(list)} >save</Button>
            }
          </Box>
          {show && (
            <SnackBar
              openDialog={opens}
              message={'Enter Medicine Name'}
              onclose={handleClose}
              severity={'error'}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  )
}
export default Medicinesubscription