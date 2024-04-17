import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addtoCart } from "../Components/rtk/slices/cartSlice";
function ProductProfile() {
    const params = useParams();
    const productId = params.productid;
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    function getProduct() {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(response => setProduct(response)).catch()
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
                        <button className="w-full py-2 px-8 bg-[#535C91] hover:bg-[#434C81] duration-200" onClick={() =>{dispatch(addtoCart(product))}}>Add to Cart</button>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    )
}

export default ProductProfile;