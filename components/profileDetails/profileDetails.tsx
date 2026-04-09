"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { profileDetails } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";


export default function ProfileDetailsPage() {
  const dispatch = useDispatch();
  const router = useRouter()

  const { name, email, profileImage, address, loading } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    dispatch(profileDetails());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#efe3d3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "16px",
          p: 4,
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* LOADING */}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {/* AVATAR */}
            <Avatar
              src={profileImage || ""}
              sx={{
                width: 90,
                height: 90,
                margin: "0 auto",
                mb: 2,
                background: "#5c2c1c",
                fontSize: "32px",
              }}
            >
              {!profileImage && name?.charAt(0).toUpperCase()}
            </Avatar>

            {/* NAME */}
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#5c2c1c",
                fontFamily: "Playfair Display, serif",
              }}
            >
              {name || "User"}
            </Typography>

            {/* EMAIL */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6d4c41",
                mt: 1,
              }}
            >
              {email || "No Email"}
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                color: "#6d4c41",
                mt: 1,
              }}
            >
              {address || "No address"}
            </Typography>

            {/* EXTRA CARD STYLE */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: "10px",
                background: "#fafafa",
                border: "1px solid #eee",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#5c2c1c",
                  fontWeight: "500",
                }}
              >
                Welcome to Coffee House ☕
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
  <Box
    onClick={() => router.push("/product/productList")}
    sx={{
      cursor: "pointer",
      padding: "10px",
      borderRadius: "30px",
      background: "#5c2c1c",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "#3e1d13",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
      },
    }}
  >
    ← Back to Product List
  </Box>
</Box>
          </>
        )}
      </Box>
    </Box>
  );
}