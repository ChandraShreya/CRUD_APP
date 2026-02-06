
"use client";

import { authRegistration } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  profileImage: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileExist",
      "Please select an image",
      (value) => value && value.length > 0
    )
    .test("fileType", "Unsupported file format", (value) =>
      value && value.length > 0
        ? ["image/jpeg", "image/jpg", "image/gif"].includes(value[0].type)
        : false
    ),
});

export default function Register() {
  // let {email}=useSelector((item)=>item.auth)

  // console.log(email,"hjh")


  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter()


  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImg(file);
      clearErrors("profileImage");
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleClick = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", img);




    try {
      let res = await dispatch(authRegistration(formData)).unwrap();
      console.log(res, "ggghjcd")
      if (res.status == true) {
        router.push("/auth/otp")
      } else {
        router.push("/auth/signUp")
      }


    } catch (error) {

    }

  };

  return (
    <div className="auth-wrapper">

      <h1 className="page-title">Register</h1>
      <div className="auth-container">
        <form onSubmit={handleSubmit(handleClick)}>
          <div>
            <label>First Name:</label>
            <input {...register("name")} style={{ border: "2px solid #fff", margin: "10px" }} />
            {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
          </div>


          <div>
            <label>Address:</label>
            <input {...register("address")} style={{ border: "2px solid #fff", margin: "10px" }} />
            {errors.address && <span style={{ color: "red" }}>{errors.address.message}</span>}
          </div>


          <div>
            <label>Email:</label>
            <input {...register("email")} style={{ border: "2px solid #fff", margin: "10px" }} />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
          </div>


          <div>
            <label>Password:</label>
            <input type="password" {...register("password")} style={{ border: "2px solid #fff", margin: "10px" }} />
            {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
          </div>


          <div>
            <label>Confirm Password:</label>
            <input type="password" {...register("confirmPassword")} style={{ border: "2px solid #fff", margin: "10px" }} />
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
            )}
          </div>


          <div>
            <label>Profile Image:</label>
            <input type="file" {...register("profileImage")} onChange={imageChange} />
            {errors.profileImage && (
              <span style={{ color: "red" }}>{errors.profileImage.message}</span>
            )}
          </div>

          {img && (
            <div>
              <img
                src={URL.createObjectURL(img)}
                alt="Preview"
                style={{ width: "150px", marginTop: "10px" }}
              />
            </div>
          )}


          <button type="submit" style={{ border: "1px solid #fff", padding: "10px", borderRadius: "12px" }}>Register</button>
        </form>

      </div>


    </div>
  );
}
