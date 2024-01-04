import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import moment from "moment";
import ArticleService from "../servise/article";
import Loader from "../ui/Loader";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDeatil, isLoading } = useSelector((state) => state.article);
  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };

    getArticleDetail();
  }, [slug]);

  return isLoading ? (
    <Loader />
  ) : (
    articleDeatil !== null && (
      <div>
        <div className="py-3 mb-4  rounded-3">
          <div className="container-fluid pb-5">
            <h1 className="display-5 fw-bold">{articleDeatil.title}</h1>
            <p className="col-md-8 fs-4">{articleDeatil.description}</p>
            <p className="text-muted">
              <span className="fw-bold">Created at:</span>{" "}
              {moment(articleDeatil.createdAt).format("DD MMM, YYYY")}
            </p>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary text-uppercase">
                    {articleDeatil.author.username}
                  </strong>
                  <p className="card-text mb-auto">
                    {articleDeatil.author.bio}
                  </p>
                </div>
                <div className="col-auto d-none d-lg-block">
                  <svg
                    className="bd-placeholder-img"
                    width="200"
                    height={"100%"}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text
                      x={"45%"}
                      y={"53%"}
                      fill={"#fff"}
                      className="fs-2 text-uppercase p-0 m-0"
                    >
                      {articleDeatil.author.username[0]}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div>{articleDeatil.body}</div>
          </div>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;
