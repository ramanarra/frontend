const intialState = {
  key: null,
}

const doctor = (state = intialState, action) => {
  switch (action.type) {
    case 'UPDATE_DOC_KEY': {
      return { ...state, key: action.key }
    }

    default: return state
  }
}

export default doctor
