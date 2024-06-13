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
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditExpense = () => {
  const { id } = useParams();
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [defaultValues, setDefaultValues] = useState({}); // Add default values state
  const navigate = useNavigate();
  

  const { register, handleSubmit, reset } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const res = await axios.get(`/api/expense/${localStorage.getItem("id")}/${id}`);
        setDefaultValues(res.data.data[0]);
        reset(res.data.data[0]);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch expense data", error);
      }
    };

    getExpenseCategory();
    getExpenseData();
  }, [id, reset]);

  const getExpenseCategory = async () => {
    try {
      const res = await axios.get("/api/expensecategory");
      setExpenseCategory(res.data.data);
    } catch (error) {
      console.error("Failed to fetch expense categories", error);
    }
  };

  const submitHandler = async (data) => {
    const expenseData = {
      title: data.title,
      amount: data.amount,
      category: data.category,
      user: localStorage.getItem("id"),
      mode: data.mode,
    };

    try {
      const res = await axios.put(`/api/expenseupdate/${id}`, expenseData);
      if (res.data.status === "success") {
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
      console.error("Error updating expense", error);
    }
  };

  const defaultTheme = createTheme();

  if (loading) {
    return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          style={{ backgroundColor: "" }}
        >
          <Box component="form" onSubmit={handleSubmit(submitHandler)}>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("title")}
              defaultValue={defaultValues.title} // Set default value
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("amount")}
              defaultValue={defaultValues.amount} // Set default value
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                {...register("category")}
                defaultValue={defaultValues.category._id} // Set default value
              >
                {expenseCategory.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="mode-select-label">Mode</InputLabel>
              <Select
                labelId="mode-select-label"
                id="mode-select"
                {...register("mode")}
                defaultValue={defaultValues.mode} // Set default value
              >
                <MenuItem key="cash" value="cash">
                  Cash
                </MenuItem>
                <MenuItem key="credit" value="credit">
                  Credit
                </MenuItem>
                <MenuItem key="debit" value="debit">
                  Debit
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 2, width: "22.5vw" }}
            >
              UPDATE
            </Button>
            <Button
              component={Link}
              to="/list"
              variant="contained"
              color="secondary"
              sx={{ mt: 2, ml: 3, width: "22.5vw" }}
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
          style={{
            backgroundImage: `url(${addImage})`,
            height: "110vh",
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
};
