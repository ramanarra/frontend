import { combineReducers } from 'redux'

import doctor from './doctor'
import patientReducer from './patient'
import hospitalReducer from './hospital'


export default combineReducers({
    doctor,
    patient : patientReducer,
    hospital : hospitalReducer,
})
