import React from 'react'
import { Link } from 'react-router-dom'

function ProductTemp({ id, name, price, usp, image }) {

    return (
        <div className='productTempMain'>
            <div className='productImgDiv'>
                <img className='productImg' src={image} alt='no img'></img>
            </div>
            <div className='productDisDiv'>
                <h1>{name}</h1>
                <h1>Rs.{price}</h1>
                <h1>{usp}</h1>
                <Link to={`/product/${id}`}>
                    <button className='detailBtn'>
                        View Details
                    </button>
                </Link>

            </div>


        </div>
    )
}

export default ProductTemp