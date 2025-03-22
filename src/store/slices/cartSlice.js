import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, pricePerDay, days = 1 } = action.payload
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        existingItem.days += days
        existingItem.total = existingItem.pricePerDay * existingItem.days
      } else {
        state.items.push({
          id,
          name,
          pricePerDay,
          days,
          total: pricePerDay * days,
        })
      }

      state.total = state.items.reduce((sum, item) => sum + item.total, 0)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.total, 0)
    },
    updateQuantity: (state, action) => {
      const { id, days } = action.payload
      const item = state.items.find((item) => item.id === id)

      if (item) {
        item.days = days
        item.total = item.pricePerDay * days
        state.total = state.items.reduce((sum, item) => sum + item.total, 0)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

