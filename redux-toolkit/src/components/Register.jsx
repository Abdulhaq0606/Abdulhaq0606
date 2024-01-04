import React, { useCallback, useEffect, useState } from "react";
import Input from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  signUsersStart,
  signUserSuccess,
  signUserFailure,
} from "../slice/auth.js";

import AuthServise from "../servise/auth";
import ValidationError from "./validation-error.jsx";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, loggedin } = useSelector((state) => state.auth);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUsersStart());

    const user = { username: name, email, password: Password };

    try {
      const response = await AuthServise.userRegister(user);
      console.log(response);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      console.log(error.response);
      dispatch(signUserFailure(error.response.data.errors));
    }
  };
  useEffect(() => {
    if (loggedin) {
      navigate("/");
    }
  }, [loggedin]);

  return (
    <div className="text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form>
          <img
            className="mb-4"
            src="https://yt3.ggpht.com/a/AATXAJxT-cUn-R7ZBFj3DBZHAPCc4Rzc_CwQT-eYJg=s900-c-k-c0xffffffff-no-rj-mo"
            alt=""
            width="150"
            height="150"
          />
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <ValidationError />
          <Input label={"Username"} type={"text"} setSate={setName} />
          <Input label={"Email address"} type={"email"} setSate={setEmail} />
          <Input label={"Password"} type={"password"} setSate={setPassword} />

          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            onClick={registerHandler}
            disabled={isLoading}
          >
            {isLoading ? "loding.." : "Register"}
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
        </form>
      </main>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
}

export default Register;
