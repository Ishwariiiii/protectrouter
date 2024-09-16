import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "../redux/authentication/authSlice"
import userReducer from "../redux/users/userSlice"
const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
    }
})
export default store