"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { resetLink } from "@/redux/slice/authSlice";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirm_password: yup
    .string()
    .min(6, "Confirm password must be at least 6 characters")
    .required("Confirm password is required"),
});

export default function ResetLink() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const [showPass, setShowPass] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const { loading } = useSelector((state) => state.auth);

  const userId = params.userId;
  const token = params.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdate = async (data) => {
    const newPassword = {
      password: data.password,
      confirm_password: data.confirm_password,
    };

    try {
      const response = await dispatch(
        resetLink({ userId, token, newPassword })
      ).unwrap();

      if (response.status === true) {
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
        Change Password
      </Typography>

      <form onSubmit={handleSubmit(handleUpdate)}>
        {/* NEW PASSWORD */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <TextField
            fullWidth
            variant="standard"
            label="New Password"
            type={showPass ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <IconButton
            onClick={() => setShowPass(!showPass)}
            sx={{ position: "absolute", right: 0, top: "25%", fontSize:"16px" }}
          >
            <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
          </IconButton>
        </Box>

        {/* CONFIRM PASSWORD */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <TextField
            fullWidth
            variant="standard"
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            {...register("confirm_password")}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />

          <IconButton
            onClick={() => setShowConfirm(!showConfirm)}
            sx={{ position: "absolute", right: 0, top: "25%" , fontSize:"16px" }}
          >
            <FontAwesomeIcon icon={showConfirm ? faEye : faEyeSlash} />
          </IconButton>
        </Box>

        {/* BUTTON */}
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
            "Change Password"
          )}
        </Button>
      </form>
    </Box>
  </Box>
);
}