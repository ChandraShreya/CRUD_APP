// 'use client'

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Cookies } from 'react-cookie';
// import Link from 'next/link';
// import { checkToken, logout } from '@/redux/slice/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';


// export default function Navbar() {

//     const dispatch = useDispatch()

//     // const { isloggedIn } = useSelector(item => item.auth)
// const { isloggedIn } = useSelector((state: any) => state.auth)
//     const cookies = new Cookies();


//     console.log(isloggedIn, "isloggedIn")



//     const Logout = () => {
//         cookies.remove("token", { path: "/" });
//         dispatch(logout())


//     }

//     // useEffect((item) => {
//     //     dispatch(checkToken())

//             useEffect(() => {
//         dispatch(checkToken())

//     }, [dispatch ,isloggedIn])

    


//  if (!isloggedIn) return null;
//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="absolute"
//             sx={{zIndex:1200,
//                     backgroundColor: "#1a1a28",
//                     borderBottom: "1px solid #1c1f2a",
//             }}>
//                 <Toolbar>
//                     {/* <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ mr: 2 }}
//                     >
//                         <MenuIcon />
//                     </IconButton> */}
//                     <Link href="/" style={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
//                         <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
//                             My App
//                         </Typography>
//                     </Link>
//                     {isloggedIn ? <Link href={"/auth/signIn"} color="inherit" onClick={() => Logout()}>Logout</Link> : ""}
//                 </Toolbar>
//             </AppBar>
//         </Box>
//     );
// }




"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { Cookies } from "react-cookie";
import Link from "next/link";
import { checkToken, logout } from "@/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import {  useRouter } from "next/router";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { isloggedIn } = useSelector((state: any) => state.auth);

  const cookies = new Cookies();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(checkToken());

    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
  }, [dispatch]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    cookies.remove("token", { path: "/" });
    dispatch(logout());
    handleClose();

    router.push("/"); 
  };

  if (!isloggedIn) return null;

  const initial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(28, 28, 28, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        {/* LOGO */}
        <Link
          href="/"
          style={{ textDecoration: "none", color: "#fff", flexGrow: 1 }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              letterSpacing: "1px",
              fontSize: "18px",
            }}
          >
            Coffee House
          </Typography>
        </Link>

        {/* AVATAR */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar
            sx={{
              background: "#d4a762",
              color: "#3e1d13",
              fontWeight: "bold",
              width: 36,
              height: 36,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 0 10px rgba(212,167,98,0.6)",
              },
            }}
          >
            {initial}
          </Avatar>
        </IconButton>

        {/* DROPDOWN */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: "10px",
              minWidth: "150px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
            }}
            sx={{
              fontSize: "14px",
            }}
          >
            My Profile
          </MenuItem>

          <MenuItem
            onClick={Logout}
            sx={{
              color: "#d32f2f",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}