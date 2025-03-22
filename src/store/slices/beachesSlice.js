import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import beachesData from "../../data/beaches.json"

export const fetchBeaches = createAsyncThunk("beaches/fetchBeaches", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // For now, we'll just return the imported JSON data
    return beachesData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const beachesSlice = createSlice({
  name: "beaches",
  initialState: {
    items: [],
    filteredItems: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filters: {
      rating: 0,
      minPrice: 0,
      maxPrice: 10000,
      amenities: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredItems = state.items.filter((beach) => {
        const ratingMatch = beach.rating >= state.filters.rating
        const priceMatch = beach.pricePerDay >= state.filters.minPrice && beach.pricePerDay <= state.filters.maxPrice
        const amenitiesMatch =
          state.filters.amenities.length === 0 ||
          state.filters.amenities.every((amenity) => beach.amenities.includes(amenity))
        return ratingMatch && priceMatch && amenitiesMatch
      })
    },
    searchBeaches: (state, action) => {
      const searchTerm = action.payload.toLowerCase()
      state.filteredItems = state.items.filter(
        (beach) =>
          beach.name.toLowerCase().includes(searchTerm) || beach.description.toLowerCase().includes(searchTerm),
      )
    },
    resetFilters: (state) => {
      state.filters = {
        rating: 0,
        minPrice: 0,
        maxPrice: 10000,
        amenities: [],
      }
      state.filteredItems = state.items
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeaches.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchBeaches.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchBeaches.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { setFilters, searchBeaches, resetFilters } = beachesSlice.actions
export default beachesSlice.reducer

