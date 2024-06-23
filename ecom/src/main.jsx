import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import ProductsMain from './components/ProductsMain.jsx'
import DeatilsPage from './components/DeatilsPage.jsx'
import AddProduct from './components/AddProduct.jsx'
import EditProduct from './components/EditProduct.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App />} />
      <Route path='product/:name' element={<DeatilsPage />} />
      <Route path='addProduct' element={<AddProduct />} />
      <Route path='/editPage/:name' element={<EditProduct />} />
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
