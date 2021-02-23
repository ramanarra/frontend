const intialState = {
  socket: null,
  timer: null,
  patientAppointmentId: null,
  openSideBar: true,
  session: undefined,
  messages: {},
  prescription: [],
  icon: true,
  lastRead: {},
}

const doctor = (state = intialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET': {
      return { ...state, socket: action.data }
    }

    case 'SET_TIMER': {
      return { ...state, timer: action.data }
    }

    case 'SET_OPENSIDEBAR': {
      return { ...state, openSideBar: action.data }
    }

    case 'SET_PATIENTAPPOINTMENTID': {
      return { ...state, patientAppointmentId: action.data }
    }

    case 'SET_SESSION': {
      return { ...state, session: action.data }
    }

    // case 'MARK_AS_READ': {
    //   const stemp = state.messages[action.appointmentId] ?? []

    //   return {
    //     ...state,
    //     messages: {
    //       ...state?.messages,
    //       [action.appointmentId]: stemp.map((i) => {
    //         if (i === action.index) {
    //           return { ...i, read: true }
    //         }
    //         return i
    //       }),
    //     },
    //   }
    // }

    case 'MARK_AS_READ': {
      if (state.lastRead[action.appointmentId] !== action.index) {
        return {
          ...state,
          lastRead: {
            ...state.lastRead,
            [action.appointmentId]: action.index,
          },
        }
      }
      return state
    }

    case 'SET_MESSAGES': {
      if (!!action.appointmentId) {
        const stemp = state.messages[action.appointmentId] ?? []

        return {
          ...state,
          messages: {
            ...state?.messages,
            [action.appointmentId]: [...stemp, action.data],
          },
        }
      } else {
        return state
      }
    }

    case 'SET_PRESCRIPTION': {
      return { ...state, prescription: action.data }
    }

    case 'SET_ICON': {
      return { ...state, icon: action.data }
    }

    case 'CLEAR_MESSAGES': {
      return { ...state, messages: {} }
    }

    case 'CLEAR_CHAT_MESSAGE': {
      if (action?.payload) {
        const ctemp = state.messages
        delete ctemp[action.payload]

        return {
          ...state,
          messages: ctemp,
        }
      } else return state
    }

    default:
      return state
  }
}

export default doctor
