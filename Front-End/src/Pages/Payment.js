import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import check from "../Components/images/check.png"
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
    CardElement
} from '@stripe/react-stripe-js';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    useEffect(() => {
        if (elements) {
            let cardElement = elements.getElement('card');
            cardElement?.update({ style: { base: { fontSize: '20px' } } });
        }
    }, [elements])
    const [data, setData] = useState({
        name: "",
        cardNum: "",
        expire: "",
        cvv: ""
    })
    const [payComplete, setPayComplete] = useState(false);
    const [timer, setTimer] = useState(10);
    function redirect() {
        setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        setInterval(() => {
            navigate("/products")
        }, 10000)
    }
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
    const makePayment = async (event) => {
        event.preventDefault();
        stripe.createToken(elements.getElement('card'), {
            name:data.name
        }).then((result) => {
            if (result.error) {
                // Handle tokenization errors (e.g., invalid card details)
                console.error(result.error);
            } else {
                // Send the token to your server for further processing
                let token = result.token;
                console.log(token)
                // Your code to send the token to the server (e.g., using AJAX)
            };
        }).catch(error => console.log(error))
    }
    if (!payComplete) return (
        <div className="w-[90%] mx-auto mt-[50px] mb-[50px]">
            <div className="w-full">
                <h2 className="main-font text-2xl">Checkout</h2>
                <hr className="border-1 border-gray-300 my-4"></hr>
                <div className="mt-[30px] w-3/5">
                    <div className="my-4 flex items-center gap-10" >
                        <label className="block mb-2 cursor-icon text-lg w-[250px]">Name on card</label>
                        <input name="name" type="text" placeholder="Enter the name on your card"
                            className={`w-full bg-white border border-gray-300
                        text-gray-900 p-2.5`} onChange={HandleChange}></input>
                    </div>
                    <div className="mt-8">
                        <label className="block mb-6 cursor-icon text-lg w-[250px]">Card Details</label>
                        <CardElement />
                    </div>
                    {/*<div className="mt-8 flex items-center gap-10" >
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
                    </div> */}
                    <button className="w-[250px] float-right mt-[50px] px-4 py-3 text-white font-medium text-xl bg-[#1B1A55]" onClick={(e) => { makePayment(e) }}>Pay</button>
                </div>
            </div>
        </div>
    )
    else return (
        <div className="w-[90%] mx-auto mt-[100px] mb-[50px] flex justify-center">
            <div className="bg-[#efefef] rounded-md w-[600px] pb-6 shadow-xl px-4">
                <img src={check} alt="payment complete" className="w-full mt-6 h-[100px] object-contain" ></img>
                <div className="mt-3 text-center px-10">
                    <h2 className="font-bold text-3xl">Payment Complete</h2>
                    <p className="mt-5">Your Payment is Completed Successfully. Thanks for using our e-commerce shop.</p>
                    <p className="mt-2">You will be redirected in <span className="font-bold">{timer} seconds</span>.</p>
                </div>
            </div>
        </div>
    )
}

export default function Payment() {
    const cart = useSelector(store => store.cart);
    const stripePromise = loadStripe('pk_test_51P9B5SF2qDRPqlzYG8u2BPlbRks3iMIHRIH0XP2kJNBp9TWbpjBeXzFbvqMiWvnsYhvRZYz0Lt1TmFaEAFGC3rqz004ZqPn6Mm');
    const options = {
        mode: 'payment',
        amount: 1080,
        currency: 'egp',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
};