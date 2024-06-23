import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice(
    {
        name: 'products',
        initialState: {
            products: [],
            searchTerm: ''
        },
        reducers: {
            setProduct: (state, action) => {
                state.products = action.payload;
            },
            setSearchTerm: (state, action) => {
                state.searchTerm = action.payload;
            }
        }
    }
)

export const { setProduct , setSearchTerm} = productSlice.actions

export default productSlice.reducer

