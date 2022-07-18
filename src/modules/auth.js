import {REACT_APP_BE_HOST} from '@env'
import axios from 'axios'

export const doLogin = (body) => {
  return axios.post(`${REACT_APP_BE_HOST}/auth`, body)
}

export const doRegister = (body) => {
  return axios.post(`${REACT_APP_BE_HOST}/auth/new`, body)
}

export const getProfile = (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return axios.get(`${REACT_APP_BE_HOST}/users`, config)
}