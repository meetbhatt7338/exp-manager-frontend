import { Grid, ThemeProvider, createTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

export const ListCategory = () => {

    const [rows, setrows] = useState([])
    const columns = [
        {field:"title" , headerName: "Title" , width:150},
        {field:"amount" , headerName: "Amount" , width:150},
        {field:"date" , headerName: "Date" , width:150},
        {field:"mode" , headerName: "Mode" , width:150},
        {field:"category" , headerName: "Category" , width:150},
    ]

    const getExpenseList = async()=>{
        const id = localStorage.getItem('id');
        const res = await axios.get(`http://localhost:4000/api/expense/${id}`)
        // console.log('rows',res.data.data)
        const row = res.data.data.map((r)=>{
            return(
                {
                    id : r._id,
                    title : r.title,
                    amount : r.amount , 
                    date : r.date,
                    mode : r.mode,
                    category : r.category.name
                }
            )
        })
   
        setrows(row);
        
    }
    console.log('setrows',rows)
    
    useEffect(() => {
      getExpenseList();
    }, [])
    

    const defaultTheme  = createTheme();
    return (
    <ThemeProvider theme={defaultTheme}>

        <Grid container >
            <DataGrid
            columns={columns}
            rows={rows}
            // getRowId={(row) => row._id}
            getRowId={(row) => row.id}
            
            ></DataGrid>
        </Grid>
        
    </ThemeProvider>
  )
}
