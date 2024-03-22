// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import addImage from "../../assets/img/add.jpg";
import {
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditExpense = () => {
    const id = useParams().id;
    const [expenseCategory, setexpenseCategory] = useState([]);
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
   
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      const res = await axios.get("/api/expense/" +localStorage.getItem("id") +"/" +id);
      return res.data.data[0];
    },
  });


  //get old data from api
//   const getOldData = async () => {
//     const res = await axios.get(
//       "/api/expense/" +
//         localStorage.getItem("id") +
//         "/" +
//         id
//     );
//     console.log(res.data.data[0]);
//   };

  useEffect(() => {
    // getOldData();
    getExpenseCategory();
  }, []);

  const getExpenseCategory = async () => {
    const res = await axios.get("/api/expensecategory");
    // console.log(res.data.data)
    setexpenseCategory(res.data.data);
  };

  //data handle here..................
  const submitHandler = async (data) => {
    const expenseData = {
      title: data.title,
      amount: data.amount,
      category: data.category,
      user: localStorage.getItem("id"),
      mode: data.mode,
    };
    // console.log(expenseData);
    try {
      const res = await axios.put(
        `/api/expenseupdate/${id}`,expenseData
      );
      console.log("res", res);
      if (res.data.status == "success") {
        toast.success("Successfully Updated", {
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
          navigate("/list");
        }, 2000);
      }
    } catch (error) {
      console.log("errerer", error);
    }
  }; // end of submithandler

  const validation = {
    firstname: {
      required: {
        value: true,
        message: "*First Name is required",
      },
      minLength: {
        value: 2,
        message: "*name should be than one character",
      },
    },
    lastname: {
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
  const defaultTheme = createTheme();
  return (
    <ThemeProvider
      theme={defaultTheme}
      style={{ backgroundColor: "radial-gradient(circle, #ff7e5f, #feb47b)" }}
    >
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        sx={{ color: "#2E3B55", mt: 2, fontFamily: "Lato" }}
      >
        UPDATE EXPENSE
      </Typography>
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
        // transition: Zoom,
      />
      <CssBaseline />
      <Grid
        container
        spacing={2}
        width="100%"
        sx={{
          borderRadius: "8px",
          mt: 2,
          ml: 2,
          p: 2,
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          // sx={{ ml: 1 }}
          style={{ backgroundColor: "" }}
        >
          <Box component="form" onSubmit={handleSubmit(submitHandler)}>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("title")}
            ></TextField>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("amount")}
            ></TextField>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                // onChange={handleChange}
                {...register("category")}
              >
                {expenseCategory?.map((category) => {
                  return (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Mode</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                // onChange={handleChangeMode}
                {...register("mode")}
              >
                <MenuItem key={"cash"} value={"cash"}>
                  Cash
                </MenuItem>
                <MenuItem key={"credit"} value={"credit"}>
                  Credit
                </MenuItem>
                <MenuItem key={"debit"} value={"debit"}>
                  Debit
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              width = '100'
              sx={{ mt: 2 , width: "22.5vw"}}
            >
              UPDATE
            </Button>
            <Button
          component={Link}
          to="/list"
          variant="contained"
          color="secondary"
          width = '200'

          sx={{  mt: 2 , ml:3 ,width: "22.5vw"}}
        >
          BACK
        </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          // sx={{ ml: 1 }}
          style={{
            backgroundImage: `url(${addImage}) `,
            height: "110vh",
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
};
