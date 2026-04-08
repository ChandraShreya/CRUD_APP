// // "use client";

// // import { useSelector } from "react-redux";
// // // import styles from "./button.module.css";
// // import styles from "../buttonLoader/button.module.css"

// // export default function Button({
// //   children,
// //   type = "button",
// //   onClick,
// //   className = "",
// //   disabled = false,
// // }) {
// //   const { loading } = useSelector((state) => state.auth); // 👈 GLOBAL loading

// //   return (
// //     <button
// //       type={type}
// //       onClick={onClick}
// //       disabled={loading || disabled}
// //       className={`${styles.button} ${className}`}
// //     >
// //       {loading ? <span className={styles.loader}></span> : children}
// //     </button>
// //   );
// // }



// // "use client";

// // import { useSelector } from "react-redux";
// // import styles from "./button.module.css";

// // export default function Button({
// //   children,
// //   type = "button",
// //   onClick,
// //   className = "",
// //   disabled = false,
// // }) {
// //   const { loading } = useSelector((state) => state.auth);

// //   return (
// //     <button
// //       type={type}
// //       onClick={onClick}
// //       disabled={loading || disabled}
// //       className={`${styles.button} ${className}`}
// //     >
// //       {loading ? (
// //         <span className={styles.dotLoader}>
// //           <span></span>
// //           <span></span>
// //           <span></span>
// //         </span>
// //       ) : (
// //         children
// //       )}
// //     </button>
// //   );
// // }


// "use client";

// import { useSelector } from "react-redux";
// import styles from "./button.module.css";

// export default function Button({
//   children,
//   type = "button",
//   onClick,
//   className = "",
//   disabled = false,
// }) {
//   const authLoading = useSelector((state) => state.auth.loading);
//   const productLoading = useSelector((state) => state.product.loading);

//   const loading = authLoading || productLoading; // 👈 combine

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={loading || disabled}
//       className={`${styles.button} ${className}`}
//     >
//       {loading ? (
//         <span className={styles.dotLoader}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </span>
//       ) : (
//         children
//       )}
//     </button>
//   );
// }