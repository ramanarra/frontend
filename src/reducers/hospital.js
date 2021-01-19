const initialState = {
    hospitalName : null,
    hospitalProfile : null
}

const hospital = (state = initialState, action) => {
    switch (action.type) {
      case 'HOSPITAL_NAME': {
        return {...state, hospitalName: action.data }
      }

      case 'HOSPITAL_PROFILE': {
        return {...state, hospitalProfile: action.data }
      }

      default:
            return state  
    }
}
export default hospital