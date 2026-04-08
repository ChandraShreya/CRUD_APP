"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import styles from "../../updateProduct/updateProduct.module.css"
import {
  updateProduct,
  getProductList,
} from "@/redux/slice/productSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function UpdateProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { productList, loading } = useSelector(
    (state) => state.product
  );


  useEffect(() => {
    if (!productList.length) {
      dispatch(getProductList());
    }
  }, [dispatch]);


  const product = productList.find(
    (item) => item._id === id
  );

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

  //  Populate form when product is available
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        subtitle: product.subtitle,
        content: product.content,
      });
    }
  }, [product]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({ id, data: formData }))
      .unwrap()
      .then(() => {
        router.push("/product/productList");
      });
  };

  if (loading || !product) {
    return <p style={{ padding: "20px" }}>Loading product...</p>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#efe3d3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "16px",
          p: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* HEADING */}
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
          Update Product
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <TextField
            fullWidth
            variant="standard"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* SUBTITLE */}
          <TextField
            fullWidth
            variant="standard"
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* CONTENT */}
          <TextField
            fullWidth
            variant="standard"
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ mb: 3 }}
          />

          {/* BUTTONS */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                "&:hover": {
                  background: "#3e1d13",
                },
              }}
            >
              Update Product
            </Button>

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
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
