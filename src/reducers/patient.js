const initialState = {
  patientName: null,
  patientProfile: null
}

const patient = (state = initialState, action) => {
  switch (action.type) {
    case 'PATIENT_NAME': {
      return { ...state, patientName: action.data }
    }

    case 'PATIENT_PROFILE': {
      return { ...state, patientProfile: action.data }
    }

    case 'PATIENT_APPOINTMENT_LIST': {
      return { ...state, appointmentList: action.data }
    }

    case 'PATIENT_APPOINTMENT': {
      return { ...state, appointment: action.data }
    }

    case 'IS_PAST': {
      return { ...state, isPast: action.data }
    }

    default:
      return state
  }
}
export default patient