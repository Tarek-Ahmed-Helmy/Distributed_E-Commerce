import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { AddProduct } from "../Components/rtk/slices/cartSlice";

function ProductProfile() {
    const params = useParams();
    const dispatch = useDispatch();
    const client = useSelector(state => state.auth);
    const profileData = jwtDecode(client.token)
    const productId = params.productid;
    const [product, setProduct] = useState([]);
    function getProduct() {
        fetch(`http://localhost:4500/product/getProduct/${productId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${client.token}`
            },
        }).then(res => res.json())
            .then(response => setProduct(response.data)).catch()
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
                "Authorization": `Bearer ${client.token}`
            },
            body: JSON.stringify({
                "productID": productId,
            }),
        }).then(res => res.json()).then((res) => {
            if (res.status === "success") {
                Swal.fire({
                    title: "Product Added To Cart Successfully !",
                    icon: "success"
                });
                dispatch(AddProduct(product))
                
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
        <div className="w-[90%] mx-auto mt-[100px] mb-[100px]">
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10">
                <img src={product.image} alt="product" className="w-full object-contain mx-auto lg:h-[500px] md:h-[400px] h-[300px]"></img>
                <div className="">
                    <h2 className="text-gray-400 uppercase">{product.category_name}</h2>
                    <h2 className="main-font text-2xl">{product.name}</h2>
                    <h3 className="text-5xl my-4">{product.price} L.E</h3>
                    <p className="lg:w-3/4">{product.description}</p>
                    <div className="w-full mt-8 text-white gap-4">
                        <button className="w-1/2 py-2 px-8 bg-[#535C91] hover:bg-[#434C81] duration-200" onClick={() => {AddToCart() }}>Add to Cart</button>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    )
}

export default ProductProfile;