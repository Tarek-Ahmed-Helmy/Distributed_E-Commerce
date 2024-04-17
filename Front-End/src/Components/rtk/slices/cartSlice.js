import { createSlice } from "@reduxjs/toolkit";
const failure = (product) => {
    console.log("failure")
}
export const cartSlice = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addtoCart: (state, action) => {
            const productFound = state.find((product) => product.id === action.payload.id);
            if (productFound)
                failure(action.payload.title)
            else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        deletefromCart: (state, action) => {
            const product = state.find((product) => product.id === action.payload.id)
            return state.filter((x) => x.id !== product.id)
        },
        increaseQt: (state, action) => {
            const product = state.find((product) => product.id === action.payload.id)
            product.quantity = product.quantity + 1;
        },
        decreaseQt: (state, action) => {
            const product = state.find((product) => product.id === action.payload.id)
            if (product.quantity > 1) { product.quantity = product.quantity - 1; }
        },
        clearCart: (state, action) => {
            return state = []
        }
    }
})

export const { addtoCart, deletefromCart, clearCart, increaseQt, decreaseQt } = cartSlice.actions;
export default cartSlice.reducer;