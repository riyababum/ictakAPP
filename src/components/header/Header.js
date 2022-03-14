import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

function Header(props) {
    return (
        <div>
            
            <nav className="header">
               
                <div className='sidenav'>

                <img src='https://ictkerala.org/wp-content/uploads/2019/01/cropped-ict-ico.png' alt="Hlogo" id='headerlogo'></img>
                <div className="links">
                    <Link className="link" to="/studenthome">Home</Link>
                    <Link className="link" to="/application">Application</Link>
                    <Link className="link" to="/status">Status</Link><br/><hr/><br/>
                    <Link className="link" to="/login">Logout</Link>
                </div>
                </div>
            </nav>
     
        </div>
    );
}

export default Header;