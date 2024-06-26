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
  import { Link, useParams } from "react-router-dom";
  import clsx from "clsx";
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
  
  export const IndividualgoalList = () => {
    const [rows, setrows] = useState([]);
    

    
  
    const columns = [
      {
        field: "title",
        headerName: "Title",
        width: 150,
        headerClassName: "super-app-theme--header",
        // cellClassName: "super-app-theme--cell",
      },
      {
        field: "amount",
        headerName: "Amount",
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
        field: "date",
        headerName: "Date",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "mode",
        headerName: "Mode",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "category",
        headerName: "Category",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <Grid container >
            <Grid em>
              <Button
                component={Link}
                to={`/edit/${localStorage.getItem('id')}/${params.row.id}`} // Replace with your edit route
                variant="contained"
                color="primary"
                size="small"
                
              >
               <EditIcon/>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(params.row.id)}
                
              >
                
              <DeleteIcon/>
              </Button>
            </Grid>
          </Grid>
        ),
    
        
      },
      
    ];
    const id = useParams().id
    const getExpenseList = async () => {
      const res = await axios.get(`/api/expensebygoal/${id}`);
      // console.log('rows',res.data.data)
      const row = res.data.data.map((r) => {
        return ({
          id: r._id,
          title: r.title,
          amount: r.amount,
          date: r.date,
          mode: r.mode,
          category: r.category?.name,
          
          
        }
        );
      });
  
      setrows(row);
    };
    const handleDelete=async(id)=>{
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
          const res = await axios.delete(`/api/expensedelete/${id}`)
          getExpenseList();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }); 
    }
    // console.log("setrows", rows);
  
    useEffect(() => {
      getExpenseList();
    }, []);
  
    const defaultTheme = createTheme();
    return (
      <div style={{marginBottom:'22vh'}}>
      <ThemeProvider theme={defaultTheme}>
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
            Goal Expenses
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
            to="/viewGoal"
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
}
