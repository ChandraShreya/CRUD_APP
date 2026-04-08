

"use client"
import { verifyOtp } from '@/redux/slice/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner';
import { Box, Button, Typography } from '@mui/material';


export default function OtpPage() {

  const dispatch = useDispatch();
  const router = useRouter()
  const { loading } = useSelector((state) => state.auth);
  // const { email, isOtpVerified } = useSelector(
  // (state) => state.auth);
  const { email } = useSelector((state) => state.auth);
  const [userEmail, setUserEmail] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("Id");
    const mail = localStorage.getItem("email");

    if (id) setUserId(id);
    if (mail) setUserEmail(mail);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1)
    e.target.value = value


    // If a valid digit is entered, move focus to next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }



  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // Collect OTP from inputs
    let otpValue = "";
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(`otp-${i}`);
      otpValue += input?.value || "";
    }

    // Prepare payload
    const payload = {
      userId: localStorage.getItem("Id"),
      otp: otpValue,
    };

    // Dispatch thunk
    try {
      const result = await dispatch(verifyOtp(payload)).unwrap();
      console.log(result, "otp response");

      if (result.status == true) {
        router.push("/auth/signIn")
      }
    } catch (error) {

    }
    


    // Handle success
    // if (authOtp.fulfilled.match(result)) {
    //   alert("OTP Verified Successfully");
    //   router.push("/"); // or dashboard
    // }

    // // Handle error
    // if (authOtp.rejected.match(result)) {
    //   alert(result.payload || "OTP verification failed");
    // }
  };



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
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "16px",
          p: 4,
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          sx={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "#5c2c1c",
            mb: 1,
            fontFamily: "Playfair Display, serif",
          }}
        >
          OTP Verification
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#6d4c41",
            mb: 3,
          }}
        >
          Your mail id is - <b>{email || userEmail}</b>
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* OTP BOXES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              mb: 3,
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                component="input"
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                onChange={(e) => handleChange(e, index)}
                sx={{
                  width: "45px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "18px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                  "&:focus": {
                    borderColor: "#5c2c1c",
                    boxShadow: "0 0 0 2px rgba(92,44,28,0.2)",
                  },
                }}
              />
            ))}
          </Box>

          {/* BUTTON */}
          <Button
  type="submit"
  fullWidth
  disabled={loading}
  sx={{
    py: 1.5,
    borderRadius: "30px",
    background: "#5c2c1c",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#3e1d13",
    },
  }}
>
  {loading ? (
    <Box sx={{ display: "flex", gap: "4px", justifyContent: "center" }}>
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
    "Verify OTP"
  )}
</Button>
        </form>
      </Box>
    </Box>
  );
}




