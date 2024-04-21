import { useState } from "react";
function AddProduct() {
    const [data, setData] = useState({
        title: "",
        price: "",
        description: "",
        category: ""
    })
    function HandleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className="w-full min-h-screen px-10">
            <h2 className="mt-[30px] main-font text-2xl">Create New Product</h2>
            <div className="mt-4 w-3/5">
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Title</label>
                    <input name="title" type="text" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Price</label>
                    <input name="price" type="number" min={0} className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></input>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Category</label>
                    <select name="category" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Description</label>
                    <textarea name="description" className={`bg-white border border-gray-300 h-[200px]
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></textarea>
                </div>
                <button className="px-6 py-3 float-right font-medium text-white bg-green-700 hover:bg-green-800 duration-200" onClick={() => { console.log(data) }}>Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct;