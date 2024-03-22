import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import addImage from "../../assets/img/goal2.webp";
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


export const AddGaol = () => {
  const {
 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  useEffect(() => {}, []);
  const user  = localStorage.getItem("id");
  //data handle here..................
  const submitHandler = async (data) => {
    // console.log("res", data);
    const ddata = Object.assign(data,{user})
    // console.log(ddata)
    const res = await axios.post('/api/goal',ddata);

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
          navigate('/add');
        }, 2000);
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
        SET GOAL
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
              label="goal name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("name")}
            ></TextField>
            <TextField
              label="max amount"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("maxAmount")}
            ></TextField>
                <input type="date" name="startDate"  style={{marginRight:'70px',marginTop:'20px' ,padding:'18px'}} {...register("startDate")}/>
                <input type="date" name="endDate"  style={{marginRight:'70px',marginTop:'20px' ,padding:'18px'}} {...register("endDate")}/>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
            >
              SET
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
            height: "90vh",
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
};
