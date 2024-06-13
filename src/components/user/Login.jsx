import React, { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../../assets/css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const submithandler = async (data) => {
    const user = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
    // console.log('user',user)
    try {
      const res = await axios.post("/api/user/login", user);
      console.log("res", res);
      if (res.data.status === "success") {
        localStorage.setItem("id", res.data.id);
        toast.success(` Welcome to Expense Manager`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      
        setTimeout(() => {
         
          navigate("/dashboard");
          // if (res?.data?.role?.name == "user") {
            
          // }
        }, 2000);
      }
    } catch (err) {
      // console.log(err)
      toast.error("Invalid Credentials!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  const validation = {
    email: {
      required: {
        value: true,
        message: "*Email is required",
      },
    },
    password: {
      required: {
        value: true,
        message: "*Password is required",
      },
      minLength: {
        value: 6,
        message: "Password length should be more than 6 character",
      },
      
    },
  };

  return (
    <div className="main">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bground"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit(submithandler)}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="email"
              {...register("email", validation.email)}
            />
            <MdEmail className="icon" />
            <span>{errors.email?.message}</span>
          </div>

          <div className="input-box">
            <input
            type={passwordVisible ? "text" : "password"}
              
              name="password"
              placeholder="password"
              {...register("password", validation.password)}
            />
           {passwordVisible ? (
        <FaLockOpen className="icon" onClick={togglePasswordVisibility} />
      ) : (
        <FaLock className="icon" onClick={togglePasswordVisibility} />
      )}
            <span>{errors.password?.message}</span>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
           
            <Link to={'/forgotpassword'}>Forgot password</Link>
          </div>

          <button type="submt">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to={"/signup"}>SignUp</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="wrapper1">
        <h1 className="animated-text">Welcome Back To Expense Manager</h1>
        <p className="bg"></p>
      </div>
    </div>
  );
}; //end if login
