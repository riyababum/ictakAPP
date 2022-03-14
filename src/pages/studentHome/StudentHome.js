import React from 'react';
import "./StudentHome.css"

function StudentHome(props) {
    return (
        <div className='studhome'>
         <div className='welcome'>
            <img src='https://www.ajce.in/cse/images/ict_academy.png' alt ='logo' id='stuhomelogo' />
            <p>Welcome to </p>
            <p> ICT ACADEMY OF KERALA</p>
            <p>Building the Nation's Future</p><br></br>
            <p>For generating your ID card click application button</p>
         </div>
        </div>
    );
}

export default StudentHome;