import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userData: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.userData = action.payload
      state.error = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userData = null
    },
    updateProfile: (state, action) => {
      state.userData = { ...state.userData, ...action.payload }
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { login, logout, updateProfile, setError } = userSlice.actions
export default userSlice.reducer

