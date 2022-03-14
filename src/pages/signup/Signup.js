import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { validateSignup } from '../validateForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';


const Signup = () => {

    const [formValues, setFormValues] = useState({ username: "", email: "", password: "", cpassword: "" });
    const [errorValues, setErrorValues] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let validationErrors = validateSignup(formValues);
        setIsSubmit(true);
        setErrorValues(validationErrors);
    }

    useEffect(() => {
		if (Object.keys(errorValues).length === 0 && isSubmit) {
			    axios.post("/api/user/reg", {
					name:formValues.username,
					email:formValues.email,
					password:formValues.password
				}).then((res)=>{
                    alert(res.data.message);
                    if(res.data.message ==='Successfully Registered. Please Log In')
                    { navigate("/login", { replace: true }); }
                })
		}
	}, [errorValues]);


    return (
        <div className="signup">
                <form onSubmit={handleSubmit} className="content">
                    <h1 id="say-hello">SIGN UP</h1><br />
                                        
                    <input className="fld" type="text" id="name" name="username" placeholder="Enter Your Name" required="" value={formValues.username} onChange={handleChange} />
                    <p className="errorText">{errorValues.username}</p>
                                                
                    <input className="fld"  type="email" id="email" name="email" placeholder="Enter Your Email Address" required="" value={formValues.email} onChange={handleChange} />
                    <p className="errorText">{errorValues.email}</p>
                    
                    <input className="fld" type="password" id="password" name="password" placeholder="Enter Your Password" required="" value={formValues.password} onChange={handleChange} />
                    <p className="errorText">{errorValues.password}</p>
                    
                    <input className="fld" type="password" id="cpassword" name="cpassword" placeholder="Confirm Your Password" required="" value={formValues.cpassword} onChange={handleChange} />
                    <p className="errorText">{errorValues.cpassword}</p>
                    <br /><br />

                    <button className="button" type="submit" >Sign up</button>

                    <div className="redirect">
                        <Link to="/login">Already registered? Login</Link>
                    </div>

                </form>
            </div>
    );
};

export default Signup;