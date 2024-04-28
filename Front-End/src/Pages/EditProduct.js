import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
function EditProduct() {
    const params = useParams();
    const token = useSelector(store => store.auth).token
    const productid = params.productid;
    const [originData, setOriginData] = useState([])
    const [product, setProduct] = useState([])
    function getProduct() {
        fetch(`http://localhost:4500/product/getProduct/${productid}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then(res => res.json())
            .then(response => { setProduct(response.data); setOriginData(response.data) })
            .catch()
    }
    function failure(text) {
        Swal.fire({
            icon: "error",
            title: text,
        });
    }
    function EditProduct() {
        fetch(`http://localhost:4500/product/editProduct`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "productID": productid,
                "name": product.name,
                "quantity_available": product.quantity_available,
                "description": product.description,
                "price": product.price,
                "category_name": product.category_name,
                "image": product.image,
            }),
        }).then(res => res.json())
        .then(data => {
            if (data.status === "error") {
                failure(data.message)
            } else if (data.status === "fail") {
                failure("oop, there is a problem currently !")
            } else if (data.status === "success") {
                Swal.fire({
                    title: "Updated!",
                    text: "Product updated successfully",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        getProduct();
                    }
                });
            }
        })
        .catch(error => {
        });
    }
    useEffect(() => {
        getProduct();
    }, [])
    function HandleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    function CheckChanges(){
        var obj1Str = JSON.stringify(originData);
        var obj2Str = JSON.stringify(product);
        return obj1Str === obj2Str
    }
    return (
        <div className="w-full min-h-screen px-10 mb-[50px]">
            <h2 className="mt-[30px] main-font text-2xl">Edit Product</h2>
            <div className="mt-4 w-3/5">
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Name</label>
                    <input name="name" type="text" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.name} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Price</label>
                    <input name="price" type="number" min={0} className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.price} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Quantity</label>
                    <input name="quantity_available" type="number" min={0} className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.quantity_available} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Image Link</label>
                    <input name="image" type="text" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.image} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Category</label>
                    <select name="category_name" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} value={product.category_name} onChange={HandleChange}>
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
                <button className={`px-6 py-3 float-right font-medium text-white ${CheckChanges() ? "bg-gray-500" : "bg-blue-800 hover:bg-blue-900"} duration-200`}
                disabled={CheckChanges()} onClick={() => { EditProduct() }}>Save Changes</button>
            </div>
        </div>
    )
}

export default EditProduct;