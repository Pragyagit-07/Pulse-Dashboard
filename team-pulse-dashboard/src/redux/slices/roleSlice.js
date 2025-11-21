import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: "member",   // 'lead' or 'member'
    currentUser: null        // actual user object
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { switchRole, setCurrentUser } = roleSlice.actions;
export default roleSlice.reducer;
