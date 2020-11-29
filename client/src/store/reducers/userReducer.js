import { SET_USER, REMOVE_USER } from '../actionTypes'

const initialState = {
  account: null,
  balance: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        account: action.user.account,
        balance: action.user.balance,
      }

    case REMOVE_USER:
      return initialState

    default:
      return state
  }
}

export default userReducer;