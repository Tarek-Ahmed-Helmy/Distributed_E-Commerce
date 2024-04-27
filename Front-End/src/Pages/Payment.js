import { useSelector } from "react-redux"
import { useState } from "react"
export default function Payment() {
    const cart = useSelector(store => store.cart)
    const [data, setData] = useState({
        name: "",
        cardNum: "",
        expire:"",
        cvv:""
    })
    function HandleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function HandleCardNum(e) {
        const value = e.target.value;
        if (value.length === 4 || value.length === 9 || value.length === 14) {
            setData({ ...data, cardNum: (e.target.value + "-") })
        } else {
            setData({ ...data, cardNum: e.target.value })
        }
    }
    function HandleExpire(e) {
        const value = e.target.value;
        if (value.length === 2) {
            setData({ ...data, expire: (e.target.value + " / ") })
        } else {
            setData({ ...data, expire: e.target.value })
        }
    }
    return (
        <div className="w-[90%] mx-auto mt-[50px] mb-[50px]">
            <div className="w-full">
                <h2 className="main-font text-2xl">Checkout</h2>
                <hr className="border-1 border-gray-300 my-4"></hr>
                <div className="mt-[50px] w-3/5">
                    <div className="my-4 flex items-center gap-10" >
                        <label className="block mb-2 cursor-icon text-lg w-[250px]">Name on card</label>
                        <input name="name" type="text" placeholder="Enter the name on your card"
                            className={`w-[350px] bg-white border border-gray-300
                        text-gray-900 p-2.5`} onChange={HandleChange}></input>
                    </div>
                    <div className="mt-8 flex items-center gap-10" >
                        <label className="block mb-2 cursor-icon text-lg w-[250px]">Card Number</label>
                        <input name="expire" type="text" inputmode="numeric"
                            maxlength="19" placeholder="Enter your card number"
                            className={`w-[350px] bg-white border border-gray-300
                        text-gray-900 p-2.5`} value={data.cardNum} onChange={HandleCardNum}></input>
                    </div>
                    <div className="mt-8 flex items-center gap-10" >
                        <label className="block mb-2 cursor-icon text-lg w-[250px]">Expiration Date</label>
                        <input name="expire" type="text" inputmode="numeric"
                            maxlength="7" placeholder="MM / YY"
                            className={`w-[200px] bg-white border border-gray-300
                        text-gray-900 p-2.5`} value={data.expire} onChange={HandleExpire}></input>
                    </div>
                    <div className="mt-8 flex items-center gap-10" >
                        <label className="block mb-2 cursor-icon text-lg w-[250px]">CVV</label>
                        <input name="cvv" type="text" inputmode="numeric"
                            maxlength="3" placeholder="CVV"
                            className={`w-[100px] bg-white border border-gray-300
                        text-gray-900 p-2.5`} onChange={HandleChange}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}