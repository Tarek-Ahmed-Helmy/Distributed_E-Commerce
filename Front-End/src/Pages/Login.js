import Envelop from '../Components/images/envelope.png';
import Lock from '../Components/images/lock.png';
import { Link } from 'react-router-dom';
import '../Components/CSS/Login.css'

export default function Login() {
    return (
            <div className="Login-container shadow-md">
                <div className="header-holder">
                    <p>LOGIN</p>
                </div>
                <form className="Login-Form" >
                    <label>Email</label>
                    <div className="input">
                        <input
                            type="email"
                            placeholder="Alex@email.com"
                            pattern="/^[a-zA-Z0-9_.+-]+@(gmail\.com|yahoo\.com)$/"
                            required
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
                            required
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
                        <Link to="/sign-up"><button className='signup-button-login-form mt-4' >Sign up</button></Link>
                    </div>
                </form>
            </div>
    )
} 