import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
function ProductCard({ product }) {
    return (
        <div className="w-full">
            <Link to={`${product.id}`}><img src={product.image} alt="product" className="w-full h-[220px] object-contain mx-auto"></img></Link>
            <div className="mt-2 px-4 text-center">
                <Link to={`/products/${product.id}`} className="hover:text-[#535C91] duration-200"><h2 className="font-medium">{product.title}</h2></Link>
                <h2 className="text-md">{product.price} L.E</h2>
            </div>
        </div>
    )
}
function CategorieProducts() {
    const [products, setProducts] = useState([]);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('type')
    const [active, setActive] = useState(category)
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    function getCategoryProducts() {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then(response => setProducts(response))
            .catch()
    }
    useEffect(() => {
        getCategoryProducts();
    }, [active])
    return (
        <div className="w-[90%] mx-auto mt-[50px] mb-[50px]">
            <div className="md:w-3/4 w-full">
                <h2 className="main-font text-2xl">Explore Our Products</h2>
                <p>
                    Welcome to our expansive emporium of innovation and style! Delve into a digital marketplace brimming with possibilities on our Explore Products page. Here, every click unveils a treasure trove of diverse offerings, curated to cater to your every whim and necessity.From cutting-edge gadgets to timeless fashion staples, our meticulously organized interface ensures seamless navigation through an array of categories, each promising a delightful journey of discovery.
                </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
                <Link to={`/products`}><button className="px-4 py-2 text-sm border border-gray-300 rounded-full">All</button></Link>
                {categories.map((category,index) => {
                    return <Link onClick={()=>{setActive(category)}} to={`/products/category?type=${category}`} key={index+1}>
                        <button className={`px-4 py-2 text-sm border ${active === category ? "border-black" : "border-gray-300"} rounded-full`}>
                            {category}</button></Link>
                })}
            </div>
            <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8">
                {products.map((product) => {
                    return <ProductCard product={product} />
                })}
            </div>
        </div>
    )
}

export default CategorieProducts;