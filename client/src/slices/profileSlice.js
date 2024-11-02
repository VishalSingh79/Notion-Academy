import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, //image of the user
    type: localStorage.getItem("type") ? JSON.parse(localStorage.getItem("type")) : null, //AccountType
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
        }


  }
})

export const {setUser ,setType} =profileSlice.actions;
export default profileSlice.reducer;