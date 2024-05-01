import logo from "./images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BagFill, PersonFill, Search, Basket2Fill } from "react-bootstrap-icons";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "./rtk/slices/authSlice";
import { setCartProducts } from "./rtk/slices/cartSlice";
function NavBar() {
    const client = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const cart =  useSelector(state => state.cart).cartProducts
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchlist, setSearchList] = useState(false);
    let menuRef = useRef();
    function getProducts() {
        fetch('http://localhost:4500/product/getAllProductsHome')
            .then(res => res.json())
            .then(response => setProducts(response.data))
            .catch()
    }
    function getCartProducts() {
        fetch('http://localhost:4500/cart/getAllProducts', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${client.token}`
            },
        }).then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                    if(response.message === "Session Expired"){
                        dispatch(logOut())
                    }
                } else if (response.status === "fail") {
                } else if (response.status === "success") {
                    dispatch(setCartProducts(response.data))
                }
            }
        ).catch ()
    }
    const getSearchData = (event) => {
        const search = event.target.value;
        setSearchData(products?.filter((product) => {
            return search === '' ?
                null : product?.name?.toLowerCase().includes(search.toLowerCase());
        }))
    }
    useEffect(() => {
        getProducts();
        if(client) getCartProducts();
    }, [client])
    return (
        <div className="bg-[#070F2B] h-[70px] w-full flex items-center md:px-5 px-2 justify-between">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="md:w-64 w-44 h-[70px] object-cover overflow-hidden" />
                <div className="flex items-center text-white font-medium md:gap-10 gap-5">
                    {client.usertype === "client" ? <>
                        <Link to="/" className="hover:text-[#9290C3] duration-200">Home</Link>
                        <Link to="products" className="hover:text-[#9290C3] duration-200">Products</Link>
                        <Link className="hover:text-[#9290C3] duration-200" onClick={()=> dispatch(logOut())}>LogOut</Link>
                    </> : <>
                        <Link to="login" className="hover:text-[#9290C3] duration-200">Login</Link>
                        <Link to="sign-up" className="hover:text-[#9290C3] duration-200">Sign-Up</Link>
                    </>}
                </div>
            </div>
            {client.usertype === "client" && <div className="flex items-center gap-4 md:px-8">
                <div className="relative w-full" ref={menuRef}>
                    <div className="w-full h-10 flex items-center">
                        <input
                            type="search"
                            className="h-full w-full p-2  focus:border-white focus:outline-none"
                            placeholder="Search for product"
                            aria-label="Search"
                            onChange={e => getSearchData(e)}
                            onClick={() => { setSearchList(true) }}
                        ></input>
                        <button className="duration-200  bg-[#535C91] h-full p-4 flex items-center text-white"
                        ><Search className="text-lg" /></button>
                    </div>
                    {(searchData?.length > 0 && searchlist) ? <div className="flex flex-col max-h-60 w-full shadow-md bg-[#fafafa] overflow-x-hidden absolute z-[90]" >
                        {searchData.map((product) => {
                            return <p onClick={() => { navigate(`/products/${product.productID}`); window.location.reload(); }} className="w-full p-3 capitalize hover:bg-gray-200 font-semibold cursor-pointer">{product.name}</p>
                        })}
                    </div> : null}
                </div>
                <div className="relative">
                    <Link to="cart" className="text-white text-[25px] hover:text-[#9290C3] duration-200" ><BagFill /></Link>
                    <div className="absolute text-white -top-1 -right-1.5">
                        <h2 className="bg-[#ff0000] rounded-xl px-[4px] text-[10px] font-medium">{cart?.length}</h2>
                    </div>
                </div>
                <Link to="purchased-items" className="text-white text-[27px] hover:text-[#9290C3] duration-200"><Basket2Fill /></Link>
                <Link to="profile" className="text-[20px] text-[#1B1A55] bg-[#535C91] p-1 rounded-full hover:bg-[#546C92] duration-200"><PersonFill /></Link>
            </div>}
        </div>
    )
}

export default NavBar;