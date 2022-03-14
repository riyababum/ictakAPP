import React from 'react';
import { Link } from 'react-router-dom';
import  { useState } from 'react';
import './Navbar.css';

const Navbar = ({color}) => {
    
    const handleClick = (event) => {
        event.preventDefault();
        localStorage.setItem("name", "");
        redirect()
    }

    const redirect = () => {
        window.location = "/"
    }
    const RenderMenu = () => {
        if(localStorage.getItem("name") !== ""){ 
            return(
                <>
                    <ul>
                    <li><Link className="link" to="/home">HOME</Link></li>
                    
                    <li><button onClick={handleClick}>LOGOUT</button></li>
                    <li className="username">{localStorage.getItem("name")}</li> 
                    <li><Link className="link" to="/contact">CONTACT </Link></li>
                    </ul>
                    </>
                )
            }else{
                return(
                    <>
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        
                        <li><Link to="/login">LOGIN</Link></li>
                        <li><Link to="/signup">SIGNUP</Link></li>  
                        <li><Link to="/contact">CONTACT </Link></li>
                   </ul>
                    </>
                )
            }
        }
        const [open, setOpen] = useState(false);
       
        return (
            <nav className="navbar">
                              
            <a href="#0" className="toggle-button" onClick={() => setOpen(!open)}>  
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                
                <div className={`navbar-links ${open ? 'active' : ''}`}>
                    <RenderMenu />
               
            </div>
        </nav>
    
                )
    }
export default Navbar