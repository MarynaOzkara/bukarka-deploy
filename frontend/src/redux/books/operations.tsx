import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "utils/fetchInstance";

export const fetchBooksList = createAsyncThunk(
  "books/fetchBooksList",
  async (_, thunkAPI) => {
    const response = await instance.get(`/api/books/new`);
    return response.data.data;
  }
);
