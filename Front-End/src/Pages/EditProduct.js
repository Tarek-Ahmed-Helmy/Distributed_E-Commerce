import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
function EditProduct() {
    const params = useParams();
    const id = useParams().productid;
    const [originData, setOriginData] = useState([])
    const [product, setProduct] = useState([])
    function getProduct() {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(response => { setProduct(response); setOriginData(response) })
            .catch()
    }
    useEffect(() => {
        getProduct();
    }, [])
    function HandleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    function SaveChanges() {
        var obj1Str = JSON.stringify(originData);
        var obj2Str = JSON.stringify(product);
        if (obj1Str !== obj2Str) {
            Swal.fire({
                title: "Updated!",
                text: "Product updated successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    }
    return (
        <div className="w-full min-h-screen px-10">
            <h2 className="mt-[30px] main-font text-2xl">Edit Product</h2>
            <div className="mt-4 w-3/5">
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Title</label>
                    <input name="title" type="text" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.title} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Price</label>
                    <input name="price" type="number" min={0} className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.price} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Category</label>
                    <select name="category" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.category} onChange={HandleChange}>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Description</label>
                    <textarea name="description" className={`bg-white border border-gray-300 h-[200px]
                        text-gray-900 w-full p-2.5`} value={product.description} onChange={HandleChange}></textarea>
                </div>
                <button className="px-6 py-3 float-right font-medium text-white bg-blue-800 hover:bg-blue-900 duration-200" onClick={() => { SaveChanges() }}>Save Changes</button>
            </div>
        </div>
    )
}

export default EditProduct;