import React, { useEffect, useState } from 'react'
import ProductTemp from './ProductTemp'
import neckBandsList from '../data/sample'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setProduct } from '../features/productDetailSlice'

function ProductsMain() {

    const dispatch = useDispatch()
    const productsData = useSelector(state => state.products.products)

    const searchTerm = useSelector(state => state.products.searchTerm);

    const filteredProducts = searchTerm
        ? productsData.filter(product =>
            (product.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        : productsData;

    const GetProductList = async () => {
        try {
            const response = await axios.get('http://localhost:8000/product');

            dispatch(setProduct(response.data));

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        GetProductList()
    }, [])
    return (
        <div className='productsMainDiv'>
            {
                filteredProducts.map((item) => (
                    <ProductTemp
                        key={item._id}
                        id={item._id}
                        name={item.productName}
                        price={item.productPrice}
                        usp={item.productUSP}
                        image={item.productImageUrl}
                    />
                ))
            }
        </div>
    )
}

export default ProductsMain