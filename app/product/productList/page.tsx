"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Autocomplete, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Swal from "sweetalert2";
import styles from "../productList/productList.module.css"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteProduct,
  getProductList,
  searchData,
} from "@/redux/slice/productSlice";

import "react-loading-skeleton/dist/skeleton.css";


export default function ProductListPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { productList, search, loading } = useSelector(
    (state) => state.product
  );

  const filteredList = productList.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  // ✅ SweetAlert delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));

        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#efe3d3",
        p: 3,
        pt:"90px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100 vw",
          background: "#fff",
          borderRadius: "16px",
          p: 3,
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
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
          Product List
        </Typography>

        {/* SEARCH */}
        <Box sx={{ width: "60%", mb: 3 }}>
          <Autocomplete
            disablePortal
            options={productList}
            sx={{
              width: "70%",
              background: "#fafafa",
              borderRadius: "8px",
            }}
            getOptionLabel={(option) => option.title || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search product" fullWidth />
            )}
            onInputChange={(e, value) => dispatch(searchData(value))}
          />
        </Box>

        {/* TABLE */}
        <Box sx={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#5c2c1c", color: "#fff" }}>
                <th style={{ ...thStyle, borderBottom: "2px solid #ddd" }}>Title</th>
                <th style={{ ...thStyle, borderBottom: "2px solid #ddd" }}>Subtitle</th>
                <th style={{ ...thStyle, borderBottom: "2px solid #ddd" }}>Content</th>
                <th style={{ ...thStyle, borderBottom: "2px solid #ddd" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                  {[...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td style={tdStyle}><Skeleton /></td>
                      <td style={tdStyle}><Skeleton /></td>
                      <td style={tdStyle}><Skeleton /></td>
                      <td style={tdStyle}><Skeleton /></td>
                    </tr>
                  ))}
                </SkeletonTheme>
              ) : filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <tr
                    key={item._id}
                    style={{
                      borderBottom: "1px solid #ddd", 
                    }}
                  >
                    <td style={tdStyle}>{item.title}</td>
                    <td style={tdStyle}>{item.subtitle}</td>
                    <td style={tdStyle}>{item.content}</td>

                    <td style={tdStyle}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Link href={`/product/updateProduct/${item._id}`}>
                          <IconButton size="small" sx={{ color: "#5c2c1c" }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Link>

                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item._id)}
                          sx={{ color: "#d32f2f" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>

        {/* CREATE BUTTON */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            onClick={() => router.push("/product/createProduct")}
            style={{
              padding: "10px 30px",
              borderRadius: "30px",
              background: "#5c2c1c",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #333",
  backgroundColor: "#1c1c1c",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #333",
};
