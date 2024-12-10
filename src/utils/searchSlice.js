import { createSlice } from "@reduxjs/toolkit";

const MAX_CACHE_SIZE = 50;

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: {},
    keyOrder: [],
  },
  reducers: {
    cacheResults: (state, action) => {
      for (const [key, newResults] of Object.entries(action.payload)) {
        // Check if the key already exists in the store
        if (!state.data[key]) {
          // reached the limit, remove the oldest key
          if (state.keyOrder.length >= MAX_CACHE_SIZE) {
            const oldestKey = state.keyOrder.shift();
            delete state.data[oldestKey];
          }
          // Add the new key to keyorder array
          state.keyOrder.push(key);
        }
        // Add the new results
        state.data[key] = [...(state.data[key] || []), ...newResults];
      }
    },
  },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
