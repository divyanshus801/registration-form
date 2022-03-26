import React, { useState } from "react";
import "./signIn.css";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const API = `https://radically-yours-server.herokuapp.com/api`;

  const isValidObjField = () => {
    if (email === "" || password === "") {
      return false;
    } else {
      return true;
    }
    // return Object.values(obj).every(value => value.trim())
  };

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 2500);
  };

  const isValidEmail = (value) => {
    const regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(value);
  };

  const isValidForm = () => {
    //all fields must be filled
    if (!isValidObjField())
      return updateError("All Fields are Required!", setFormErrors);
    //only valid email is required
    if (!isValidEmail(email))
      return updateError("Enter a valid email!", setFormErrors);
    //password must be 6 character
    if (!password.trim() || password.length < 6)
      return updateError("Password should be 6 character long!", setFormErrors);

    return true;
  };

  const handleOnclick = async (e) => {
    e.preventDefault();
    if (isValidForm()) {
      setLoading(true)
      await axios.post(`${API}/signin`, {
          email,
          password,
        })
        .then((response) => {
          // return response.data
          setEmail("");
          setPassword("");
          setLoading(false);
          setFormErrors("");
          setSuccess(true);
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/home");
        })
        .catch((error) => {
          console.log(error?.response?.data?.message);
          Promise.reject(error);
          setError(error?.response?.data?.message);
          setEmail("");
          setPassword("");
          setLoading(false);
          setFormErrors("");
          setSuccess(false);
        });
    }
  };

  return (
    <div className="signin-wrapper">
        {!success ? <p className="error-msg-lg">{error}</p> : "" }
      <div className="signin-heading-wrapper">
        <h1 className="signin-heading">SignIn here</h1>
      </div>
      <p className="error-msg">{formErrors}</p>
      <CustomInput
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton text={loading ? <i
              className="fa fa-circle-o-notch fa-spin"
            /> : "signin"} onClick={handleOnclick} />
      <p>
        Not have account!{" "}
        <Link className="signin-link" to="/signup">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
