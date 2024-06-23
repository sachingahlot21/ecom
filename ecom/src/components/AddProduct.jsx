import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setProduct} from '../features/productDetailSlice';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [usp, setUsp] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!name || !price || !usp || !description || !imageUrl) {
      alert('All fields are required.');
      return;
    }
  
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert('Price must be a number.');
      return;
    }

    const productData = {
      productName: name,
      productPrice: parsedPrice,
      productUSP: usp,
      productDescription: description, 
      productImageUrl: imageUrl
    }

    try {
      const response = await axios.post('http://localhost:8000/product', productData);
      if (response.status === 201) {
        setName('');
        setPrice('');
        setUsp('');
        setImageUrl('');
        setDescription('');

        navigate('/')

      } else {
        console.log('Failed to add product. Please try again.')
      }
    } catch (error) {
      console.log('Failed to add product. Please try again.');
    }

  };

  return (
    <div className='addProductMainDiv'>
      <div>
        <h1>Create a New Product!</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type='text'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            USP (Unique Selling Proposition):
            <textarea
              value={usp}
              onChange={(e) => setUsp(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              type='text'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <br />
          <button className='addProductBtn' type='submit'>Submit</button>
        </form>

      </div>

    </div>
  )
}

export default AddProduct