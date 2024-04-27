import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function ProductProfile() {
    const params = useParams();
    const client = useSelector(state => state.auth);
    const profileData = jwtDecode(client.token)
    const productId = params.productid;
    const [product, setProduct] = useState([]);
    function getProduct() {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(response => setProduct(response)).catch()
    }
    function Failure(message) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
        });
    }
    function AddToCart() {
        fetch(`http://localhost:4500/contain/addToCart`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": profileData.username,
                "clientID": profileData.clientID,
                "productID": productId,
                "cartID": 1
            }),
        }).then(res => res.json()).then((res) => {
            if (res.status === "success") {
                Swal.fire({
                    title: "Product Added To Cart Successfully !",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else if (res.status === "error") {
                Failure(res.message)
            } else if (res.status === "fail") {
                Failure("Something went wrong!")
            }
        }).catch(error => { })
    }
    useEffect(() => {
        getProduct();
    }, [])
    return (
        <div className="w-[90%] mx-auto mt-[100px]">
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10">
                <img src={product.image} alt="product" className="w-full object-contain mx-auto lg:h-[500px] md:h-[400px] h-[300px]"></img>
                <div className="">
                    <h2 className="text-gray-400 uppercase">{product.category}</h2>
                    <h2 className="main-font text-2xl">{product.title}</h2>
                    <h3 className="text-5xl my-4">{product.price}$</h3>
                    <p className="lg:w-3/4">{product.description}</p>
                    <div className="lg:w-3/4 mt-8 flex items-center text-white gap-4">
                        <button className="w-full py-2 px-8 bg-[#1B1A55] hover:bg-[#0B0A45] duration-200">Buy it Now</button>
                        <button className="w-full py-2 px-8 bg-[#535C91] hover:bg-[#434C81] duration-200" onClick={() => { }}>Add to Cart</button>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    )
}

export default ProductProfile;