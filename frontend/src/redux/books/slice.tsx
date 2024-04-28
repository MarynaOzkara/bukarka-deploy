import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooksList } from "./operations";
import { Books } from "../../types/Books";

interface BooksState {
  books: Books[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: "idle",
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBooksList.fulfilled,
        (state, action: PayloadAction<Books[]>) => {
          state.status = "succeeded";
          state.books = action.payload;
        },
      )
      .addCase(fetchBooksList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const books = booksSlice.reducer;
