"use client"
import { createProduct } from '@/redux/slice/productSlice'
// import { createProduct } from '@/redux/slice/productSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { title } from 'process'
import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import * as yup from "yup"
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  content: yup.string().required("Please provide a content")
})
export default function ProductCreate() {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const handleClick = async (data) => {
    let createData = {
      title: data.title,
      subtitle: data.subtitle,
      content: data.content
    }
    await dispatch(createProduct(createData))


    // console.log("Token:", sessionStorage.getItem("token"));

  }
  return (
    <>
      <div className="createProduct-main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit(handleClick)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}>
          <label htmlFor="title">Title</label>
          <input type="title"
            id='title'
            placeholder='enter title'
            {...register("title")}
            style={{ marginBottom: "10px", marginLeft: "10px" }}
          />
          {errors.title && (
            <span style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}>
              {errors.title.message}
            </span>
          )}

          <label htmlFor="subtitle">Subtitle</label>
          <input type="subtitle"
            id='subtitle'
            placeholder='Enter your subtitle'
            {...register("subtitle")}
            style={{ marginBottom: "10px", marginLeft: "10px" }} />
          {errors.subtitle && (
            <span
              style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
            >
              {errors.subtitle.message}
            </span>
          )}

          <label htmlFor="content">content</label>
          <input
            id="content"
            type="content"
            placeholder="Enter your content"
            {...register("content")}
            style={{ marginBottom: "10px", marginLeft: "10px" }}
          />
          {errors.content && (
            <span
              style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
            >
              {errors.content.message}
            </span>

          )}
          <input type="submit" value={"Create Product"} />
          <button type='button' onClick={() => router.push("/product/productList")} >View All Products</button>
        </form>
      </div>

    </>
  )
}