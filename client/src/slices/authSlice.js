import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    signUpData : null ,
    email:null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken :(state,action)=>{
        state.token =action.payload;
        localStorage.setItem("token",JSON.stringify(action.payload));
        },
        setSignUpData : (state ,action)=>{
            state.signUpData = action.payload;
        },
        setForgotEmail :(state,action)=>{
            state.email = action.payload;
        }

  }
})

export const {setToken,setSignUpData ,setForgotEmail} =authSlice.actions;
export default authSlice.reducer;