import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";


const ProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    changeProfile: (state, action) => {
      return action.payload;  // ✅ correct
    },
    setProfile: (state, action) => {
      return action.payload;  // ✅ correct
    }
  },
});

export const { changeProfile, setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;

