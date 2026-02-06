// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState={
//     data:[] as any[]
// }

// export const productList = createAsyncThunk("productList", async () => {
//   const response = await axios.get("/auth/register");
//   return response.data;
// });

// const authSlice = createSlice({
//   name: "authSlice",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(productList.pending, (state, { payload }) => {})
//       .addCase(productList.fulfilled, (state, { payload }) => {
//         state.data = payload.data;
//       })
//       .addCase(productList.rejected, (state, { payload }) => {});
//   },
// });

// export default authSlice;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AxiosInstance from "@/api/axios/axios";
// import { endpoints } from "@/api/endPoints/endpoints";


//  export const registerUser = createAsyncThunk(
//   "registerUser",
//   async (formData,{ rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.post(
//         endpoints.auth.signUp,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Registration failed");
//     }
//   }
// );  

// const authSlice = createSlice({
//   name: "authSlice",
//   initialState: {
//     loading: false,
//     user: null,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;

//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice;
// export {registerUser}



"use client"
import { extractEtag } from "next/dist/server/image-optimizer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import axiosInstance from "@/api/axios/axios";
// import { endpoints } from "@/api/endPoints/endpoints";
import { toast } from "sonner";
import { endpoints } from "@/api/endPoints/endPoints";

const initialState = {
  userId:null,
  email:null,
  token:null
};

/*signUp*/
export const authRegistration = createAsyncThunk(
  "authRegistration",
  async (payload) => {
    const response = await axiosInstance.post(endpoints.auth.signUp, payload);

    return response.data;
  }
);

/*SignIn*/
export const authLogin = createAsyncThunk(
  "authLogin",
  async (payload) => {
    const response = await axiosInstance.post(
      endpoints.auth.signIn,
      payload
    );
    return response.data;
  }
);

/*verifyOtp*/
export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async (payload) => {
    const response = await axiosInstance.post(
      endpoints.auth.verifyOtp,
      payload
    );
    return response.data;
  }
);




const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout:(state,action)=>{
      state.userId=null
      state.email=null
      state.token=null

    }
  },

  extraReducers: (builder) => {
    builder
      /*register*/
      .addCase(authRegistration.pending, (state, { payload }) => { })

      .addCase(authRegistration.fulfilled, (state, { payload }) => {
        if (payload.status == true) {
          localStorage.setItem("Id", payload.user.id)
          localStorage.setItem("email" , payload.user.email)
          // state.email=payload.user.email
          toast.success(payload.message)
        }
      })

      .addCase(authRegistration.rejected, (state, { payload }) => { })

      /*login*/
      .addCase(authLogin.pending, () => { })
      .addCase(authLogin.fulfilled, () => { })
      .addCase(authLogin.rejected, () => { })

      /*verifyOtp*/
      .addCase(verifyOtp.pending, () => { })
      .addCase(verifyOtp.fulfilled, () => { })
      .addCase(verifyOtp.rejected, () => { });

  },
});

export default authSlice;
export const {logout}=authSlice.actions
