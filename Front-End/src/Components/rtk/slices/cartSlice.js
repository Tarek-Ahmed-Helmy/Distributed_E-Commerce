import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    initialState: {cartProducts:[] , totalPrice:0},
    name: "cartSlice",
    reducers: {
        setCartProducts: (state, action) => {
            state.cartProducts = action.payload
        },
        setCartPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        AddProduct: (state, action) => {
            state.cartProducts.push(action.payload)
        },
    }
})

export const { setCartProducts, setCartPrice,AddProduct } = cartSlice.actions;
export default cartSlice.reducer;