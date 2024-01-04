import React, { useEffect, useState } from "react";
import ArticleForm from "./ArticleForm";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import ArticleService from "../servise/article";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };
    getArticleDetail();
  }, []);
  const formSubmit = async () => {
    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      navigate("/");
      await ArticleService.editArticle(slug, article);
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
        <h1 className="fs-2">Edit Article</h1>
        <ArticleForm {...formProps} />
      </div>
    </div>
  );
}

export default EditArticle;
