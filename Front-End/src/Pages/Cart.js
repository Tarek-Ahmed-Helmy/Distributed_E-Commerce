import { useState, useEffect } from "react";
import { PlusLg, DashLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {setCartProducts, setCartPrice } from "../Components/rtk/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import emptyList from "../Components/images/empty cart.svg"
function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client = useSelector(state => state.auth);
    const [products, setProducts] = useState([]);
    const[loading, setLodaing] = useState(true);
    const [totalPrice, SetTotalPrice] = useState(0);
    function getProducts() {
        fetch('http://localhost:4500/cart/getAllProducts', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${client.token}`
            },
        }).then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                    setLodaing(false);
                } else if (response.status === "fail") {
                    setLodaing(false);
                } else if (response.status === "success") {
                    let products = [];
                    response.data.map((product) => {
                        products.push({ ...product, quantity: 1 })
                    })
                    setProducts(products);
                    getTotalPrice(products)
                    dispatch(setCartProducts(response.data))
                    setLodaing(false);
                }
            }
        ).catch ()
    }
    function removeProduct(product) {
        fetch(`http://localhost:4500/contain/deleteFromCart`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${client.token}`
            },
            body: JSON.stringify({
                "productID": product.productID,
            }),
        }).then(res => res.json()).then((res) => {
            if (res.status === "success") {
                getProducts();
            } else if (res.status === "error") {
            } else if (res.status === "fail") {
            }
        }).catch(error => { })
    }
    function getTotalPrice(products) {
        const price = products.reduce((acc, product) => {
            acc = acc + product.price * product.quantity;
            return acc
        }, 0)
        SetTotalPrice(Math.floor(price))
    }
    function increaseQt(products, index) {
        let newData = [...products]
        newData[index].quantity = newData[index].quantity + 1;
        setProducts(newData)
        getTotalPrice(newData)
    }
    function decreaseQt(products, index) {
        let newData = [...products]
        if (newData[index].quantity > 1) {
            newData[index].quantity = newData[index].quantity - 1;
            setProducts(newData)
            getTotalPrice(newData)
        }
    }
    function proceedToCheckout() {
        dispatch(setCartProducts(products));
        dispatch(setCartPrice(totalPrice + 20))
        navigate('payment');
    }
    useEffect(() => {
        getProducts();
    }, [])
    if (products?.length > 0) return (
        <div className="w-[90%] mx-auto mt-[50px] mb-[50px]">
            <div className="w-full flex lg:flex-row flex-col gap-10">
                <div className="lg:w-3/4 w-full">
                    <h2 className="font-medium text-2xl">Cart Items</h2>
                    <hr className="border-1 border-gray-300 my-4"></hr>
                    <div>
                        {products.map((product, index) => {
                            return <div className="mt-5 flex">
                                <div className="border"><img src={product.image} alt="product" className="min-w-[200px] max-w-[200px] h-[150px] object-contain" /></div>
                                <div className="sm:ml-[100px] ml-[30px]">
                                    <h2 className="md:w-3/4 font-medium">{product.name}</h2>
                                    <div className="flex gap-4 items-center mt-2">Quantity: <div className="flex items-center gap-2">
                                        <PlusLg className="cursor-pointer" onClick={() => { increaseQt(products, index) }} />
                                        <p className="border border-[#1B262C] py-0.5 w-6 text-center">{product.quantity}</p>
                                        <DashLg className="cursor-pointer" onClick={() => { decreaseQt(products, index) }} />
                                    </div>
                                    </div>
                                    <p className="mt-2"><span className="text-[#1B1A55]">Price: </span>{parseFloat((product.price * product.quantity).toFixed(2))}</p>
                                    <button className="text-[#ff0000] underline text-sm" onClick={() => {removeProduct(product) }}>remove</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="font-medium text-2xl">Order Summary</h2>
                    <hr className="border-1 border-gray-300 my-4"></hr>
                    <div className="text-lg ">
                        <h2 className="">Total Items: {products.length} items</h2>
                        <p className="my-2">Total Items Price: {totalPrice} L.E</p>
                        <p className="pl-2 my-2 text-sm">- Shipping Price: 20 L.E</p>
                        <p className="my-2">Total Price: {totalPrice + 20} L.E</p>
                        <button className="mt-4 bg-yellow-500 py-3 px-4 w-full text-sm font-medium hover:bg-yellow-400 duration-200"
                            onClick={() => { proceedToCheckout() }}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
    else if(!loading) return (
        <div className="flex flex-col items-center text-center justify-center min-h-screen">
            <img src={emptyList} alt="" className="md:h-[350px] md:w-[350px] h-[250px] w-[250px] object-contain"></img>
            <div>
                <p className="mt-5 text-gray-500 text-md md:text-lg sec-font">Your Cart is Empty</p>
            </div>
        </div>
    )
}

export default Cart;