"use client";

import axiosInstance from "@/api/axios/axios";
import { endpoints } from "@/api/endPoints/endPoints";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  productList: [],
  search: "",
  loading: false
};
export const createProduct = createAsyncThunk(
  "createProduct",
  async (payload) => {
    const response = await axiosInstance.post(
      endpoints.product.create,
      payload
    );
    return response.data;
  }
);

export const getProductList = createAsyncThunk(
  "getProductList",
  async () => {
    const response = await axiosInstance.get(endpoints.product.list);
    return response.data;
  });


export const updateProduct = createAsyncThunk(
  "productUpdate",
  async ({ id, data }) => {
    const response = await axiosInstance.put(
      `${endpoints.product.update}/${id}`, 
      data
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "productDelete",
  async (id: string) => {
    const response = await axiosInstance.delete(
      `${endpoints.product.delete}/${id}`
    );
    return { id, ...response.data };
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    searchData: (state, { payload }) => {
      state.search = payload
    }
  },

  extraReducers: (builder) => {
    builder
      // createProduct
      .addCase(createProduct.pending, (state, { payload }) => { })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
          toast.success(payload.message);
        } else {
          toast.error(payload.message);
        }
      })
      .addCase(createProduct.rejected, (state, { payload }) => { })


      //getProductList
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status) {
          state.productList = payload.data;
        }
      })
      .addCase(getProductList.rejected, (state) => {
        state.loading = false;
      })

    // UPDATE
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status) {
          // update item in list
          const index = state.productList.findIndex(
            (item) => item._id === payload.data._id
          );

          if (index !== -1) {
            state.productList[index] = payload.data;
          }

          // optional: keep updated product separately
          state.selectedProduct = payload.data;

          toast.success(payload.message);
        } else {
          toast.error(payload.message);
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        toast.error("Update failed");
      })


      /*delete*/
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.productList = state.productList.filter(
            (item) => item._id !== payload.id
          );
          toast.success(payload.message);
        } else {
          toast.error(payload.message);
        }
      });



  },
});

export default productSlice;
export const { searchData } = productSlice.actions