import React from 'react'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../../assets/css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPassword = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({ mode: "onTouched" });
  const submithandler = async (data) => {
   
    const user = {
      email: data.email.trim(),
    
    };
    // console.log('user',user)
    try {
      const res = await axios.post("/api/user/employeexist", user);
    
      if (res.data.status == "success") {
        localStorage.setItem("id", res.data.id);
        toast.success(` User successfully found`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      
        setTimeout(() => {
    
          navigate("/resetpassword"  , {state:{email:res?.data?.data.email}});
         
        }, 1500);
      }
    } catch (err) {
      // console.log(err)
      toast.error("User Not Exist!!", {
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
    
  }
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
          <h1>Forgot Password</h1>

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

        

          

          <button type="submt">ENTER</button>

        
        </form>
      </div>
     
    </div>
  );
}; //end if login

 