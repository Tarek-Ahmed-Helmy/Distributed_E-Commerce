import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
export function ShowErrorMessage(props) {
    const condition = props.condition;
    const value = props.value;
    return (
        <>
            {condition ? <span className="text-[12px] text-red-500 flex gap-1 items-center mt-1"><ExclamationCircleFill />{value}</span> : null}
        </>
    )
}
function AddProduct() {
    const token = useSelector(store => store.auth).token;
    const profile = jwtDecode(token);
    const [data, setData] = useState({
        title: "",
        price: "",
        description: "",
        category: "electronics",
        quantity: "",
        img: ""
    })
    const [dataerrors, setDataErrors] = useState({
        title: false,
        price: false,
        description: false,
        img: false,
        quantity: false
    });
    const [checkerror, setCheckError] = useState("");
    function HandleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function failure(text) {
        Swal.fire({
            icon: "error",
            title: text,
        });
    }
    const addData = () => {
        fetch('http://localhost:4500/product/addProduct', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "name": data.title,
                "quantity_available": data.quantity,
                "description": data.description,
                "price": data.price,
                "category_name": data.category,
                "image": data.img,
                "sellerSellerID": profile.sellerID
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "error") {
                    failure(data.message)
                } else if (data.status === "fail") {
                    failure("oop, there is a problem currently !")
                } else if (data.status === "success") {
                    Swal.fire("Product Created Successfully", "", "success").then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            })
            .catch(error => {
            });
    }
    const HandleError = (e) => {
        e.preventDefault();
        if (data.title === "") {
            setDataErrors({
                title: true, price: false, description: false, img: false, quantity: false
            })
            setCheckError("Title cannot be empty")
            window.scrollTo(0, 100);
        }
        else if (data.price === "") {
            setDataErrors({
                title: false, price: true, description: false, img: false, quantity: false
            })
            setCheckError("Please enter a proper price")
            window.scrollTo(0, 100);
        }
        else if (data.quantity === "") {
            setDataErrors({
                title: false, price: false, description: false, img: false, quantity: true
            })
            setCheckError("Please enter the quantity availabe")
            window.scrollTo(0, 100);
        }
        else if (data.img === "") {
            setDataErrors({
                title: false, price: false, description: false, img: true, quantity: false
            })
            setCheckError("Please enter the image reference")
            window.scrollTo(0, 100);
        }
        else if (data.description === "") {
            setDataErrors({
                title: false, price: false, description: true, img: false, quantity: false
            })
            setCheckError("Description cannot be empty")
            window.scrollTo(0, 100);
        } else {
            setDataErrors({
                title: false, price: false, description: false, img: false, quantity: false
            })
            setCheckError("")
            addData();
        }
    }
    return (
        <div className="w-full min-h-screen px-10 mb-[50px]">
            <h2 className="mt-[30px] main-font text-2xl">Create New Product</h2>
            <div className="mt-4 w-3/5">
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Name</label>
                    <input name="title" type="text" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></input>
                    <ShowErrorMessage condition={dataerrors.title} value={checkerror} />
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Price</label>
                    <input name="price" type="number" min={0} className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></input>
                    <ShowErrorMessage condition={dataerrors.price} value={checkerror} />
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Quantity</label>
                    <input name="quantity" type="number" min={0} className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></input>
                    <ShowErrorMessage condition={dataerrors.quantity} value={checkerror} />
                </div>
                <div className="my-4" >
                    <label className="block mb-2 cursor-icon text-lg">Image Link</label>
                    <input name="img" type="text" className={`bg-white border border-gray-300
                        text-gray-900 w-full p-2.5`} onChange={HandleChange}></input>
                    <ShowErrorMessage condition={dataerrors.img} value={checkerror} />
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
                    <ShowErrorMessage condition={dataerrors.description} value={checkerror} />
                </div>
                <button className="px-6 py-3 float-right font-medium text-white bg-green-700 hover:bg-green-800 duration-200" onClick={HandleError}>Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct;