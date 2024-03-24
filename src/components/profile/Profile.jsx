import React, { useRef, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from '@mui/icons-material/Upload';
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setuser] = useState({});
  const navigate = useNavigate();

  const changePass=()=>{
      navigate('/resetpassword',{state:{email:user[0]?.email}})
  }
  //get user
  const userData = async () => {
    try {
      const res = await axios.get(
        `/api/user/${localStorage.getItem("id")}`
      );
      setuser(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.log("some error");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  //   fileUploadHandler
  const inputRef = useRef(null)
  const [image, setimage] = useState()
  const [imgurl, setimgurl] = useState()

  const handleFileChange=async(event)=>{
        setimage(event.target.files[0])
        // console.log(event.target.files[0])
        
  }
  // console.log('image',image)
  const handleButtonClick=()=>{
    inputRef.current.click();
    
  }

  const handlefileapi=async()=>{
    const formData = new FormData();
    formData.append("myProfile", image);
    const res = await axios.post(`/api/upload/${localStorage.getItem('id')}`,formData)
      // console.log(res.data)
      if(res.data.data.profilImgeUrl){
        toast.success("Successfully Uploaded", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
      })}

      getProfile();
      
   
  }

  const getProfile =async()=>{
    const getimageurl = await axios.get(`/api/imagebyuser/${localStorage.getItem('id')}`)
      setimgurl(getimageurl.data.data[getimageurl.data.data.length-1]?.profilImgeUrl)
    // console.log("url",getimageurl.data.data[getimageurl.data.data.length-1]?.profilImgeUrl)
  }
  useEffect(() => {
    getProfile();
  }, [])
  
  

  return (
    
    <>
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
      <div class="main-content" >
        <div class="containerrr mt-7">
          {/* <!-- Table --> */}
          <h2 class="mb-5">Profile</h2>
          <div class="row">
            <div class="col-xl-8 m-auto order-xl-2 mb-5 mb-xl-0">
              <div class="card card-profile shadow">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2">
                    <div class="card-profile-image">
                      
                        <img
                          src={imgurl != null ? imgurl : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"}
                          class="rounded-circle"
                        ></img>
                     
                    </div>
                  </div>
                </div>
                <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div class="d-flex justify-content-between">
                    {/* <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                <a href="#" class="btn btn-sm btn-default float-right">Message</a> */}
                  </div>
                </div>
                <div class="card-body pt-0 pt-md-4">
                  <div class="row">
                    
                    <div class="col">
                    <div className="ram">
                       
                       <input
                         ref={inputRef}
                         id="fileInput"
                         type="file"
                         style={{ display: "none" }}
                         onChange={handleFileChange}
                       />

                       {/* Button to select file and upload */}
                       <div onClick={handleButtonClick}>
                           <Button style={{padding:'0', marginTop:'22px'}}
                         variant="contained"
                        //  color="primary"
                        //  size="small"
                         
                       >
                         <EditIcon />
                         </Button>
                         </div>
                         <div onClick={handlefileapi}>
                           <Button style={{padding:'0'}}
                         variant="contained"
                        //  color="primary"
                        //  size="small"
                         
                       >
                          
                         <UploadIcon />
                         </Button>
                         </div>
                     </div>
                      <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                        
                        <div>
                          <span class="heading">
                            Hii, {user[0]?.firstName + " " + user[0]?.lastName}{" "}
                          </span>
                          <span class="description">User</span>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <h3>
                      status :{" "}
                      <span class="font-weight-light">
                        {user[0]?.status == true ? "active" : "not active"}
                      </span>
                    </h3>
                    <div class="h5 font-weight-300">
                      <i class="ni location_pin mr-2"></i>
                      {user[0]?.email}
                    </div>
                    <div class="h5 mt-4">
                      <i class="ni business_briefcase-24 mr-2"></i>
                      
                      <Button
                   
                    
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 3.5, width: "20%" }}
                    onClick={()=>{changePass()}}
                  >
                    Change Password
                  </Button>
                    </div>
                    <div>
                      {/* <i class="ni education_hat mr-2"></i>University of Computer Science */}
                    </div>
                    <hr class="my-4"></hr>
                    <p>Expense Manager </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


