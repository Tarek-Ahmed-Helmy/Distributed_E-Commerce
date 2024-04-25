import HomeImage from "../Components/images/Home.jpg";
import Bags from "../Components/images/Bags.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
    return (
        <div className="w-full">
            <Link to={`products/${product.id}`}><img src={product.image} alt="product" className="w-full h-[220px] object-contain mx-auto"></img></Link>
            <div className="mt-2 px-4 text-center">
                <Link to={`products/${product.id}`} className="hover:text-[#535C91] duration-200"><h2 className="font-medium">{product.title}</h2></Link>
                <h2 className="text-md">{product.price} L.E</h2>
            </div>
        </div>
    )
}
function Home() {
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
        <div className="mb-[100px]">
            <div className="relative w-full">
                <div className="w-full h-full absolute bg-black opacity-[40%]"></div>
                <div className="absolute h-full w-full mx-auto text-center text-white flex flex-col items-center justify-center">
                    <h2 className="font-medium text-5xl">Your Trusted</h2>
                    <h2 className="main-font text-6xl">E-Commerce<br></br>Platform</h2>
                </div>
                <img src={HomeImage} alt="home" className="w-full h-[600px] object-cover" />
            </div>
            <div className="mt-[100px] w-4/5 mx-auto bg-[#9290C3] h-[500px] flex">
                <div className="px-8 py-8 w-3/5 text-white">
                    <h2 className="main-font text-3xl">About Us</h2>
                    <p className="mt-4">Welcome to our bustling e-commerce platform, where convenience meets endless possibilities. Our website offers a seamless shopping experience, providing customers with a diverse array of products ranging from fashion and electronics to home essentials and beyond. With intuitive navigation and user-friendly features, browsing through our virtual aisles is a delight. Explore curated collections, discover new trends, and make informed purchase decisions with detailed product descriptions and customer reviews. Enjoy the convenience of secure payment options and swift delivery services, ensuring your purchases reach you promptly. Whether you're seeking everyday essentials or indulging in something special, our e-commerce website is your one-stop destination for all your shopping needs.</p>
                </div>
                <img src={Bags} alt="home" className="w-2/5 h-full object-cover" />
            </div>
            <div className="mt-[80px] mx-auto w-4/5">
                <div className="flex items-center justify-between">
                    <h2 className="main-font text-3xl">Popular products</h2>
                    <Link className="underline" to="products">View All</Link>
                </div>
                <div className="mt-[50px] grid grid-cols-3">
                    {products.map((product, index) => {
                        if (index < 3) return <ProductCard product={product} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;