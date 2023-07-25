import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from '../../utils'

// Implementing authentication using redux and redux toolkit

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

// Creating two states user and isLoading(if login/register process is ongoing)

const initialState = {
  user: user ? user : null,
  isLoading: false,
}

// Defining different actions using asyncthunk

// Register new user
// asynchronous actions are created using createAsyncThunk
// async await functions are functions that run in any order, and run when awaited data is received
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const logout = createAction('auth/logout', () => {
  authService.logout()
  // return an empty object as our payload as we don't need a payload but the
  // prepare function requires a payload return
  return {}
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder

      // if pending, isLoading is true
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      // if fulfilled, isLoading false
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default authSlice.reducer
