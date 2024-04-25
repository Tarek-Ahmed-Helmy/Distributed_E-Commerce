import React from "react";
import Envelop from '../Assets/Images/envelope.png';
import Lock from '../Assets/Images/lock.png';

export default function Login(){
    return(
        <div className="Login-container">
            <div className="header-holder">
                        <p>LOGIN</p>
                    </div>
            <form className="Login-Form" >
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
                <div className='login-buttons-holder'>
                                <button className='login-button' type="submit">Login</button>
                                <div className='line-holder'>
                                    <hr className="horizontal-line" />
                                    <p className='or-text'>OR</p>
                                    <hr className="horizontal-line" />
                                </div>
                                <button className='signup-button-login-form' >Sign up</button>
                </div>

            </form>
        </div>
    )
            
} 