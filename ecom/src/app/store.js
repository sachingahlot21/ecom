import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/productDetailSlice'


export const store = configureStore({
  reducer: {
    products: productReducer
  }
  })

  // export const store = configureStore({
  //   reducer : productReducer
  // })