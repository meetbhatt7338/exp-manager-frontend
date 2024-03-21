import {
  Button,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Swal from "sweetalert2";

export const GoalList = () => {
  const [rows, setrows] = useState([]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      // cellClassName: "super-app-theme--cell",
    },
    {
      field: "maxAmount",
      headerName: "Max Amount",
      width: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value < 0,
          positive: params.value > 5000,
        });
      },
    },
    {
      field: "startDate",
      headerName: "Start",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "endDate",
      headerName: "End",
      width: 300,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "transaction",
      headerName: "Transaction",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Grid container>
          {/* <Grid em> */}
            <Button
              component={Link}
              to={`/individualgoal/${params.row.id}`} // Replace with your edit route
              variant="contained"
              color="primary"
              size="small"
            >
                
              <ReceiptLongIcon />
            </Button>
          {/* </Grid> */}
          
        </Grid>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Grid container>
         
          <Grid item>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  const getGoalByUser = async () => {
    const id = localStorage.getItem("id");
    try {
      
      const res = await axios.get(`http://localhost:4000/api/goalbyuser/${id}`);
    
    // console.log("rows", res.data);
    const row = res.data.data.map((r) => {
      return {
        id: r._id,
        name: r.name,
        maxAmount: r.maxAmount,
        startDate: r.startDate,
        endDate: r.endDate,
        //   category: r.category.name,
      };
    });

    setrows(row);
  } catch (error) {
      alert("No Goal Found!!")
  }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:4000/api/deletegoal/${id}`
        );
        getGoalByUser();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  // console.log("setrows", rows);

  useEffect(() => {
    getGoalByUser();
  }, []);

  const defaultTheme = createTheme();
  return (
    <div style={{marginBottom:'22vh'}}>
    <ThemeProvider theme={defaultTheme} >
      {/* <Grid container> */}
      <Box
        sx={{
          height: 400,
          width: "100%",
          "& .super-app-theme--cell": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.negative": {
            // color: "rgba(255, 0,0 , 1)",
            // fontWeight: "600",
          },
          "& .super-app.positive": {
            color: "rgba(255, 0,0 , 0.7)",
            fontWeight: "600",
          },
          "& .super-app-theme--header": {
            backgroundColor: "rgba(255, 100,0 , 0.55)",
            color: "black",
            fontWeight: "900",
            fontSize: "1.1rem",
          },
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", mt: 3, mb: 3, color: "#2E3B55" }}
        >
          Goal List
        </Typography>
        <DataGrid
          sx={{ m: 3 }}
          columns={columns}
          rows={rows}
          // getRowId={(row) => row._id}
          getRowId={(row) => row.id}
        ></DataGrid>

        {/* </Grid> */}

        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          color="secondary"
          sx={{ m: 3, mt: 2 }}
        >
          BACK
        </Button>
      </Box>
    </ThemeProvider>
    </div>
  );
};
