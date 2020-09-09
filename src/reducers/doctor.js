const intialState = {
  isPatientClicked: false,
}

const doctor = (state = intialState, action) => {
  switch (action.type) {
    case 'SET_PATIENT_CLICK': {
      return { ...state, isPatientClicked: action.data }
    }

    default:
      return state
  }
}

export default doctor
