import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {PlusLg, PencilFill, Trash3Fill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
function ProductsControl() {
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
    function Delete(product) {
        Swal.fire({
            title: `Are you sure you want to delete ${product.title}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <div className="w-full bg-gray-100">
            <div className="mt-[30px] px-4">
                <h2 className="main-font text-2xl">Products List</h2>
                <div className="px-4 bg-white shadow-lg mt-3 py-4 mb-8">
                    <Link to="add-product"><button className="bg-green-600 p-2 font-medium text-white flex items-center gap-2 hover:bg-green-700 duration-200"><PlusLg /> New Product</button></Link>
                    <hr className="border-gray-400 mt-3"></hr>
                    <table className="w-full table-auto mt-2 text-left border-spacing-y-5">
                        <thead>
                            <tr className="border-b border-slate-300">
                                <th className="py-4 px-2">ID</th>
                                <th className="py-4 px-2">Title</th>
                                <th className="py-4 px-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return <tr className="border-b border-slate-300">
                                    <td className="py-4 px-2">{product.id}</td>
                                    <td className="py-4 px-2">{product.title}</td>
                                    <td className="py-4 px-2 flex items-center gap-6">
                                        <Link to={`${product.id}`}><button className="hover:text-gray-600 duration-100"><PencilFill /></button></Link>
                                        <button className="hover:text-gray-600 duration-100" onClick={() => {
                                            Delete(product);
                                        }}><Trash3Fill /></button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductsControl;