"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/redux/slice/authSlice";
import { log } from "util";
// import Button from "@/components/buttonLoader/button";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { log } from "console";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters")
    .max(20, "New password cannot exceed 20 characters")
    .required("New password is required"),
});

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showOld, setShowOld] = useState(false);
const [showNew, setShowNew] = useState(false);
const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

const onSubmit = async (data) => {
  

  const updateData = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  };

  try {
    let response = await dispatch(updatePassword(updateData)).unwrap();

    if (response?.success === true) {
      router.push("/auth/signIn");
    }
  } catch (error) {
    console.log("error", error);
  }

  
};

return (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      backgroundImage: "url('/images/carousel-2.jpg')",
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
        maxWidth: "420px",
        background: "#fff",
        borderRadius: "16px",
        p: 4,
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
      }}
    >
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: "bold",
          color: "#5c2c1c",
          mb: 3,
          textAlign: "center",
          fontFamily: "Playfair Display, serif",
        }}
      >
        Update Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* OLD PASSWORD */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <TextField
            fullWidth
            variant="standard"
            label="Current Password"
            type={showOld ? "text" : "password"}
            {...register("oldPassword")}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
          />

          <IconButton
            onClick={() => setShowOld(!showOld)}
            sx={{ position: "absolute", right: 0, top: "25%",fontSize:"16px" }}
          >
            <FontAwesomeIcon icon={showOld ? faEye : faEyeSlash} />
          </IconButton>
        </Box>

        {/* NEW PASSWORD */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <TextField
            fullWidth
            variant="standard"
            label="New Password"
            type={showNew ? "text" : "password"}
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <IconButton
            onClick={() => setShowNew(!showNew)}
            sx={{ position: "absolute", right: 0, top: "25%" , fontSize:"16px" }}
          >
            <FontAwesomeIcon icon={showNew ? faEye : faEyeSlash} />
          </IconButton>
        </Box>

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
            "Update Password"
          )}
        </Button>
      </form>
    </Box>
  </Box>
);
}