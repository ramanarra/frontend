const intialState = {
  socket: null,
  timer: null,
  patientAppointmentId: null,
  openSideBar: true,
  session: undefined,
  messages: [],
  prescription:[],
}

const doctor = (state = intialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET': {
      return {...state, socket: action.data }
    }

    case 'SET_TIMER': {
      return {...state, timer: action.data}
    }

    case 'SET_OPENSIDEBAR': {
      return {...state, openSideBar: action.data }
    }


    case 'SET_PATIENTAPPOINTMENTID': {
      return {...state, patientAppointmentId: action.data}
    }

    case 'SET_SESSION': {
      return {...state, session: action.data}
    }

    case 'SET_MESSAGES': {
      return {...state, messages: [...state.messages, action.data]}
    }

    case 'SET_PRESCRIPTION':{
      return{...state,prescription:action.data}
    }

    case 'CLEAR_MESSAGES': {
      return {...state, messages: action.data}
    }

    default:
      return state
  }
}

export default doctor
