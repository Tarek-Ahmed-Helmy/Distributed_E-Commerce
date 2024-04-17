import logo from "./images/Logo.png";
import { Link } from "react-router-dom";
import { BagFill, PersonFill } from "react-bootstrap-icons";
import { useState } from "react";
function NavBar() {
    const [cart, setCart] = useState(0);
    return (
        <div className="bg-[#070F2B] h-[70px] w-full flex items-center md:px-5 px-2 justify-between">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="md:w-64 w-44 h-[70px] object-cover overflow-hidden" />
                <div className="flex items-center text-white font-medium md:gap-10 gap-5">
                    <Link to="/" className="hover:text-[#9290C3] duration-200">Home</Link>
                    <Link to="products" className="hover:text-[#9290C3] duration-200">Products</Link>
                    <Link className="hover:text-[#9290C3] duration-200">About</Link>
                </div>
            </div>
            <div className="flex items-center gap-4 md:px-8">
                <div className="relative">
                    <Link to="cart" className="text-white text-[25px] hover:text-[#9290C3] duration-200" ><BagFill /></Link>
                    <div className="absolute text-white -top-1 -right-1.5">
                        <h2 className="bg-[#ff0000] rounded-xl px-[4px] text-[10px] font-medium">{cart}</h2>
                    </div>
                </div>
                <Link className="text-[20px] text-[#1B1A55] bg-[#535C91] p-1 rounded-full hover:bg-[#546C92] duration-200"><PersonFill /></Link>
            </div>
        </div>
    )
}

export default NavBar;