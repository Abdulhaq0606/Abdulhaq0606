import React, { useEffect, useState } from "react";
import AuthServise from "../servise/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserStart, getUserSuccess, signUsersStart } from "../slice/auth";
import ModalInfo from "./ModalInfo";

function Userinfo() {
  const { user } = useSelector((state) => state.auth);
  const [username, SetUsername] = useState();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  console.log(username);
  const getUser = async () => {
    dispatch(getUserStart());
    try {
      const response = await AuthServise.getUsername(user.username);
      console.log(response);
      SetUsername(response.profile);
      dispatch(getUserSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="w-70 ">
      <div className="col-lg-4  justify-content-center align-self-center mx-auto">
        <svg
          className="bd-placeholder-img rounded-circle mx-auto"
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect
            width="100%"
            height="100%"
            fill="var(--bs-secondary-color)"
          ></rect>
        </svg>
        <h2 className="fw-normal mx-auto">{username?.username}</h2>
        <p>
          Some representative placeholder content for the three columns of text
          below the carousel. This is the first column.
        </p>
        <p>
          <a className="btn btn-secondary" onClick={() => setShowModal(true)}>
            Edit profile
          </a>
        </p>
      </div>
      <ModalInfo show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
}

export default Userinfo;
