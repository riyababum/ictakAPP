import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import './Application.css'
import {Validateapplication} from '../validateForm';
import axios from 'axios';

function Application(props) {

    const [applicationValues, setapplicationValues] = useState({ username: "",coursetype:"", email: "",  phoneno: "" , batch: "", startingdate: "", endingdate: ""});
    const [filename,setFileName] = useState("")   ;
    const [errorValues, setErrorValues] = useState({});
    const [courseList,setCourseList]= useState([]);
    const [batchList,setBatchList]= useState([]);
    
    const token =localStorage.getItem('token');

    const navigate = useNavigate;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setapplicationValues({ ...applicationValues, [name]: value });
    }
    const dateChange = (event) => {
        const date = event.target.value;
        const myDate = new Date(date);
    }

    const handleChangeImage = (event) => {
        setFileName(event.target.files[0]);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // for(let i=0;i<courseList.length;i++){
        //     if(courseList[i].courseName===applicationValues.coursetype){
        //         applicationValues.coursetype =  courseList[i]._id;
        //     }
        // } 
        // for(let i=0;i<batchList.length;i++){
        //     if(batchList[i].batchNumber === applicationValues.batch){
        //         applicationValues.batch =  batchList[i]._id;
        //     }
        // }

        const formData = new FormData();

        formData.append('username', applicationValues.username);
        formData.append('coursetype', applicationValues.coursetype);
        formData.append('email', applicationValues.email);
        formData.append('phoneno', applicationValues.phoneno);
        formData.append('batch', applicationValues.batch);
        formData.append('startingdate', applicationValues.startingdate);
        formData.append('endingdate', applicationValues.endingdate);
        formData.append('photo', filename);
 
        const validationErrors = Validateapplication(applicationValues,filename);
        setErrorValues(validationErrors);
        if(Object.keys(validationErrors).length === 0)
            ApplicationDetails(formData);
    }
    
    const ApplicationDetails = async (formData) => {
        axios.post("/api/application/postapplication", formData,
            {headers: {
                'Content-Type': 'application/json',
                'authorization': 'JWT '+ token
                }
            }).then(res=>{
                if (res.status) {
                        alert("Application submitted successfully");
                        navigate("/status", { replace: true });
                    } else {
                        alert("Application applied Unsuccessful!");
                    }})
            }

// to get course name and details
useEffect(()=>{
    axios.get("/api/application/courselist",
            {headers: {
                'Content-Type': 'application/json',
                'authorization': 'JWT '+ token
                }
            }).then(res=>{
                setCourseList(res.data);
            });
    axios.get("/api/application/batchlist",
            {headers: {
                'Content-Type': 'application/json',
                'authorization': 'JWT '+ token
                }
            }).then(res=>{
                setBatchList(res.data);
            });
},[])


    return (
        <div className='applicationbody'>

            <div className='application'>  
                
			    <form onSubmit={(e)=>handleSubmit(e)} className='applicationform' encType='multipart/form-data'>
					<label id='applicationtitle'>Application </label><br></br>

				    <div className='row'>
                        <div className='col-25'>	
                            <label>Name:</label> 
                        </div>
                        <div className='col-75'>
                            <input  placeholder='Name' name="username"  value={applicationValues.username} onChange={handleChange} /> 
                        </div>
                        <p className="applicationerrorText">{errorValues.username}</p>
                    </div>
         
                    <div className='row'>
                        <div className='col-25'>
                            <label htmlFor='coursetype'>Course type:</label>    
                        </div>
                        <div className='col-75'>
                            <select name="coursetype" id="coursetype"  value={applicationValues.coursetype} onChange={handleChange}>
                                <option value="" disabled> --Select Course Type--</option>
                                {courseList.map((course,key) => (
                                    <option key={key}>{course.courseName}</option>
                                ))}
                            </select> 
                        </div>
                        <p className="applicationerrorText">{errorValues.coursetype}</p>
                    </div>

                    <div className='row'>
                        <div className='col-25'>	
                            <label>Email:</label>
                        </div>
                        <div className='col-75'>
                            <input  placeholder='Email' name="email"  value={applicationValues.email} onChange={handleChange}/> 
                        </div>
                        <p className="applicationerrorText">{errorValues.email}</p>
                    </div>              

                    <div className='row'>
                        <div className='col-25'>	
                            <label>Select Image:</label>
                        </div>
                        <div className='col-75'>
                            <input type='file' placeholder='photo' filename= 'photo' onChange={handleChangeImage}/>
                        </div>
                        <p className="applicationerrorText">{errorValues.filename}</p>
                    </div>
 
				    <div className='row'>
                        <div className='col-25'>	
                            <label>Phone No:</label>
                        </div>
                        <div className='col-75'>
                            <input  placeholder='Phone No' name="phoneno"  value={applicationValues.phoneno} onChange={handleChange}/>
                        </div>
                        <p className="applicationerrorText">{errorValues.phoneno}</p>
                    </div>

                    <div className='row'>
                        <div className='col-25'>	
                            <label>Batch:</label>
                        </div>
                        <div className='col-75'>
                            <select name="batch"  value={applicationValues.batch} onChange={handleChange} id="coursetype">
                                <option value="" disabled> --Select Batch Number--</option>
                                {batchList.map((batch,key) => (
                                <option key={key}>{batch.batchNumber}</option>
                                ))}
                            </select> 
                        </div>
                        <p className="applicationerrorText">{errorValues.batch}</p>
                    </div>

                    <div className='row'>
                        <div className='col-25'>	
                            <label>Course Starting date:</label>
                        </div>
                        <div className='col-75'>
                            <input type='date' placeholder='Course Starting date' name="startingdate"  value={applicationValues.startingdate} onChange={(e)=>{handleChange(e); dateChange(e);}}/> 
                        </div>
                        <p className="applicationerrorText">{errorValues.startingdate} </p>
                    </div>

                    <div className='row'>
                        <div className='col-25'>	
                            <label>Course Ending Date:</label>
                        </div>
                        <div className='col-75'>
                            <input type='date' placeholder='Course Ending Date' name="endingdate"  onChange={handleChange}/> 
                        </div>
                    </div>

					<button  className='submitbutton'>Submit</button>

				</form>		
            </div>
        </div>  
    );
}

export default Application;