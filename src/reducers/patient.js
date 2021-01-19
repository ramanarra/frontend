const initialState = {
    patientName : null,
    patientProfile : null
}

const patient = (state = initialState, action) => {
    switch (action.type) {
      case 'PATIENT_NAME': {
        return {...state, patientName: action.data }
      }

      case 'PATIENT_PROFILE': {
        return {...state, patientProfile: action.data }
      }

      default:
            return state  
    }
}
export default patient