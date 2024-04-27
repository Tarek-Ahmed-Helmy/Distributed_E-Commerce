import Envelop from '../Components/images/envelope.png';
import Lock from '../Components/images/lock.png';
import "../Components/CSS/Signup.css"
import { useState } from "react";
import { ShowErrorMessage } from './AddProduct';
import { CheckCircleFill } from 'react-bootstrap-icons';

export default function Signup() {
    const [data, setData] = useState({
        fname: "",
        lname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
        phone: "",
    })
    const [reserror, setResError] = useState("")
    const [success, setSuccess] = useState(false);
    function compPassword() {
        if ((data.password !== data.confirmPassword) && (data.password !== "") && (data.confirmPassword !== "")) return false;
        else return true
    }
    function HandleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const AddData = () => {
        fetch(`http://localhost:4500/clients/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fname": data.fname,
                "lname": data.lname,
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "phone": data.phone,
                "country": "EGY",
                "cardInfo": "1234-5678-9876-5432"
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                setResError("")
                setSuccess(true)
            } else if (data.status === "error") {
                setResError(data.message)
            } else if (data.status === "fail") {
                setResError("oops, something wrong went on !")
            }
        }).catch(error =>setResError("Unfortunately there was a server error"))
    }
    function HandleClick(e) {
        e.preventDefault();
        AddData();
    }
    return (
        <div className="Login-container">
            <div className="header-holder">
                <p className='text-[#2a5ba4]'>Sign Up</p>
            </div>
            <form className="Login-Form" onSubmit={HandleClick}>
                <div className="name-container">
                    <div className="name-input-holder">
                        <label>First Name</label>
                        <div className="name-input  mt-2">
                            <input
                                name="fname"
                                type="first-name"
                                placeholder="John"
                                required
                                onChange={HandleChange}
                            />
                        </div>
                    </div>
                    <div className="name-input-holder">
                        <label>Last Name</label>
                        <div className="name-input mt-2">
                            <input
                                name="lname"
                                type="last-name"
                                placeholder="Wick"
                                required
                                onChange={HandleChange}
                            />
                        </div>
                    </div>
                </div>
                <label>Username</label>
                <div className="input">
                    <input
                        name="username"
                        type="text"
                        placeholder="john123"
                        required
                        onChange={HandleChange}
                    />
                </div>
                <label>Phone</label>
                <div className="input">
                    <input
                        name="phone"
                        type="text"
                        placeholder="0293930303"
                        required
                        onChange={HandleChange}
                    />
                </div>
                <label>Email</label>
                <div className="input">
                    <input
                        name="email"
                        type="email"
                        placeholder="Alex@email.com"
                        pattern="/^[a-zA-Z0-9_.+-]+@(gmail\.com|yahoo\.com)$/"
                        required
                        onChange={HandleChange}
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
                        name="password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        onChange={HandleChange}
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
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="Enter your password"
                        onChange={HandleChange}
                    />
                    <img
                        src={Lock}
                        alt="Lock"
                        className="icon"
                    />
                </div>
                <ShowErrorMessage condition={!compPassword()} value={"Password doesn't match"} />
                <ShowErrorMessage condition={reserror !== ""} value={reserror} />
                {success && <span className="text-[15px] text-green-500 flex gap-1 items-center mt-1"><CheckCircleFill />Account Created Successfully</span>}
                <div className='signup-button-holder'>
                    <button className='signup-button-login-form client'>Sign up</button>
                </div>
            </form>
        </div>
    )

} 