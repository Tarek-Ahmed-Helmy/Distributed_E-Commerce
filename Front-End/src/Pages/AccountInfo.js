import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
function AccountInfo() {
    const token = useSelector(store => store.auth).token;
    const profile = jwtDecode(token)
    console.log(token)
    const [products, setProducts] = useState([]);
    const [topSeller, setTopSeller] = useState([]);
    function getTopSeller(products) {
        const sortedProducts = products.sort((a, b) => {
            if (a.quantity !== b.quantity) {
                return b.quantity - a.quantity;
            } else {
                return b.price - a.price;
            }
        });
        setTopSeller(sortedProducts[0]);
    }
    function getSoldProducts() {
        fetch('http://localhost:4500/product/soldItems', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                } else if (response.status === "fail") {
                } else if (response.status === "success") {
                    setProducts(response.data)
                    getTopSeller(response.data)
                }
            }
            ).catch()
    }
    useEffect(() => {
        getSoldProducts();
    }, [])
    return (
        <div className="w-full bg-gray-100">
            <div className="w-[90%] mx-auto mt-[30px] mb-[50px]">
                <h2 className="main-font text-2xl">Account Information</h2>
                <div className="w-full mt-10 px-4 py-3 bg-white shadow-md">
                    <h2 className="text-lg text-gray-500 font-medium">Account Balance</h2>
                    <h2 className="text-[40px] font-bold mt-5 text-center">{profile.balance}</h2>
                </div>
                <div className="w-full mt-10 px-4 py-3 bg-white shadow-md">
                    <h2 className="text-lg text-gray-500 font-medium">Top Seller</h2>
                    <div className="flex items-center gap-6 mt-5 justify-center">
                        <img src={topSeller?.image} alt="product" className="w-[100px] h-[100px] object-contain"></img>
                        <div className="flex flex-col items-center">
                            <h2>{topSeller.name}</h2>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 px-4 py-3 bg-white shadow-md">
                    <h2 className="text-lg text-gray-500 font-medium">List of purchased items</h2>
                    {products.map((product) => {
                        return <div className="flex items-center gap-6 mt-5 justify-center">
                            <img src={product?.image} alt="product" className="w-[100px] h-[100px] object-contain"></img>
                            <div className="flex flex-col items-center">
                                <h2>{product.name}</h2>
                                <h2 className="mt-2">Quantity sold: {product.quantity_sold}</h2>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;