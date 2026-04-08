"use client"
import { createProduct } from '@/redux/slice/productSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import * as yup from "yup"
import styles from "../createProduct/createProduct.module.css"
import { Box, Button, TextField, Typography } from '@mui/material'
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  content: yup.string().required("Please provide a content")
})
export default function ProductCreate() {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const handleClick = async (data) => {
    let createData = {
      title: data.title,
      subtitle: data.subtitle,
      content: data.content
    }
    await dispatch(createProduct(createData))


    // console.log("Token:", sessionStorage.getItem("token"));

  }
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
        maxWidth: "500px",
        background: "#fff",
        borderRadius: "16px",
        p: 4,
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
      }}
    >
      {/* HEADING */}
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#5c2c1c",
          mb: 3,
          textAlign: "center",
          fontFamily: "Playfair Display, serif",
        }}
      >
        Create Product
      </Typography>

      <form onSubmit={handleSubmit(handleClick)}>
        {/* TITLE */}
        <TextField
          fullWidth
          variant="standard"
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 3 }}
        />

        {/* SUBTITLE */}
        <TextField
          fullWidth
          variant="standard"
          label="Subtitle"
          {...register("subtitle")}
          error={!!errors.subtitle}
          helperText={errors.subtitle?.message}
          sx={{ mb: 3 }}
        />

        {/* CONTENT */}
        <TextField
          fullWidth
          variant="standard"
          label="Content"
          {...register("content")}
          error={!!errors.content}
          helperText={errors.content?.message}
          multiline
          rows={3}
          sx={{ mb: 3 }}
        />

        {/* CREATE BUTTON */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            background: "#5c2c1c",
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: "bold",
            mb: 2,
            "&:hover": {
              background: "#3e1d13",
            },
          }}
        >
          Create Product
        </Button>

        {/* SECONDARY BUTTON */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => router.push("/product/productList")}
          sx={{
            py: 1.5,
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: "bold",
            borderColor: "#5c2c1c",
            color: "#5c2c1c",
            "&:hover": {
              background: "rgba(92,44,28,0.05)",
              borderColor: "#3e1d13",
            },
          }}
        >
          View All Products
        </Button>
      </form>
    </Box>
  </Box>
);
}