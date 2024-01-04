import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AuthServise from "./servise/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import ArticleService from "./servise/article";
import { getArticleStart, getArticleSuccess } from "./slice/article";
import ArticleDetail from "./components/ArticleDetail";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";
import Userinfo from "./components/Userinfo";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const responce = await AuthServise.getUser();
      dispatch(signUserSuccess(responce.user));
      // console.log(responce);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    getUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Userinfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article/:slug" element={<EditArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
