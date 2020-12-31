import React, { useState,useEffect } from 'react'
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
import SnackBar from '../../components/SnackBar'
import { setPrescription, setIcon } from '../../actions/doctor'
function MedicineListEntry({ list }) {
  const classes = usestyle()

  return (
    <div >

      <table className={classes.table}>

        <thead style={{ fontSize: 14 }} className={classes.head}>
          <tr>
            <th
              style={{ width: '25%' , textAlign: 'left'}}
            >Medicine</th>
            <th
              style={{ width: '25%' , textAlign: 'left' }}
            >Quantity/Dose</th>
            <th
              style={{ width: '25%' , textAlign: 'left' }}
            >Consumption comments</th>
          </tr>
        </thead>

        <tbody >
          {list.length > 0 &&
            list.map((data) =>
              <tr style={{ fontSize: 15, textAlign: 'center', color: '#595959' }} >
                <td
                  style={{ paddingBottom: '15px', wordBreak: 'break-word', textAlign: 'left' }}

                >
                  {data.nameOfMedicine}
                </td>
                <td
                  style={{ paddingBottom: '15px', wordBreak: 'break-word', textAlign: 'left' }}
                >
                  {data.countOfDays}
                </td>
                <td className={"content"}
                  style={{ paddingBottom: '15px' ,wordBreak:'break-word' , textAlign: 'left'}}
                >
                   <span class="tooltiptext"> {data.doseOfMedicine}</span>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

function MedicineList({ onClose, setOpenTopBar, setOpenSideBar, appointmentId, setPrescription, prescription, icon, setIcon }) {
  const classes = usestyle()
  const currentDate = moment().format('DD/MM/YYYY')
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [seperate, setCeperate] = useState(false)
  const [existList, setExistList] = useState([])
  const [index, setIndex] = useState(null)
  const [close, setClose] = useState(true)
  const [updateData, error, loading, data] = useManualFetch()
  var id = appointmentId
  console.log(appointmentId, icon)
  useEffect(() => {
    setPrescription(prescription)
    console.log(prescription)
    setList(prescription);
    if (appointmentId === "null") {
      list([]);
    }
  }, [])

  function handleOnClose() {
    onClose()
    setOpenTopBar(false)
    setOpenSideBar(false)
  }
  const [opens,setOpens]=useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpens(false)
  }


  function handleOnMedicine(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, nameOfMedicine: value }
      return i
    }))
  }
  function handleOnMedicinecountOfDays(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, countOfDays: value }
      return i
    }))
  }

  function handleRemoveMedicine(subIndex, type) {
    console.log('handleRemoveMedicine');

    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, minus: 'value' }
      return i
    }))
  }

  function handleOndoseOfMedicine(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, doseOfMedicine: value }
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
      setPrescription(medicineList)
    }
    else {
      let newList = [...list]
      medicineList.map(list => {
        newList.push(list)
      })
      setList(newList)
      setPrescription(newList)
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
    setOpens(true)
    setClose(false);
    setIcon(false);



  }

  


  return (
    <Box>
      <Box className={classes.backButton}>
        <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
      </Box>

      <Box className={classes.container}>
        <Box className={classes.date}>
          <Typography>Date: </Typography>
          <Typography style={{ color: '#363838' }}>{currentDate}</Typography>

          {list.length > 0 && icon &&
            <Button onClick={() => handleOnEdit()} className={classes.edit}>
              <EditIcon color="primary" />
            </Button>
          }


        </Box>

        <Box>
          {list.length > 0 &&
            <MedicineListEntry list={list} handleOnMedicine={handleOnMedicine} handleOnEdit={handleOnEdit}
              handleOndoseOfMedicine={handleOndoseOfMedicine} handleOnMedicinecountOfDays={handleOnMedicinecountOfDays}
            />}
        </Box>
        {appointmentId && icon &&
          <Box className={classes.add}>

            <Button className={classes.added} onClick={handlesubscription} color="primary" >+ Add Prescription</Button>
          </Box>
        } 
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
          {list.length > 0 && icon &&
            <Button className={classes.submit} onClick={addPrescription} >submit</Button>
          }
        </Box>
      </Box>
      { data && data?.length > 0 && (
        <SnackBar
          openDialog={opens}
          message={'Prescription added successfully'}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      
    </Box>

  )
}

const mapStateToProps = (state) => {
  return {
    prescription: state.doctor.prescription,
    icon: state.doctor.icon,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
    setPrescription: (data) => dispatch(setPrescription(data)),
    setIcon: (data) => dispatch(setIcon(data)),
  }
}

export default connect(  mapStateToProps , mapDispatchToProps)(MedicineList)