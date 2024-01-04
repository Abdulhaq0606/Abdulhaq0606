import { Tuple, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  article: [],
  articleDeatil: null,
  error: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticleStart: (state) => {
      state.isLoading = true;
    },
    getArticleSuccess: (state, action) => {
      state.isLoading = false;
      state.article = action.payload;
    },
    getArticleFailure: (state, action) => {
      state.error = action.payload;
    },
    getArticleDetailStart: (state) => {
      state.isLoading = true;
    },
    getArticleDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.articleDeatil = action.payload;
    },
    getArticleDetailFailure: (state) => {
      state.isLoading = false;
    },
    postArticleStart: (state) => {
      state.isLoading = true;
    },
    postArticleSuccess: (state) => {
      state.isLoading = false;
    },
    postArticleFailure: (state) => {
      state.isLoading = true;
      state.error = "error";
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  getArticleFailure,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} = articleSlice.actions;

export default articleSlice.reducer;
