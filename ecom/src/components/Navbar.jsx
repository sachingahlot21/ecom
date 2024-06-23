import React from 'react'
import '../css/main.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/productDetailSlice';

function Navbar() {
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
      };

    return (
        <>
            <div className='navDiv'>
                <div className='navLogoDiv'>
                    <h1>MY AG</h1>
                </div>
                <div className='navSeacrhDiv'>
                    <input className='searchBar' type='search'
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    ></input>
                    <button className='addBtn'>SEARCH</button>
                </div>
                <div >
                <Link to={'/addProduct'}>
                    <button className='addBtn' >ADD PRODUCT</button>
                </Link>
                </div>
               
            </div>
        </>
    )
}

export default Navbar