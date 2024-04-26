import React from "react";
import Envelop from '../Components/images/envelope.png';
import Lock from '../Components/images/lock.png';
import "../Components/CSS/Signup.css"

export default function Signup(){
    return(
        <div className="Login-container">
            <div className="header-holder">
                        <p>Sign Up</p>
                    </div>
            <form className="Login-Form" >
                <div className="name-container">
                    <div className="name-input-holder">
                    <label>First Name</label>
                        <div className="name-input  mt-2">
                            <input
                                type="first-name"
                                placeholder="John"
                            />
                        </div>
                    </div>
                    <div className="name-input-holder">
                        <label>Last Name</label>
                        <div className="name-input mt-2">
                            <input
                                type="last-name"
                                placeholder="Wick"
                            />
                        </div>
                    </div>
                </div>
                <label>Email</label>
                <div className="input">
                    <input
                        type="email"
                        placeholder="Alex@email.com"
                        pattern= "/^[a-zA-Z0-9_.+-]+@(gmail\.com|yahoo\.com)$/"
                        
                    />
                    <img
                        src={Envelop}
                        alt="Envelope"
                        className="icon"
                    />
                </div>
                <label>Password</label>
                <div className='input'>
                    <input
                        type="password"
                        placeholder="Enter your password"
                    />
                    <img
                        src={Lock}
                        alt="Lock"
                        className="icon"
                    />

                </div>
                <label>Confirm password</label>
                <div className='input'>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        
                    />
                    <img
                        src={Lock}
                        alt="Lock"
                        className="icon"
                    />

                </div>
                <div className='signup-button-holder'>
                    <button className='signup-button-login-form' >Sign up</button>
                </div>

            </form>
        </div>
    )
            
} 