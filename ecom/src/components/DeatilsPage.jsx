import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import neckBandsList from '../data/sample';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setProduct  } from '../features/productDetailSlice'

function DeatilsPage() {

    const productsData = useSelector(state => state.products.products)
  
    const { name } = useParams();
    const navigate = useNavigate();

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

    const product = productsData.find(item => item._id == name);
    const dispatch = useDispatch()

    if (!product) {
        return <div>Product not found</div>;
    }


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/product/${product._id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }

    };

    return (
        <div className="detailsContainer">
            <div className="detailsContent">
                <h1>{product.productName}</h1>
                <h4>Rs. {product.productPrice}</h4>
                <h4>{product.productUSP}</h4>
                <br></br>
                <p>{product.productDescription}</p>

                <div className="buttonsContainer">
                    <Link to={`/editPage/${product._id}`}>
                        <button className="editButton" >Edit</button>
                    </Link>
                    <button className="deleteButton" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeatilsPage