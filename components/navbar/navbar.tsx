'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Cookies } from 'react-cookie';
import Link from 'next/link';
import { checkToken, logout } from '@/redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Navbar() {

    const dispatch = useDispatch()

    // const { isloggedIn } = useSelector(item => item.auth)
const { isloggedIn } = useSelector((state: any) => state.auth)
    const cookies = new Cookies();


    console.log(isloggedIn, "isloggedIn")



    const Logout = () => {
        cookies.remove("token", { path: "/" });
        dispatch(logout())


    }

    // useEffect((item) => {
    //     dispatch(checkToken())

            useEffect(() => {
        dispatch(checkToken())

    }, [dispatch ,isloggedIn])

    


 if (!isloggedIn) return null;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute"
            sx={{zIndex:1200,
                    backgroundColor: "#1a1a28",
                    borderBottom: "1px solid #1c1f2a",
            }}>
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link href="/" style={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                            My App
                        </Typography>
                    </Link>
                    {isloggedIn ? <Link href={"/auth/signIn"} color="inherit" onClick={() => Logout()}>Logout</Link> : ""}
                </Toolbar>
            </AppBar>
        </Box>
    );
}