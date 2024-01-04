import React, { useState } from "react";
import ArticleForm from "./ArticleForm";
import ArticleService from "../servise/article";
import { useDispatch } from "react-redux";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSubmit = async () => {
    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      navigate("/");
      const response = await ArticleService.postArticle(article);
      dispatch(postArticleSuccess()); // response.data ni payload sifatida o'rgating
      // console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(postArticleFailure(error.response.data)); // error.response.data ni payload sifatida o'rgating
    }
  };

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  };

  return (
    <div className="text-center">
      <div className="w-75 mx-auto">
        <h1 className="fs-2">Create Article</h1>
        <ArticleForm {...formProps} />
      </div>
    </div>
  );
}

export default CreateArticle;
