"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Autocomplete, TextField } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Swal from "sweetalert2";

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
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <Autocomplete
        disablePortal
        options={productList}
        sx={{ width: 300 ,
          backgroundColor: "#cec2c2"
        }}
        getOptionLabel={(option) => option.title || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search product" />
        )}
        onInputChange={(e, value) => dispatch(searchData(value))}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "#111",
          color: "#fff",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Subtitle</th>
            <th style={thStyle}>Content</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <SkeletonTheme baseColor="#2a2a2a" highlightColor="#444">
              {[...Array(8)].map((_, i) => (
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
              <tr key={item._id}>
                <td style={tdStyle}>{item.title}</td>
                <td style={tdStyle}>{item.subtitle}</td>
                <td style={tdStyle}>{item.content}</td>
                <td style={tdStyle}>
                  <Link href={`/product/updateProduct/${item._id}`}>
                    Update
                  </Link>
                  &nbsp;|&nbsp;
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      color: "red",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => router.push("/product/createProduct")}
      >
        Create Product
      </button>
    </div>
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
