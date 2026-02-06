"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";

import {
  updateProduct,
  getProductList,
} from "@/redux/slice/productSlice";

export default function UpdateProductPage({ params }) {
    const {id} = React.use(params)
  const dispatch = useDispatch();
  const router = useRouter();

  const { productList, loading } = useSelector(
    (state) => state.product
  );


  useEffect(() => {
    if (!productList.length) {
      dispatch(getProductList());
    }
  }, [dispatch]);


  const product = productList.find(
    (item) => item._id === id
  );

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

  // 🔹 Populate form when product is available
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        subtitle: product.subtitle,
        content: product.content,
      });
    }
  }, [product]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({ id, data: formData }))
      .unwrap()
      .then(() => {
        router.push("/product/productList");
      });
  };

  if (loading || !product) {
    return <p style={{ padding: "20px" }}>Loading product...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br /><br />

        <input
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
          required
        />
        <br /><br />

        <input
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <br /><br />

        <button type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}
