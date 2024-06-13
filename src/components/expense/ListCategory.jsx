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
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { CustomeLoader } from "../CustomeLoader";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export const ListCategory = () => {
  const [rows, setrows] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // const expensesByMonth = groupExpensesByMonth(expenses);
  // console.log(expensesByMonth);

  const searchRecordeHandler = async (e) => {
    try {
      const res = await axios.get(
        `/api/filterexpense/${localStorage.getItem("id")}`,
        {
          params: {
            title: e.target.value,
          },
        }
      );
      const row = res.data.data.map((r) => {
        return {
          id: r._id,
          title: r.title,
          amount: r.amount,
          date: r.date,
          mode: r.mode,
          category: r.category?.name,
        };
      });

      setrows(row);
    } catch (error) {}
  };
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 250,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value <= 5000,
          positive: params.value > 5000,
        });
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",

    },
    {
      field: "mode",
      headerName: "Mode",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",

    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",

    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",

      renderCell: (params) => (
        <Grid container>
          <Grid em>
            <Button
              component={Link}
              to={`/edit/${localStorage.getItem("id")}/${params.row.id}`} // Replace with your edit route
              variant="contained"
              color="primary"
              size="small"
            >
              <EditIcon />
            </Button>
          </Grid>
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

  const getExpenseList = async () => {
    setisLoading(true);
    const id = localStorage.getItem("id");
    const res = await axios.get(`/api/expense/${id}`);
    // console.log("rows", res.data.data);
    const row = res.data.data.map((r) => {
      const month = dayjs(r.date).format("MMM D,YYYY h:mm A");
      return {
        id: r._id,
        title: r.title,
        amount: r.amount,
        date: month,
        mode: r.mode,
        category: r.category?.name,
      };
    });

    setrows(row);
    setisLoading(false);
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
          `/api/expensedelete/${id}`
        );
        // console.log(res);
        getExpenseList();
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
    getExpenseList();
  }, []);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const defaultTheme = createTheme();
  return (
    <>
      {isLoading ? (
        <CustomeLoader />
      ) : (
        <div style={{ marginBottom: "30vh" }}>
          <ThemeProvider theme={defaultTheme}>
            {/* <Grid container> */}
            <Box
              sx={{
                height: 500,
                width: "100%",
                "& .super-app-theme--cell": {
                  // backgroundColor: "rgba(224, 183, 60, 0.55)",
                  // color: "#1a3e72",
                  // fontWeight: "nor",
                  fontSize:"1rem"
                },
                "& .super-app.negative": {
                  // color: "rgba(255, 0,0 , 1)",
                  // fontWeight: "600",
                  fontSize:"1rem"
                },
                "& .super-app.positive": {
                  color: "rgba(255, 0,0 , 0.7)",
                  fontWeight: "600",
                  fontSize:"1rem"
                },
                "& .super-app-theme--header": {
                  backgroundColor: "rgba(255, 100,0 , 0.55)",
                  color: "black",
                  fontWeight: "900",
                  fontSize: "1.2rem",
                },
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{ textAlign: "center", mt: 3, ml: 1, color: "#2E3B55" }}
              >
                Expenses List
                <div className="record-header" style={{ fontSize: "16px" }}>
                  <div className="add">
                    <span>Entries</span>
                    <select name="" id="">
                      <option value="">ID</option>
                    </select>
                    <Button
                      component={Link}
                      to="/add"
                      variant="contained"
                      color="primary"
                      // sx={{ m: 3, mt: 2 }}
                    >
                      Add Record
                    </Button>
                  </div>
                  <div className="browse">
                    <input
                      type="search"
                      placeholder="Search"
                      className="record-search"
                      onChange={(e) => {
                        searchRecordeHandler(e);
                      }}
                    />
                    <select name="" id="">
                      <option value="">Status</option>
                    </select>
                  </div>
                </div>
              </Typography>

              <DataGrid
                slots={{
                  toolbar: CustomToolbar,
                }}
                sx={{ m: 3 }}
                columns={columns}
                rows={rows}
                // getRowId={(row) => row._id}
                getRowId={(row) => row.id}
              ></DataGrid>

              {/* </Grid> */}

              <Button
                component={Link}
                to="/add"
                variant="contained"
                color="secondary"
                sx={{ m: 3, mt: 2 }}
              >
                BACK
              </Button>
            </Box>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
