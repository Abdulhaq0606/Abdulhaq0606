import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../helpers/src/helpers/persistance-storage";
import { logoutUser } from "../slice/auth";

function Navbar() {
  const { loggedin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    removeItem("token");
    navigate("/login");
    dispatch(logoutUser());
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
      <Link to={"/"}>REDUX</Link>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {loggedin ? (
          <>
            <Link
              className="me-3 py-2 text-dark text-decoration-none"
              to={"/user"}
            >
              {user.username}
            </Link>
            <Link
              className="me-3 py-2 text-dark text-decoration-none"
              to={"/create-article"}
            >
              create article
            </Link>
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="me-3 py-2 text-dark text-decoration-none"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="me-3 py-2 text-dark text-decoration-none"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
