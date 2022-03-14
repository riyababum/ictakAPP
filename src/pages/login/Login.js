import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { validateLogin } from '../validateForm';
import axios from 'axios';
import './Login.css';


const Login = ({setToken}) => {
    
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [errorValues, setErrorValues] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
   
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        let validationErrors = validateLogin(formValues);
        setIsSubmit(true);
        setErrorValues(validationErrors);
    }

    useEffect(()=>{
		if(Object.keys(errorValues).length===0 && isSubmit){
            axios.post("/api/user/login",{
                email:formValues.email,
                password:formValues.password
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => { 
                alert(res.data.message);
                localStorage.setItem("token",res.data.token)
                if(res.data.message==="Login Successfull"){
                    navigate('/studenthome');                
                }
            }); 
		}
	},[errorValues])




    // const userLogin = async () => {
    //     const uname = formValues.username;
    //     const password = formValues.password;
    //     const response = await fetch("/api/user/login", {
    //         method: 'post',
    //         body: JSON.stringify({ uname, password }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const body = await response.json();
        
    //     if (body.uname === uname) {
    //         setToken(body);
    //         navigate("/article-list", { replace: true });
    //     } else {
    //         alert("Login Unsuccessful!");
    //     }
    // };

    return (
            <div className='login'>
                <form onSubmit={handleSubmit} className="loginform">
                    <h1 id="say-hello">LOGIN</h1><br />

                    <input className="input" type="email" name="email" placeholder="Enter Your Email ID" id="email" required="" value={formValues.username} onChange={handleChange} />
                    <p className="errorText">{errorValues.username}</p>

                    <input className="input" type="password" name="password" placeholder="Enter Your Password" id="password" required="" value={formValues.password} onChange={handleChange} />
                    <p className="errorText">{errorValues.password}</p>
                    <br /> <br/>

                    <button className="button">Login</button>

                    <div className="redirect">
                    <Link to="/signup" className="signupLink">Not a member? Register</Link>
                    </div>

                </form>
            </div>
    );
};

export default Login;
