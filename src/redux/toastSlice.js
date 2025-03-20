import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: Date.now(),
      text: "",
      status: "success",
    },
  ]
}

const toastSlice = createSlice({
  name: "toast",
  initialState
});

export default toastSlice.reducer;