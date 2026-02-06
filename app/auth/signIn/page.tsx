// "use client"

// import { authLogin } from "@/redux/slice/authSlice";
// // import { authLogin } from "@/redux/slice/authSlice";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { cookies } from "next/headers";
// import { useRouter } from "next/navigation";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import * as yup from "yup";
// const schema = yup.object({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Minimum 6 characters")
//     .max(20, "Maximum 20 characters")
//     .required("Password is required"),
// });

// export default function LoginPage() {
//   const router = useRouter()
//   const dispatch = useDispatch()
//   const selector = useSelector(state => state.auth)

//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try{
//       const result = dispatch(authLogin(data)).unwrap();
//       if(result.status === true){
//         cookies.set("token",result.token,{path:"/"})
//       }

//       // alert("login successful")


//       // setTimeout(() => router.push("/product/create"), 1500);

//     }catch(err){
//       setSuccess(false);
//       setMessage(err);
//     }

//   }

//   return (
//      <div>
//       <h2>
//         Login
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//             <input
//           {...register("email")}
//           placeholder="Email"

//         />
//         {errors.email && (
//           <p>{errors.email.message}</p>
//         )}
//         </div>

//         <div>
//             <input
//           {...register("password")}
//           type="password"
//           placeholder="Password"

//         />
//         {errors.password && (
//           <p>{errors.password.message}</p>
//         )}
//         </div>

//         <button
//         //   disabled={selector.loading}
//         //   className={`w-full mt-4 py-2 rounded text-white ${
//         //     selector.loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//         //   }`}
//         >
//           {/* {selector.loading ? "Loading..." : "Login"} */}
//           login
//         </button>
//       </form>

//       {/* {(message || selector.error) && (
//         <div
//           className={`mt-4 p-3 rounded text-center font-medium ${
//             success ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
//           }`}
//         >
//           {message || selector.error}
//         </div>
//       )} */}

//       {/* <div className="mt-6 text-center">
//         <Link href="/auth/reset-password-link" className="text-blue-600 underline">
//           Forgot Password?
//         </Link>
//       </div>

//       <div className="mt-4 text-center">
//         <span className="mr-2">Don’t have an account?</span>
//         <Link href="/auth/register" className="text-blue-600 font-semibold">
//           Create Account
//         </Link>
//       </div> */}
//     </div>
//   )
// }


"use client";

import React, { useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authLogin } from "@/redux/slice/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Cookies } from "react-cookie";




const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  let cookies = new Cookies()
  //show pop up to log in first
  const toastShown = useRef(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");

    if (message && !toastShown.current) {
      toast.error("Please Login first");
      toastShown.current = true;
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await dispatch(authLogin(data));

    if (response.payload?.status === true) {
      cookies.set("token", response.payload.token, { path: "/" });
      toast.success(response.payload.message || "Login successful");
      router.push("/product/createProduct");
    } else {
      toast.error(response.payload?.message || "Login failed");
    }
  };

  return (
    <>
      <h1 className="header" style={{ textAlign: "center" }}>Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <label>Email</label>
        <input placeholder="Enter registered email" {...register("email")} />
        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        )}

        <button type="submit">Login</button>

        {/* <Link href="/auth/update-password" className="navigate-text-link">
          Update Password?
        </Link> */}

        {/* <button type="button" onClick={() => router.push("/auth/reset-password")}>
          Forget Password
        </button> */}

        {/* <button type="button" onClick={() => router.push("/auth/register")}>
          Register
        </button> */}
      </form>
    </>
  );
}
