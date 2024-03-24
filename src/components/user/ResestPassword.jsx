import React, { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../../assets/css/signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResestPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const locations = useLocation();
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: locations?.state?.email,
    },
  });
  const submithandler = async (data) => {
   

    if (data.password === data.cpassword) {
      const optimisedUser = {
        email: data.email.trim(),
        password: data.password.trim(),
       
      };
      

      try {
        const res = await axios.put("/api/user/resetpassword", optimisedUser);
        // const id = res._id.toString();
        // console.log('id' , res)
        localStorage.setItem("id", res.data.data._id);
        // console.log('data added' , res)
        toast.success(`password changed`, {
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
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.log(err);
        toast.error("password not changed", {
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
    } else {
      toast.error("password and conform password not matched!!", {
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
    cpassword: {
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
          <h1>Reset Password</h1>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="email" disabled
              {...register("email", validation.email)}
            />
            <MdEmail className="icon" />
            <span>{errors.email?.message}</span>
          </div>

          <div className="input-box">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="enter new password"
              {...register("password", validation.password)}
            />
            {passwordVisible ? (
              <FaLockOpen className="icon" onClick={togglePasswordVisibility} />
            ) : (
              <FaLock className="icon" onClick={togglePasswordVisibility} />
            )}
            <span>{errors.password?.message}</span>
          </div>
          <div className="input-box">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="re-enter new password"
              {...register("cpassword", validation.cpassword)}
            />
            {passwordVisible ? (
              <FaLockOpen className="icon" onClick={togglePasswordVisibility} />
            ) : (
              <FaLock className="icon" onClick={togglePasswordVisibility} />
            )}
            <span>{errors.password?.message}</span>
          </div>

          <button type="submt">Reset Password</button>
        </form>
      </div>
    </div>
  );
}; //end if login
