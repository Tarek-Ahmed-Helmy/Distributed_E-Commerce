import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusLg, DashLg } from "react-bootstrap-icons";
function Cart() {
    const cart = useSelector(store => store.cart)
    const [products, setProducts] = useState([]);
    function getProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(response => setProducts(response))
            .catch()
    }
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div className="w-[90%] mx-auto mt-[50px]">
            <div className="w-full flex lg:flex-row flex-col gap-10">
                <div className="lg:w-3/4 w-full">
                    <h2 className="font-medium text-2xl">Cart Items</h2>
                    <hr className="border-1 border-gray-300 my-4"></hr>
                    <div>
                        {products.map((product) => {
                            return <div className="mt-5 flex">
                                <div className="border"><img src={product.image} alt="product" className="min-w-[200px] max-w-[200px] h-[150px] object-contain" /></div>
                                <div className="sm:ml-[100px] ml-[30px]">
                                    <h2 className="md:w-3/4 font-medium">{product.title}</h2>
                                    <div className="flex gap-4 items-center mt-2">Quantity: <div className="flex items-center gap-2">
                                        <PlusLg className="cursor-pointer" />
                                        <p className="border border-[#1B262C] py-0.5 w-6 text-center">0</p>
                                        <DashLg className="cursor-pointer" />
                                    </div>
                                    </div>
                                    <p className="mt-2"><span className="text-[#1B1A55]">Price: </span>{product.price}</p>
                                    <button className="text-[#ff0000] underline text-sm">remove</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="font-medium text-2xl">Order Summary</h2>
                    <hr className="border-1 border-gray-300 my-4"></hr>
                    <div className="text-lg ">
                        <h2 className="">Total Items: 0 items</h2>
                        <p className="my-2">Total Items Price: 355 L.E</p>
                        <p className="pl-2 my-2 text-sm">- Shipping Price: 20 L.E</p>
                        <p className="my-2">Total Price: 355 L.E</p>
                        <button className="mt-4 bg-yellow-500 py-3 px-4 w-full text-sm font-medium hover:bg-yellow-400 duration-200">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;