import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginData: {},
  token: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  emailVerificationSuccess: false,
  isErrorMessage: "",
  signupData: {}
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = ""
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true
        state.isError = false;
        state.loginData = action.payload;
        state.token = action.payload?.token
        localStorage.setItem("token", action.payload?.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false
        state.isError = true;
        state.isErrorMessage = action.payload || "login failed"
      })


    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false
        state.isError = false;
        state.isErrorMessage = ""
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true
        state.isError = false;
        state.signupData = action.payload;
        state.token = action.payload?.emailVerificationTOken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false
        state.isError = true;
        state.isErrorMessage = action.payload || "failed register"
      });



    builder
      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.emailVerificationSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "Email verification failed";
      });
  },
});


export default loginSlice.reducer;


export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (user) => {
    try {
      const response = await axios.post("https://node-js-wse4.onrender.com/user/login", user);
      // console.log(response.data.data, "login response")
      return response.data.data
    } catch (error) {
      console.log(error)
    }
  }
)


export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (user) => {
    try {
      const response = await axios.post("https://node-js-wse4.onrender.com/user", user);
      return response.data.data
      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
)

export const verifyEmail = createAsyncThunk(
  "VERIFY/USER",
  async (verification) => {
    const { id, token } = verification
    try {
      const response = await axios.get(`https://node-js-wse4.onrender.com/user/email/verification?token=${token}&userId=${id}`);
      // console.log(response, "verification response")
      return response.data.data


    } catch (error) {
      console.log("failed to send email", error)
    }
  }
)