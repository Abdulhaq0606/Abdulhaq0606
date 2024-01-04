import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import { getArticleStart, getArticleSuccess } from "../slice/article";
import ArticleService from "../servise/article";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { article, isLoading } = useSelector((state) => state.article);
  const { loggedin, user } = useSelector((state) => state.auth);
  const getarticles = async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getarticles();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getarticles();
  }, []);
  return (
    <div className="album py-5 bg-body-tertiary">
      {isLoading && <Loader />}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {article.map((item) => (
          <div className="col" key={item.id}>
            <div className="card shadow-sm h-100">
              <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
              </svg>
              <div className="card-body">
                <h5 className="card-text fm-bold">{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate(`/article/${item.slug}`)}
                  >
                    View
                  </button>
                  {loggedin && user.username === item.author.username && (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/edit-article/${item.slug}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteAticle(item.slug)}
                      >
                        delete
                      </button>
                    </>
                  )}
                </div>
                <small className="text-body-secondary">
                  {item.author.username}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
