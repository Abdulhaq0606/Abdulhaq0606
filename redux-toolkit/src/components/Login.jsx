import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
// import auth, { loginUserFailure, loginUserStart } from "../slice/auth";
import AuthServise from "../servise/auth";
import {
  signUserFailure,
  signUserSuccess,
  signUsersStart,
} from "../slice/auth";
import ValidationError from "./validation-error";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, loggedin } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  // console.log(isLoading);

  const LoginHandler = async (e) => {
    e.preventDefault();
    dispatch(signUsersStart());
    const user = { email: name, password: Password };
    try {
      const response = await AuthServise.userLogin(user);
      console.log(response);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      console.error(error);
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
          <h1 className="h3 mb-3 fw-normal">Please Sign in</h1>
          <ValidationError />
          <Input label={"Username"} type={"email"} setSate={setName} />
          <Input label={"Password"} type={"password"} setSate={setPassword} />

          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            onClick={LoginHandler}
            disabled={isLoading}
          >
            {isLoading ? "loding.." : "Sign in"}
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
        </form>
      </main>
    </div>
  );
}

export default Login;
