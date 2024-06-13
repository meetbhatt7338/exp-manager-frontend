// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import addImage from '../../assets/img/add.jpg';
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
  const style = {"fontSize":"14.5px","color":"red","marginLeft":"10px","marginTop":"10px","fontWeight":"normal"}
  const [expenseCategory, setexpenseCategory] = useState([]);
  const [goals, setgoals] = useState([])
 
  
  const navigate = useNavigate();

 

  const getExpenseCategory = async () => {
    const res = await axios.get("/api/expensecategory");
    // console.log(res.data.data)
    setexpenseCategory(res.data.data);
  };

  const getGoal = async()=>{
    const id = localStorage.getItem('id')
    const res = await axios.get(`/api/goalbyuser/${id}`)
    // console.log(res.data.data)
    setgoals(res.data.data)
  }

  useEffect(() => {
    getExpenseCategory();
    getGoal();
  }, []);

  //data handle here..................
  const submitHandler = async (data) => {
    const expenseData = {
      goal:data.goal,
      title: data.title,
      amount: data.amount,
      category: data.category,
      user: localStorage.getItem("id"),
      mode: data.mode,
    };
    // console.log(expenseData);
    try {
      const res = await axios.post(
        "/api/expense",
        expenseData
      );
      // console.log("res", res);
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
          navigate('/list');
        }, 2000);
      }
    } catch (error) {
      // console.log("errerer", error);
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
  }; // end of submithandler

  const validation = {
    title: {
      required: {
        value: true,
        message: "*Title is required",
      },
      minLength: {
        value: 2,
        message: "*name should be more than one character",
      },
    },
    amount: {
      required: {
        value: true,
        message: "*Amount is required",
      },
      pattern: {
        value: /^[0-9]+(\.[0-9]+)?$/,
        message: "*Amount must be a number",
      },
     
    },
    category: {
      required: {
        value: true,
        message: "*Choose your transaction's category",
      },
    },
    mode:{
      required:{
        value:true,
        message:"*Choose your transaction's mode",
      }
    }
  };
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme} style={{backgroundColor: 'radial-gradient(circle, #ff7e5f, #feb47b)'
      
    }} >
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        sx={{ color: "#2E3B55", mt: 2, fontFamily: "Lato" }}
        
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
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            // sx={{ ml: 1 }}
            style={{ backgroundColor: "" ,}}
           
          >
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Add Into</InputLabel>
                <Select {...register("goal")}
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Goal State"
                  
                >
                  {goals?.map((goal) => {
                    return (
                      <MenuItem key={goal._id} value={goal._id}>
                        {goal.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("title",validation.title)}
                ></TextField>

                <span style={style}>{errors.title?.message}</span>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("amount",validation.amount)}
                
                >
                  
                </TextField>
              <span style={style}>{errors.amount?.message}</span>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select  {...register("category",validation.category)}
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  // onChange={handleChange}
                >
                  {expenseCategory?.map((category) => {
                    return (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {/* <FormHelperText>{errors.category?.message}</FormHelperText> */}
              <span style={style}>{errors.category?.message}</span>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                <Select  
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  // onChange={handleChangeMode}
                  {...register("mode",validation.mode)}
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
                {errors.mode && <span style={style}>{errors.mode.message}</span>}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                ADD
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
            style={{ backgroundImage: `url(${addImage}) `, height:'110vh',
            backgroundSize: 'cover',  }}
           
          ></Grid>
          
          
     
        </Grid>
 
    </ThemeProvider>
  );
};
