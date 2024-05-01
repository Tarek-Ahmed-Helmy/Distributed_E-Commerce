import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function PurchasedItems() {
    const client = useSelector(state => state.auth);
    const [products, setProducts] = useState([]);
    function getPurchasedProducts() {
        fetch('http://localhost:4500/orders', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${client.token}`
            },
        }).then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                } else if (response.status === "fail") {
                } else if (response.status === "success") {
                    setProducts(response.data);
                }
            }
        ).catch ()
    }
    useEffect(() => {
        getPurchasedProducts();
    }, [])
    return (
        <div className="w-[90%] mx-auto mt-[50px] mb-[50px]">
            <h2 className="font-medium text-2xl">Purchased Items</h2>
            <hr className="border-1 border-gray-300 my-4"></hr>
            <div>
                        {products.map((product, index) => {
                            return <div className="mt-5 flex">
                                <div className=""><img src={product.image} alt="product" className="min-w-[200px] max-w-[200px] h-[150px] object-contain" /></div>
                                <div className="sm:ml-[100px] ml-[30px] flex flex-col justify-center">
                                    <h2 className="font-medium">{product.name}</h2>
                                    <p className="mt-2">Purchased Quantity: {product.quantity}</p>
                                </div>
                            </div>
                        })}
                    </div>
        </div>
    )
}

export default PurchasedItems;