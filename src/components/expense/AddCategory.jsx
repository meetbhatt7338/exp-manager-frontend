// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

export const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const [expenseCategory, setexpenseCategory] = useState([]);
  const [mode, setmode] = useState("");
  const [category, setcategory] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target.value)
    setcategory(e.target.value);
  };
  const handleChangeMode = (e) => {
    // console.log(e.target.value)
    setmode(e.target.value);
  };

  const getExpenseCategory = async () => {
    const res = await axios.get("http://localhost:4000/api/expensecategory");
    // console.log(res.data.data)
    setexpenseCategory(res.data.data);
  };

  useEffect(() => {
    getExpenseCategory();
  }, []);

  //data handle here..................
  const submitHandler = async (data) => {
    const expenseData = {
      title: data.title,
      amount: data.amount,
      category: category,
      user: localStorage.getItem("id"),
      mode: mode,
    };
    console.log(expenseData);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/expense",
        expenseData
      );
      console.log("res", res);
      if (res.data.status == "success") {
        toast.success("Successfully added", {
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
          navigate(`/expense/list/${expenseData.user}`);
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
    <ThemeProvider theme={defaultTheme}>
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        sx={{ color: "blue", mt: 2, fontFamily: "Lato" }}
      >
        ADD EXPENSE
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
          container
          style={{ height: "100vh", backgroundColor: "", display: "flex" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{ ml: 1 }}
            style={{ backgroundColor: "" }}
          >
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("title")}
              ></TextField>
              <TextField
                label="amount"
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
                  onChange={handleChange}
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
                  onChange={handleChangeMode}
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
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                ADD
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
