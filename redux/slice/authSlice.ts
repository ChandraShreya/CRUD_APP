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
import { Cookies } from "react-cookie";
import { error } from "console";
import { stat } from "fs";

const initialState = {
  userId: null,
  email: null,
  token: null,
  isloggedIn: false,
  loading: false,
  error: null,
  name:"",
  profileImage:""
};

let cookie = new Cookies()
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

/*reset email*/
export const resetEmail = createAsyncThunk(
  "resetEmail",
  async (payload) => {
    const response = await axiosInstance.post(
      endpoints.auth.resetEmail,
      payload
    );
    return response.data;
  }
);
/*reset link*/
export const resetLink = createAsyncThunk(
  "resetLink",
  async ({ userId, token, newPassword }) => {
    const response = await axiosInstance.post(
      `${endpoints.auth.resetLink}/${userId}/${token}`,
      newPassword
    );
    return response.data;
  }
);
/*update password*/
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (payload) => {
    const response = await axiosInstance.put(
      endpoints.auth.updatePassword,
      payload
    );
    return response.data;
  }
);

export const profileDetails = createAsyncThunk(
  "profileDetails",
  async () => {
    const response = await axiosInstance.get(
      endpoints.auth.profileDetails
    )
    console.log("list" , response)
    return response.data
  }
)

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userId = null
      state.email = null
      state.token = null
      toast("Logout sucessfull")
      state.isloggedIn = false

    },

    checkToken: (state, action) => {
      let token = cookie.get("token")
      if (token !== null && token !== undefined) {
        state.isloggedIn = true
      }
    }
  },

  extraReducers: (builder) => {
    builder
      /*register*/
      .addCase(authRegistration.pending, (state, { payload }) => {
        state.loading = true,
          state.error = null
      })

      .addCase(authRegistration.fulfilled, (state, { payload }) => {
        state.loading = false
        if (payload.status == true) {
          localStorage.setItem("Id", payload.user.id)
          localStorage.setItem("email", payload.user.email)
          localStorage.setItem("name", payload.user.name);
          state.email = payload.user.email

          toast.success(payload.message)
        }
      })

      .addCase(authRegistration.rejected, (state, { payload }) => {
        state.loading = false

      })

      /*login*/
      .addCase(authLogin.pending, (state, { payload }) => {
        state.loading = true
        state.error = null
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        if (payload.status == true) {
          state.isloggedIn = true
        }
      })
      .addCase(authLogin.rejected, (state, { payload }) => {
        state.loading = false
      })

      /*verifyOtp*/
      .addCase(verifyOtp.pending, (state, { payload }) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.loading = false
        toast.success("OTP verified successfully")
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.loading = false
        toast.error("OTP verification failed")
      });

    /*reset email*/
    builder
      .addCase(resetEmail.pending, (state, { payload }) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetEmail.fulfilled, (state, { payload }) => {
        state.loading = false
        toast.success("Reset link sent to your email")
      })
      .addCase(resetEmail.rejected, (state, { payload }) => {
        state.loading = false
        toast.error("Failed to send reset link")
      });

    /*reset link*/
    builder
      .addCase(resetLink.pending, (state, { payload }) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetLink.fulfilled, (state, { payload }) => {
        state.loading = false
        toast.success("Password reset successful")
      })
      .addCase(resetLink.rejected, (state, { payload }) => {
        state.loading = false
        toast.error("Password reset failed")
      });
    /*update password*/
    builder
      .addCase(updatePassword.pending, (state, { payload }) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false
        toast.success("Password updated successfully")
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false
        toast.error("Failed to update password")
      });

    builder
      .addCase(profileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(profileDetails.fulfilled, (state, action) => {
  state.loading = false;

  if (action.payload?.status === true) {
    const user = action.payload.data; 

    state.userId = user?._id || null;
    state.email = user?.email || null;
    state.name = user?.name || "";
    state.address= user?.address || ""
   state.profileImage = `http://localhost:4000${user.imagePath}`;
  }
})

      .addCase(profileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      });



  },
});

export default authSlice;
export const { logout, checkToken } = authSlice.actions
