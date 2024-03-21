import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../../assets/css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const SingUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  //data handle here..................
  const submitHandler = async (data) => {
    if (data.password === data.cpassword) {
      if (data) {
        const optimisedUser = {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          password: data.password.trim(),
          role: "65c084e89c298a4d0a25769a",
        };
        // console.log('uuser',optimisedUser)

        try {
          const res = await axios.post(
            "http://localhost:4000/api/user",
            optimisedUser
          );
          // const id = res._id.toString();
          // console.log('id' , res)
          localStorage.setItem('id',res.data.data._id)
          // console.log('data added' , res)
          toast.success(`Hello, ${data.firstName} Welcome to Expense Manager`, {
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
          }, 3000);
        } catch (err) {
          console.log(err);
          toast.error("Data not added in database!!", {
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
        toast.error("Something went wrong!!", {
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
  }; // end of submithandler

  const validation = {
    firstName: {
      required: {
        value: true,
        message: "*First Name is required",
      },
      minLength: {
        value: 2,
        message: "*name should be than one character",
      },
    },
    lastName: {
      required: {
        value: true,
        message: "*First Name is required",
      },
      minLength: {
        value: 2,
        message: "*Name should be more than one character",
      },
    },
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

      <div className="wrapper">
        {/* signup form--------------------------------- */}
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>SignUp</h1>
          <div className="input-box">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              {...register("firstName", validation.firstName)}
            />
            <FaUser className="icon" />
            <span>{errors.firstName?.message}</span>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              {...register("lastName", validation.lastName)}
            />
            <FaUser className="icon" />
            <span>{errors.lastName?.message}</span>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", validation.email)}
            />
            <MdEmail className="icon" />
            <span>{errors.email?.message}</span>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", validation.password)}
            />
            <FaLock className="icon" />
            <span>{errors.password?.message}</span>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="cpassword"
              placeholder="Conform Password"
              {...register("cpassword", validation.cpassword)}
            />
            <FaLock className="icon" />
            <span>{errors.cpassword?.message}</span>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to={''}>Forgot password</Link>
          </div>

          <button type="submt">SignUp</button>

          <div className="register-link">
            <p>
              You have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
        {/* --------------------------- */}
      </div>
      <div className='wrapper1'>
  
      <h1 class="animated-text">Welcome  To Expense Manager</h1>
      <p  className='bg'></p>
    </div>
      </div>
      // </div>
  );
};
