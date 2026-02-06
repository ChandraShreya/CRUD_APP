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
import { logout } from '@/redux/slice/authSlice';
import { useDispatch } from 'react-redux';

   
export default function Navbar() {

    const dispatch = useDispatch()


    const cookies = new Cookies();




    const Logout = () => {
        cookies.remove("token", { path: "/" });
        dispatch(logout())


    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Link href="/auth/signIn">Login</Link>

                    <Link href={"/auth/signIn"} color="inherit" onClick={() => Logout()}>Logout</Link>

                </Toolbar>
            </AppBar>
        </Box>
    );
}