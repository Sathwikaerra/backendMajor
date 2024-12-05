import {configureStore, createSlice} from '@reduxjs/toolkit'

 const userSlice=createSlice({
    name:"user",
    initialState:{isloggedIn:false,
        currentUser:null
    },
    reducers:{
        login:(state)=>{
          state.isloggedIn=true
        },
        loginSuccess:(state,action)=>{
          console.log("inlogin",action.payload)
          state.currentUser=action.payload
        },
        logout:(state)=>{
            localStorage.removeItem("UserEmail")
            localStorage.removeItem("UserId")
            localStorage.removeItem("UserName")
            state.currentUser=null

         

            state.isloggedIn=false},
            IncreaseCount(state){
                state.CartCount=state.CartCount+1;
            },
            DecreaseCount:(state,payload)=>{
                state.CartCount=state.CartCount-1;

            },
            
    }
})

 const adminSlice=createSlice({
    name:"admin",
    initialState:{isloggedIn:false},
    reducers:{
        login(state){
           

            state.isloggedIn=true},
        logout(state){
            localStorage.removeItem("AdminName")
            localStorage.removeItem("AdminId")
            localStorage.removeItem("token")
            localStorage.removeItem("AdminEmail")
            state.isloggedIn=false}
    }
})
 




const cartSlice = createSlice({
  name: "cart",
  initialState:{
    CartCount:0,
  },
  reducers: {
    IncreaseCount(state){
      state.CartCount=state.CartCount+1;
  },
  DecreaseCount(state,payload){
      state.CartCount=state.CartCount-1;

  },

  SetNull(state)
  {
    state.CartCount=0;

  },
  },
});

// Export actions


// Export reducer



export const cartReducer= cartSlice.reducer;
export const userReducer = userSlice.reducer;
export const adminReducer = adminSlice.reducer;

// Export Actions
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;
export const cartActions = cartSlice.actions;



