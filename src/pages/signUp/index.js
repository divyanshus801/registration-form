import React, { useState } from "react";
import "./signUp.css";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import { Link } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: false,
    loading: false,
  });
  const [formErrors, setFormErrors] = useState("");
  const [error, setError] = useState("");

  const { name, email, password, confirmPassword, success, loading } = userInfo;

  const API = `https://radically-yours-server.herokuapp.com/api`;

  const isValidObjField = () => {
    if(name === '' ||
       email === '' ||
       password === '' ||
       confirmPassword === ''
    )
    {return false}else{
      return true
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
  const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(value)
  }

  const isValidForm = () => {
    //all fields must be filled
    if (!isValidObjField()) return updateError("All Fields are Required!", setFormErrors);
    //name field with 3 or more character
    if(!name.trim() || name.length < 3) return updateError("Name should be 3 character long!", setFormErrors);
    //only valid email is required
    if(!isValidEmail(email)) return updateError("Enter a valid email!", setFormErrors);
    //password must be 6 character
    if(!password.trim() || password.length < 6) return updateError("Password should be 6 character long!", setFormErrors);
    //password and repeatPassword must be same
    if(password !== confirmPassword) return updateError( "Password does not match!", setFormErrors);

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
   setUserInfo({ ...userInfo, [name]: value });
    
  };

  const handleOnclick = async (e) => {
    e.preventDefault();
      if(isValidForm()){
      setUserInfo({ ...userInfo, loading: true})
     await axios.post(`${API}/signup`, {
        fullName: name,
        email,
        passwordRepeat: confirmPassword,
      }).then(
       (response) => {
          // return response.data
          setUserInfo({
            ...userInfo,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            success: true,
            loading: false
          });
          setFormErrors("");
        }
      ).catch(
      (error) => {
          console.log(error?.response?.data?.message);
          Promise.reject(error)
          setError(error?.response?.data?.message)
          setUserInfo({
            ...userInfo,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            success: false,
            loading: false
          });
          
        }
      )
    }
  };

  return (
    <div className="signup-wrapper">
        {!success ? <p className="error-msg-lg">{error}</p> : "" }
        {success ? <p className="success-msg">User registered succesfully please login</p> : ""}
      <div className="signup-heading-wrapper">
        <h1 className="signup-heading">SignUp here</h1>
      </div>
      <p className="error-msg">{formErrors}</p>
      <CustomInput
        type="text"
        name="name"
        placeholder="Name"
        value={userInfo.name}
        onChange={handleChange}
      />
      
      <CustomInput
        type="text"
        name="email"
        placeholder="Email"
        value={userInfo.email}
        onChange={handleChange}
      />
     
      <CustomInput
        type="password"
        name="password"
        placeholder="Password"
        value={userInfo.password}
        onChange={handleChange}
      />
     
      <CustomInput
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={userInfo.confirmPassword}
        onChange={handleChange}
      />
      <CustomButton text={loading ? <i
              className="fa fa-circle-o-notch fa-spin"
            /> : "signup"} onClick={handleOnclick} />
      <p>
        Already have an account!{" "}
        <Link className="signup-link" to="/">
          SignIn here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
