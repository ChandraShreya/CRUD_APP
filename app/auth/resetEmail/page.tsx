"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { resetEmail } from "@/redux/slice/authSlice";
import styles from "../resetEmail/resetEmail.module.css"
import { Box, Button, TextField, Typography } from "@mui/material";



const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ResetEmail() {
  const dispatch = useDispatch();
  const router = useRouter();
const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = async (data) => {
    // setLoading(true)
    const resetData = {
      email: data.email,
    };

    try {
      const response = await dispatch(resetEmail(resetData)).unwrap();

      if (response.status === true) {
        // alert(response.message);

        sessionStorage.setItem("token", response.token);

        // router.push("/")  // optional navigation
      } 
    } catch (error) {
      console.log("error");
    }
    // setLoading(false)
  };

return (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      backgroundImage: "url('/images/carousel-3.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* OVERLAY */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
      }}
    />

    {/* CARD */}
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        background: "#fff",
        borderRadius: "16px",
        p: 4,
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: "bold",
          color: "#5c2c1c",
          mb: 3,
          fontFamily: "Playfair Display, serif",
        }}
      >
        Reset Password
      </Typography>

      <form onSubmit={handleSubmit(handleClick)}>
        <TextField
          fullWidth
          variant="standard"
          label="Enter your email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 3 }}
        />

        {/* BUTTON WITH LOADER */}
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: "30px",
            background: "#5c2c1c",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "#3e1d13",
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", gap: "4px", justifyContent: "center" }}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "6px",
                    height: "6px",
                    background: "#fff",
                    borderRadius: "50%",
                    animation: "wave 1.2s infinite ease-in-out",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}

              <style>
                {`
                  @keyframes wave {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-6px); }
                  }
                `}
              </style>
            </Box>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>
    </Box>
  </Box>
);
}