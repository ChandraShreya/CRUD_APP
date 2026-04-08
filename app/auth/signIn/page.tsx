

"use client";

import React, { useEffect, useRef, useState } from "react";
// import styles from "./login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "@/redux/slice/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Cookies } from "react-cookie";
import styles from "../signIn/signIn.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
// import Button from "@/components/buttonLoader/button";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
 const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  let cookies = new Cookies();

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
      router.push("/product/productList");
    } else {
      toast.error(response.payload?.message || "Login failed");
    }
    
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
        backgroundRepeat: "no-repeat",
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
          maxWidth: "900px",
          display: "flex",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            background: "#fff",
            p: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#5c2c1c",
              mb: 3,
              fontFamily: "Playfair Display, serif",
            }}
          >
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <TextField
              fullWidth
              variant="standard"
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 3 }}
            />

            {/* PASSWORD */}
            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "30%",
                  p: "4px",
                }}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  style={{ fontSize: "16px" }}
                />
              </IconButton>
            </Box>

            {/* SUBMIT BUTTON WITH WAVE LOADER */}
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                background: "#5c2c1c",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                color: "#fff",
                "&:hover": {
                  background: "#3e1d13",
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", gap: "4px" }}>
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
                      0%, 60%, 100% {
                        transform: translateY(0);
                      }
                      30% {
                        transform: translateY(-6px);
                      }
                    }
                  `}
                  </style>
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* LINKS */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography sx={{ fontSize: "14px" }}>
              Don’t have an account?{" "}
              <Link href="/auth/signUp" style={{ color: "#5c2c1c", fontWeight: "bold" }}>
                Sign Up
              </Link>
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Link href="/auth/resetEmail" style={{ fontSize: "13px", color: "#6d4c41" }}>
                Forgot password?
              </Link>
              <Typography component="span" sx={{ mx: 1 }}>
                |
              </Typography>
              <Link href="/auth/updatePassword" style={{ fontSize: "13px", color: "#6d4c41" }}>
                Update password
              </Link>
            </Box>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            width: "50%",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#efe3d3",
            textAlign: "center",
            p: 5,
          }}
        >
          <Typography
            sx={{
              letterSpacing: 3,
              fontWeight: 600,
              color: "#5c3d2e",
              mb: 2,
            }}
          >
            WELCOME TO
          </Typography>


          <Box
            component="img"
            src="/images/coffee_img.png"
            alt="coffee logo"
            sx={{
              width: 120,
              mb: 2,
            }}
          />


          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#5c2c1c",
              fontFamily: "Playfair Display, serif",
            }}
          >
            Coffee House
          </Typography>

          <Typography sx={{ mt: 2, color: "#6d4c41", fontSize: "14px" }}>
            Experience the best coffee crafted with love and passion.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
