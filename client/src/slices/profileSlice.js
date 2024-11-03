import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, //image of the user
    type: localStorage.getItem("type") ? JSON.parse(localStorage.getItem("type")) : null, //AccountType
    userDetail: localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem("userDetail")) : null,//userDetail
}

const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers:{
        setUser :(state,action)=>{
        state.user =action.payload;  
        localStorage.setItem("user",JSON.stringify(action.payload)); 
        },
        setType: (state,action)=>{
            state.type = action.payload;
            localStorage.setItem("type",JSON.stringify(action.payload));
        },
        setUserDetail :(state,action)=>{
            state.userDetail = action.payload;
            localStorage.setItem("userDetail",JSON.stringify(action.payload));
        }

  }
})

export const {setUser ,setType,setUserDetail} =profileSlice.actions;
export default profileSlice.reducer;