import {
    Button,
    Grid,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
  import { DataGrid } from "@mui/x-data-grid";
  import axios from "axios";
  import React, { useState } from "react";
  import { useEffect } from "react";
  import Box from "@mui/material/Box";
  import { Link } from "react-router-dom";

  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";

export const ListRevenue = () => {
    const [rows, setrows] = useState([]);
    const defaultTheme = createTheme();


    const listrevenue = async () => {
        const id = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:4000/api/getrevenue/${id}`);
        // console.log('rows',res.data.data)
        const row = res.data.data.map((r) => {
          return {
            id:r._id,
            name:r.name,
            date : r.date,
            income: r.income,

            
          };
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
            await axios.delete(`http://localhost:4000/api/removerevenue/${id}`)
            listrevenue();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
   
    
      useEffect(() => {
        listrevenue();
      }, []);
  
    const columns = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        headerClassName: "super-app-theme--header",
        // cellClassName: "super-app-theme--cell",
      },
      {
        field: "date",
        headerName: "Date",
        width: 300,
        headerClassName: "super-app-theme--header", 
      },
      {
        field: "income",
        headerName: "Income",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      
      {
        field: "action",
        headerName: "Action",
        width: 280,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
        <Grid container >
            <Grid em>
              <Button
                component={Link}
                to={`/editrevenue/${params.row.id}`} // Replace with your edit route
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
  
   

  return (
    <div style={{marginBottom:'22vh'}}>
    <ThemeProvider theme={defaultTheme}>
    {/* <Grid container> */}
    <Box
      sx={{
        height: 400,
        width: "100%",
        
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
        Income List
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
  )
}
