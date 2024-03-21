import { useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import addImage from '../../assets/img/add.jpg';
import {
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export const AddRevenue = () => {

  const defaultTheme = createTheme();
  const {register , handleSubmit ,} = useForm({mode:'onChange'})


  //form data handler
  const submitHandler=async(data)=>{
    
   
    const final ={
      user:localStorage.getItem('id'),
      income: data.income,
      name:data.name,
    }
      const res = await axios.post("http://localhost:4000/api/addrevenue",final)
     
      if(res.status == 200){
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
          navigate(`/listrevenue/${localStorage.getItem('id')}`);
        }, 2000);
      
      }else{
        toast.error('Something Wrong!!', {
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
  }
 
  const navigate = useNavigate();

  
 


  return (
    <ThemeProvider theme={defaultTheme} style={{backgroundColor: 'radial-gradient(circle, #ff7e5f, #feb47b)'
      
    }} >
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        sx={{ color: "#2E3B55", mt: 2, fontFamily: "Lato" }}
        
      >
        ADD REVENUE
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
            
              <TextField
                label="name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("name")}
              ></TextField>
              <TextField
                label="income"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("income")}
              ></TextField>
              

             

              <Button
                type="submit"
                variant="contained"
                color="secondary"
               
                sx={{  mt: 2,mr:3 ,width: "22vw"}}
              >
                ADD
              </Button>
              <Button
               component={Link}
               to="/dashboard"
              
                variant="contained"
                color="secondary"
                sx={{  mt: 2  ,width: "22vw"}}
              >
                Back
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
  )
}
