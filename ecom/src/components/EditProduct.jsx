import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import neckBandsList from '../data/sample'; // Import your sample data or actual data source
import { useSelector, useDispatch } from 'react-redux'
import { setProduct  } from '../features/productDetailSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function EditProduct() {

    const { name } = useParams();
    const dispatch = useDispatch();
    const productsData = useSelector(state => state.products.products);
    const navigate = useNavigate();

    const [product, setProductData] = useState({
        productName:'',
        productPrice:'',
        productImageUrl:'',
        productUSP:'',
        productDescription:''
    });

    const GetProductList = async () => {
        try {
            const response = await axios.get('http://localhost:8000/product');
            dispatch(setProduct(response.data)); 
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        GetProductList()
    },[])

    useEffect(() => {
        const productToEdit = productsData.find(item => item._id === name);
        if (productToEdit) {
            setProductData(productToEdit); 
            console.log(productToEdit)
        } else {
            console.log('Product not found')
        }
    }, [name, productsData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const { productName, productPrice, productImageUrl, productUSP, productDescription } = product;
        if (!productName || !productPrice || !productImageUrl || !productUSP || !productDescription) {
            alert('All fields are required.');
            return;
        }

        const parsedPrice = parseFloat(productPrice);
        if (isNaN(parsedPrice)) {
            alert('Price must be a number.');
            return;
        }

        const updatedProduct = {
            ...product,
            productPrice: parsedPrice
        };

        try {
            await axios.put(`http://localhost:8000/product/${product._id}`, updatedProduct);
            console.log('Updated product:', updatedProduct);
            navigate('/'); 
        } catch (err) {
            console.log('Error updating product:', err);
        }
        
    };

    return (
        <div className="addProductMainDiv">
            <div className="formContainer">
                <h1>Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="productName"
                            value={product.productName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input
                            type="text"
                            name="productPrice"
                            value={product.productPrice}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        USP (Unique Selling Proposition):
                        <textarea
                            name="productUSP"
                            value={product.productUSP}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea
                            name="productDescription"
                            value={product.productDescription}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <button className='addProductBtn' type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
