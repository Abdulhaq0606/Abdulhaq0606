import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/auth.js";
import ArticleReducer from "../slice/article.js";
export default configureStore({
  reducer: {
    auth: AuthReducer,
    article: ArticleReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
