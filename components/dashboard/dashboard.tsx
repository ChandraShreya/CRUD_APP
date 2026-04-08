
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Container,
	Stack,
} from "@mui/material";

export default function Dashboard() {
	const images = [
		"/images/carousel-1.jpg",
		"/images/carousel-2.jpg",
		"/images/carousel-3.jpg",
	];

	const [current, setCurrent] = useState(0);

	
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Box>
			{/*  Navbar */}
			<AppBar position="fixed" sx={{ background: "#1c1c1c" }}>
				<Toolbar>
					<Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
						KOPPEE
					</Typography>

					<Button color="inherit">Home</Button>
					<Button color="inherit">About</Button>
					<Button color="inherit">Service</Button>
					<Button color="inherit">Menu</Button>

					<Button
						variant="contained"
						sx={{ ml: 2, background: "#d4a762" }}
					>
						Buy Pro
					</Button>
				</Toolbar>
			</AppBar>

			{/*  Spacer */}
			<Toolbar />

			{/*  Banner */}
			<Box
				sx={{
					width: "100vw",
					height: "100vh",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{/* Images */}
				{images.map((img, index) => (
					<Box
						key={index}
						component="img"
						src={img}
						alt="banner"
						sx={{
							position: "absolute",
							width: "100%",
							height: "100%",
							objectFit: "cover",
							top: 0,
							left: 0,
							opacity: current === index ? 1 : 0,
							transition: "opacity 1s ease-in-out",
						}}
					/>
				))}

				{/* Overlay */}
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						backgroundColor: "rgba(0,0,0,0.6)",
					}}
				/>

				{/* Content */}
				<Container
					sx={{
						position: "relative",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
					}}
				>
					<Typography variant="h5" sx={{ color: "#d4a762", mb: 2 }}>
						We Have Been Serving
					</Typography>

					<Typography
						variant="h1"
						sx={{
							color: "#fff",
							fontWeight: "bold",
							mb: 2,
						}}
					>
						COFFEE
					</Typography>

					<Typography variant="h6" sx={{ color: "#fff", mb: 4 }}>
						* SINCE 1950 *
					</Typography>

					{/* Buttons */}
					<Stack direction="row" spacing={3} justifyContent="center">
						{/*  Create Product */}
						<Button
							variant="contained"
							size="large"
							sx={{
								background: "linear-gradient(135deg, #d4a762, #c89b5a)",
								color: "#fff",
								px: 5,
								py: 1.5,
								fontWeight: "bold",
								borderRadius: "30px",
								letterSpacing: "1px",
								boxShadow: "0 8px 20px rgba(212,167,98,0.4)",
								transition: "all 0.3s ease",
								"&:hover": {
									transform: "translateY(-3px)",
									boxShadow: "0 12px 25px rgba(212,167,98,0.6)",
									background: "linear-gradient(135deg, #c89b5a, #b8924f)",
								},
							}}
						>
							Create Product
						</Button>

						{/*  Sign In */}
						<Button
							variant="outlined"
							size="large"
							component={Link}
							href="/auth/signIn"
							sx={{
								color: "#fff",
								border: "2px solid rgba(255,255,255,0.6)",
								px: 5,
								py: 1.5,
								fontWeight: "bold",
								borderRadius: "30px",
								letterSpacing: "1px",
								backdropFilter: "blur(8px)",
								transition: "all 0.3s ease",
								"&:hover": {
									backgroundColor: "rgba(255,255,255,0.1)",
									borderColor: "#d4a762",
									color: "#d4a762",
									transform: "translateY(-3px)",
								},
							}}
						>
							Sign In
						</Button>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}