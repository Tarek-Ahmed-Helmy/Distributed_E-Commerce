import profilePic from '../Components/images/profile.png'
import '../Components/CSS/Profile.css'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
export default function Profile(){
    const token = useSelector(store => store.auth).token;
    const profile = jwtDecode(token)
    return(
        <div className="profile-container">
            <div className='profile-pic'>
                <img  src={profilePic}></img>
            </div>
            <div className="profile-name-container">
                <div className="left-container">
                    <div className="info-title">First name</div>
                    <div className="info-data">{profile.fname}</div>
                </div>
                <div className="right-container">
                    <div className="info-title">Last name</div>
                    <div className="info-data">{profile.lname}</div>
                </div>
            </div>
            <div className="profile-email-container">
                <div className="info-title">Username</div>
                <div className="info-data">{profile.username}</div>
            </div>
            <div className="profile-email-container">
                <div className="info-title">Email</div>
                <div className="info-data">{profile.email}</div>
            </div>
            <div className="profile-email-container">
                <div className="info-title">Phone</div>
                <div className="info-data">{profile.phone}</div>
            </div>
        </div>
    )

}