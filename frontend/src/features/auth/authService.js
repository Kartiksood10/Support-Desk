// axios - js library used to make http requests
// http requests - request made by the client to access data on a server
import axios from 'axios'

const API_URL = '/api/users/'

// Register user
// sends post request to create a new user via axios
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    // if user found, userdata stored in local storage so that user stays logged in on refresh
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
// removes user from local storage
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login,
}

export default authService
