import React, { useState } from 'react';
import "./Status.css"
import { useEffect } from "react";
import axios from 'axios';


function Status(props) { 

    const token =localStorage.getItem('token');

    const [studentDetails,setStudentDetails] = useState({name:'', photo:'',isApproved:false })
    
    useEffect(() => {
        axios.get('/api/application/applicationstatus', 
        {headers: {
            'Content-Type': 'application/json',
            'authorization': 'JWT '+ token
            }
        })
        .then(function (res) {
            setStudentDetails(res.data);           
        })

        },[])

        const pdfgenerate = ()=>{
            axios.get('/api/pdf/generate-pdf', 
            {   headers: {
            'Content-Type': 'application/json',
            'authorization': 'JWT '+ token
            }
        })
        .then(function (res) {
            console.log('dfd');           
        })
        }
    
    return (
        <div id='statustable'>
            <table id='table'>
                <thead id='tablehead'>
                    <tr id='tablerow'>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id='tablerow'>
                        <td>{studentDetails.name}</td>
                        <td><img src={studentDetails.photo} alt='profilepic'></img></td>
                        <td>{studentDetails.email}</td>
                        <td>{studentDetails.isApproved}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={()=>pdfgenerate()} id='dbtn'>Download ID Card</button>
        </div>
    );
 
}

export default Status;