import React from 'react';
import { Link } from 'react-router-dom';
import "./Bmhead.css"

function Bmhead(props) {
    return (
        <div>
            
            <nav className="bmheader">
               
                <div className='bmsidenav'>

                <img src='https://ictkerala.org/wp-content/uploads/2019/01/cropped-ict-ico.png' alt="Hlogo" id='bmheaderlogo'></img>
                <div className='links'>
                    <Link className="link" to="/bm"><br/>Home</Link>
                    <Link className="link" to="/pending">Pending Application</Link>
                    <Link className="link" to="/history">History</Link><br/><hr/><br/>
                    <Link className="link" to="/login">Logout</Link>
                </div>
                </div>
            </nav>
     
        </div>
    );
}

export default Bmhead;