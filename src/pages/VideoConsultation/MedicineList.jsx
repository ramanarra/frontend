import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { connect } from 'react-redux'
import moment from 'moment'
import Medicinesubscription from './Medicinesubscription'
import { setOpenSideBar } from '../../actions/doctor'
import usestyle from './useMedicineListStyle'
import EditIcon from '@material-ui/icons/Edit'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'

function MedicineListEntry({ list }) {
  const classes = usestyle()

  return (
    <div >

      <table className={classes.table}>

        <thead style={{ fontSize: 14 }} className={classes.head}>
          <tr style={{ width: '23%' }}>
            <th
              style={{ width: '7%' }}
            >Medicine</th>
            <th
              style={{ width: '7%' }}
            >Quantity/Dose</th>
            <th
              style={{ width: '7%' }}
            >Consumption comments</th>
          </tr>
        </thead>

        <tbody className={classes.txtbody}>
          {list.length > 0 &&
            list.map((data) =>
              <tr className={classes.bodyrow}>
                <td>
                  {data.nameOfMedicine}
                </td>
                <td>
                  {data.doseOfMedicine}
                </td>
                <td>
                  <div className={classes.comment + " consumption-countOfDays"} >
                    {data.countOfDays}
                  </div>
                </td>

              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

function MedicineList({ onClose, setOpenTopBar, setOpenSideBar, appointmentId }) {
  const classes = usestyle()
  const currentDate = moment().format('DD/MM/YYYY')
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [seperate, setCeperate] = useState(false)
  const [, setExistList] = useState([])
  const [, setIndex] = useState(null)
  const [updateData, ,] = useManualFetch()
  function handleOnClose() {
    onClose()
    setOpenTopBar(false)
    setOpenSideBar(false)
  }

  function handleOnMedicine(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, nameOfMedicine: value }
      return i
    }))
  }
  function handleOnMedicinedoseOfMedicine(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, doseOfMedicine: value }
      return i
    }))
  }
  function handleOncountOfDays(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, countOfDays: value }
      return i
    }))
  }

  function handlesubscription() {
    setOpen(true)
    setCeperate(false)
  }
  function handlesubscriptionclose() {
    setOpen(false)
    setCeperate(false)
  }

  function handleAddMedicineList(medicineList) {
    if (seperate) {

      setList(medicineList)
      setOpen(false)
      setExistList([])
      setIndex(null)
    }
    else {
      let newList = [...list]
      medicineList.map(list => {
        newList.push(list)
      })
      setList(newList)
      setOpen(false)
    }
  }

  function handleOnEdit() {
    setCeperate(true)
    setOpen(true)
  }


  function addPrescription() {
    let prescriptionArray = [];
    let medicineList = [];
    let templist = [];

    list.map(item => {
      medicineList.push({
        nameOfMedicine: item.nameOfMedicine,
      })
    });
    prescriptionArray.push({
      prescriptionList: [],

    })
    const updatedata = {
      medicineList: list

    }
    templist.push(updatedata)
    let param = {
      appointmentId: String(appointmentId),
      prescriptionList: templist
    }
    updateData(METHOD.POST, URL.prescriptionAdd,
      param
    )

    console.log(list, param, appointmentId)
  }

  console.log(appointmentId)

  return (
    <Box>
      <Box className={classes.backButton}>
        <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
      </Box>

      <Box className={classes.container}>
        <Box className={classes.date}>
          <Typography>Date: </Typography>
          <Typography style={{ color: '#363838' }}>{currentDate}</Typography>

          {list.length > 0 &&
            <Button onClick={() => handleOnEdit()} className={classes.edit}>
              <EditIcon color="primary" />
            </Button>
          }


        </Box>

        <Box>
          {list.length > 0 &&
            <MedicineListEntry list={list} handleOnMedicine={handleOnMedicine} handleOnEdit={handleOnEdit}
              handleOncountOfDays={handleOncountOfDays} handleOnMedicinedoseOfMedicine={handleOnMedicinedoseOfMedicine}
            />}
        </Box>
        <Box className={classes.add}>
          <Button className={classes.added} onClick={handlesubscription} color="primary" >+ Add Prescription</Button>
        </Box>
        <Box>
          {
            open &&
            <Medicinesubscription
              open={open}
              handlesubscriptionclose={handlesubscriptionclose}
              handleOnMedicine={handleOnMedicine}
              handleAddMedicineList={handleAddMedicineList}
              seperate={seperate}
              existList={list}


            />}

        </Box>
        <Box>
          {list.length > 0 &&
            <Button className={classes.submit} onClick={addPrescription} >submit</Button>
          }
        </Box>
      </Box>

    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

export default connect(null, mapDispatchToProps)(MedicineList)