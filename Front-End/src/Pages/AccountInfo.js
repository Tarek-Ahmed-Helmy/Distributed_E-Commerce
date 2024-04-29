import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
function AccountInfo() {
    const token = useSelector(store => store.auth).token;
    const profile = jwtDecode(token)
    console.log(token)
    const [products, setProducts] = useState([]);
    function getProducts() {
        fetch('http://localhost:4500/product/getAllProductsHome')
            .then(res => res.json())
            .then(response => setProducts(response.data))
            .catch()
    }
    useEffect(()=>{
        getProducts();
    },[])
    return (
        <div className="w-full bg-gray-100">
            <div className="w-[90%] mx-auto mt-[30px]">
                <h2 className="main-font text-2xl">Account Information</h2>
                <div className="w-full mt-10 px-4 py-3 bg-white shadow-md">
                    <h2 className="text-lg text-gray-500 font-medium">Account Balance</h2>
                    <h2 className="text-[40px] font-bold mt-5 text-center">{profile.balance}</h2>
                </div>
                <div className="w-full mt-10 px-4 py-3 bg-white shadow-md">
                    <h2 className="text-lg text-gray-500 font-medium">List of purchased items</h2>
                    <div className="flex items-center gap-4 mt-5 justify-center">
                        <img src={products[0]?.image} alt="product" className="w-[100px] h-[100px] object-contain"></img>
                        <h2>{products[0]?.name}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;