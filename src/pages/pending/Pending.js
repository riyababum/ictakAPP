
import React, { useState } from 'react';
import "./Pending.css"
import { useEffect } from "react";
import axios from 'axios';


function Pending(props) {

    const token =localStorage.getItem('token');

    const [studentDetails,setStudentDetails] = useState([]);
    const [courseList,setCourseList]= useState([]);
    const [batchList,setBatchList]= useState([]);
    
    useEffect(() => {
        axios.get('/api/batch/applications', 
        {headers: {
            'Content-Type': 'application/json',
            'authorization': 'JWT '+ token
            }
        })
        .then(function (res) {
            setStudentDetails(res.data);
        })

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

        // axios.get('/api/public/uploads',
        //     {headers: {
        //     'Content-Type': 'application/json',
        //     'authorization': 'JWT '+ token
        //     }
        //     }).then(res=>{
        //     setBatchList(res.data);
        //     });

            // for(let j=0;j<studentDetails.length;j++){
            //     for(let i=0;i<courseList.length;i++){
            //         if(studentDetails[j].course === courseList[i]._id){
            //         studentDetails[j].course =  courseList[i].courseName;
            //         }
            //     }
            //     for(let i=0;i<batchList.length;i++){
            //         if(batchList[i]._id === studentDetails[j].batch){
            //         studentDetails[j].batch =  batchList[i].batchNumber;
            //         }
            //     }
            // }
  
        },[])

        const approve = async (id)=>{
            console.log(id);
            await axios.put(`/api/batch/${id}/approveapplication`,
            {headers: {
                'Content-Type': 'application/json',
                // 'authorization': 'JWT '+ token
                }
            }).then(res=>{
                alert(res.data);
            }); 
        }

        const reject = (id)=>{
            axios.put(`/api/batch/${id}/rejectapplication`,
            {headers: {
                'Content-Type': 'application/json',
                'authorization': 'JWT '+ token
                }
            }).then(res=>{
                alert(res.data);
            }); 
        }
    
    return (
        <div className='statustable'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Image</th>
                        <th>Batch</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                
                    {studentDetails.map((student,key)=>(
                      <tbody key ={key}>
                        <tr>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td><img src={student.photo} alt='profilepic'></img></td>
                            <td>{student.batch}</td>
                            <td>{student.startDate.substring(0, 10)}</td>
                            <td>{student.endDate.substring(0, 10)}</td>
                            <td>{student.isApproved}</td> 
                            <td><button onClick={(e)=>approve(student)} id='btn'>Approve</button></td>
                            <td><button onClick={(e)=>reject(student)} id = 'btn'>Reject</button></td>
                            <td><button onClick={(e)=>reject(student._id)} id = 'btn'>Download</button></td>
                        </tr>
                      </tbody>
                    ))}
            </table>
        </div>
    );
 
}

export default Pending;