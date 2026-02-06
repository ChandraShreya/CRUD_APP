// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useDispatch } from "react-redux";
// // import { verifyOtp } from "@/redux/slice/authSlice";

// // export default function Otp() {
// //     const router = useRouter();
// //   const dispatch = useDispatch();

// //   const [userId, setUserId] = useState(null);
// //   const [email, setEmail] = useState(null);


// //   useEffect(() => {
// //     setUserId(localStorage.getItem("Id"));
// //     setEmail(localStorage.getItem("email"));
// //   }, []);

// //   const handleChange = (e, index) => {
// //     const value = e.target.value.replace(/\D/g, "").slice(-1);
// //     e.target.value = value;

// //     if (value) {
// //       const next = document.getElementById(`otp-${index + 1}`);
// //       if (next) next.focus();
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!userId) {
// //       alert("User not found. Please register again.");
// //       return;
// //     }

// //     let otpValue = "";
// //     for (let i = 0; i < 6; i++) {
// //       otpValue += document.getElementById(`otp-${i}`).value;
// //     }

// //     const payload = {
// //       userId,
// //       otp: otpValue,
// //     };

// //     console.log(payload, "payload")

// //     const res = dispatch(verifyOtp(payload));

// //     console.log(res,"ff")

// //     if (res.payload?.status === true) {
// //       alert("OTP Verified Successfully");
// //         router.push("/");
// //     } else {
// //       alert(res.payload?.message || "OTP verification failed");
// //     }
// //   };

// //   return (
// //     <div
// //       className="auth-container"
// //       style={{ textAlign: "center", marginTop: "40px" }}
// //     >
// //       <h3>OTP Verification</h3>
// //       <p>Your mail id is - {email}</p>

// //       <form onSubmit={handleSubmit}>
// //         <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
// //           {Array.from({ length: 6 }).map((_, index) => (
// //             <input
// //               key={index}
// //               id={`otp-${index}`}
// //               type="text"
// //               maxLength="1"
// //               onChange={(e) => handleChange(e, index)}
// //               style={{
// //                 width: "50px",
// //                 height: "50px",
// //                 textAlign: "center",
// //                 fontSize: "20px",
// //                 borderRadius: "12px",
// //                 backgroundColor: "#9eaaaa5d",
// //                 border: "1px solid #b0adad",
// //                 color: "#454849ff",
// //               }}
// //             />
// //           ))}
// //         </div>

// //         <br />
// //         <button type="submit">Verify OTP</button>
// //       </form>
// //     </div>
// //   );
// // }

"use client"
import { verifyOtp } from '@/redux/slice/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner';


export default function OtpPage() {

    const dispatch = useDispatch();
    const router = useRouter()
    const { email, isOtpVerified } = useSelector(
    (state) => state.auth);
    

  const [userId, setUserId] = useState("");

 useEffect(() => {
  const id = localStorage.getItem("Id");
   if (id) {
    setUserId(id);
   }
 }, []);

 const handleChange =(e,index) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1)
    e.target.value = value
    

    // If a valid digit is entered, move focus to next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }

 

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Collect OTP from inputs
  let otpValue = "";
  for (let i = 0; i < 6; i++) {
    const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
    otpValue += input?.value || "";
  }

  // Prepare payload
  const payload = {
    userId: localStorage.getItem("Id"),
    otp: otpValue,
  };

  // Dispatch thunk
  try{
      const result = await dispatch(verifyOtp(payload)).unwrap();
      console.log(result,"otp response");
      
      if(result.status == true){
        router.push("/auth/signIn")
      }
  }catch(error){

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
        <div
      className="auth-container"
      style={{ textAlign: "center", marginTop: "40px" }}
    >
      <h3>OTP Verification</h3>
      <p style={{color:"#fff"}}>Your mail id is - {email}</p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              style={{
                width: "50px",
                height: "50px",
                textAlign: "center",
                fontSize: "20px",
                borderRadius: "12px",
                backgroundColor: "#9eaaaa5d",
                border: "1px solid #b0adad",
                color: "rgb(224, 236, 240)",
                margin:"10px"
              }}
            />
          ))}
        </div>

        <button type="submit" >Verify OTP</button>
      </form>
    </div>
   
  )
}


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { verifyOtp } from "@/redux/slice/authSlice";
// import { log } from "console";

// export default function Otp() {
//     const router = useRouter();
//   const dispatch = useDispatch();

//   const [userId, setUserId] = useState(null);
//   const [email, setEmail] = useState(null);



//   useEffect(() => {
//     setUserId(localStorage.getItem("Id"));
//     setEmail(localStorage.getItem("email"));
//   }, []);
//   console.log("kk" , email);
  

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/\D/g, "").slice(-1);
//     e.target.value = value;

//     if (value) {
//       const next = document.getElementById(`otp-${index + 1}`);
//       if (next) next.focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       alert("User not found. Please register again.");
//       return;
//     }

//     let otpValue = "";
//     for (let i = 0; i < 6; i++) {
//       otpValue += document.getElementById(`otp-${i}`).value;
//     }

//     const payload = {
//       userId,
//       otp: otpValue,
//     };

//     console.log(payload, "payload")

//     const res = dispatch(verifyOtp(payload));

//     console.log(res,"ff")

//     if (res.payload?.status === true) {
//       alert("OTP Verified Successfully");
//         router.push("/");
//     } else {
//       alert(res.payload?.message || "OTP verification failed");
//     }
//   };

//   return (
//     <div
//       className="auth-container"
//       style={{ textAlign: "center", marginTop: "40px" }}
//     >
//       <h3>OTP Verification</h3>
//       <p style={{color:"#fff"}}>Your mail id is - {email}</p>

//       <form onSubmit={handleSubmit}>
//         <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               maxLength="1"
//               onChange={(e) => handleChange(e, index)}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 textAlign: "center",
//                 fontSize: "20px",
//                 borderRadius: "12px",
//                 backgroundColor: "#9eaaaa5d",
//                 border: "1px solid #b0adad",
//                 color: "#454849ff",
//               }}
//             />
//           ))}
//         </div>

//         <br />
//         <button type="submit">Verify OTP</button>
//       </form>
//     </div>
//   );
// }

