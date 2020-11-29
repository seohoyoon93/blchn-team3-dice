import { SET_USER, REMOVE_USER } from '../actionTypes'

export const setUser = user => ({
  type: SET_USER,
  user,
})

export const removeUser = () => ({
  type: REMOVE_USER
})