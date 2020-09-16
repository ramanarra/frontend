const intialState = {
  socket: null,
  timer: null,
}

const doctor = (state = intialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET': {
      return { ...state, socket: action.data }
    }

    case 'SET_TIMER': {
      return {...state, timer: action.data}
    }

    default:
      return state
  }
}

export default doctor
