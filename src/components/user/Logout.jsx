import React from 'react'
import "../../assets/css/Logout.css"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';




export const Logout = () => {
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem('id');
    navigate('/')
  }
  return (
    <>
    <div class="container">
    <h1>Logout</h1>
    <p>Are you sure you want to log out?</p>
    <Button onClick={()=>{logout()}}
                 
                    
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, }}
                  >
                    LOGOUT
                  </Button>

    
    
  </div>
  
  </>
  )
}
