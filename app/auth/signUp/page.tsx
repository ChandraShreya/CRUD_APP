"use client";

import { authRegistration } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import styles from "../signUp/signUp.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
// import Button from "@/components/buttonLoader/button";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export default function Register() {
    const [img, setImg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const router = useRouter();

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
            if (res.status === true) {
                router.push("/auth/otp");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                inset: "0",
                minHeight: "100vh",
                maxWidth: "100vw",
                backgroundImage: "url('/images/carousel-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            {/* MAIN CARD */}
            <Box
                sx={{
                    width: { xs: "100%", md: "900px" },
                    display: "flex",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
            >
                {/* LEFT SIDE */}
                <Box
                    sx={{
                        width: "50%",
                        background: "#efe3d3",
                        p: 5,
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
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

                    <Typography sx={{ color: "#6d4c41", fontSize: "14px" }}>
                        Coffee is one of the world's most popular beverages. Thanks to its high
                        levels of antioxidants and beneficial nutrients.
                    </Typography>
                </Box>

                {/* RIGHT SIDE */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        background: "#ffffff",
                        p: 5,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#5c2c1c",
                            mb: 3,
                            fontFamily: "serif",
                        }}
                    >
                        Sign Up
                    </Typography>
                    <Box
  sx={{
    display: "flex",
    justifyContent: "flex-start",
    mb: 2,
  }}
>
  <Typography sx={{ fontSize: "14px", color: "#6d4c41" }}>
    Already have an account?{" "}
    <Box
      component="span"
      onClick={() => router.push("/auth/signIn")}
      sx={{
        color: "#5c2c1c",
        fontWeight: "bold",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      Sign In
    </Box>
  </Typography>
</Box>

                    <form onSubmit={handleSubmit(handleClick)}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Name"
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            variant="standard"
                            label="Address"
                            {...register("address")}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            variant="standard"
                            label="Email"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{ mb: 2 }}
                        />

                        {/* PASSWORD */}
                        <Box sx={{ position: "relative", mb: 2 }}>
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
                                sx={{ position: "absolute", right: 0, top: "25%", fontSize: "16px" }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </IconButton>
                        </Box>

                        {/* CONFIRM PASSWORD */}
                        <Box sx={{ position: "relative", mb: 2 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                            <IconButton
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                sx={{
                                    position: "absolute", right: 0, top: "25%", fontSize: "16px"
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEye : faEyeSlash}
                                />
                            </IconButton>
                        </Box>

                        {/* IMAGE UPLOAD FIX */}
                        <Box sx={{ mb: 2 }}>
                            <input
                                type="file"
                                {...register("profileImage")}
                                onChange={imageChange}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                    color: "#5c2c1c",
                                    background: "#fafafa",
                                }}
                            />
                        </Box>

                        {img && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={URL.createObjectURL(img)}
                                    alt="preview"
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: "20px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Box>
                        )}
                        {/* BUTTON */}
                        <Button
                            type="submit"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                background: "#5c2c1c",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: "6px",
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
                                "Submit"
                            )}
                        </Button>
                    </form>

                    {/* DIVIDER */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            my: 2,
                        }}
                    >
                        <Box sx={{ flex: 1, height: "1px", background: "#eee" }} />
                        <Typography sx={{ mx: 2, fontSize: "12px", color: "#999" }}>
                            OR
                        </Typography>
                        <Box sx={{ flex: 1, height: "1px", background: "#eee" }} />
                    </Box>

                    {/* GOOGLE BUTTON */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/google-icon-logo-svgrepo-com.svg"
                            alt="google login"
                            onClick={() => console.log("Google Login Clicked")}
                            sx={{
                                width: 45,
                                height: 45,
                                cursor: "pointer",
                                borderRadius: "50%",
                                p: 1,
                                background: "#fff",
                                border: "1px solid #eee",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}