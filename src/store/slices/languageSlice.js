import { createSlice } from "@reduxjs/toolkit"

const languageSlice = createSlice({
  name: "language",
  initialState: {
    current: "ru", // Default language
  },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer

