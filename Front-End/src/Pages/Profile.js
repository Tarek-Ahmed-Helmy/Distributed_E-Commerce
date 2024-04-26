import profilePic from '../Components/images/profile.png'
import '../Components/CSS/Profile.css'
export default function Profile(){
    return(
        <div className="profile-container">
            <div className='profile-pic'>
                <img  src={profilePic}></img>
            </div>
            <div className="profile-name-container">
                <div className="left-container">
                    <div className="info-title">First name</div>
                    <div className="info-data">John</div>
                </div>
                <div className="right-container">
                    <div className="info-title">Last name</div>
                    <div className="info-data">Wick</div>
                </div>
            </div>
            <div className="profile-email-container">
                <div className="info-title">Email</div>
                <div className="info-data">John123@gmail.com</div>
            </div>
        </div>
    )

}