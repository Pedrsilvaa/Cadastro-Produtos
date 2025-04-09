
import React, { useState } from 'react';
import './style.css';
import Trash from '../../assets/trash.svg';
import Pencil from '../../assets/pencil.svg';
import Search from '../../assets/search.svg';

function Home() {
  const products = [
    {
      id: 'transardeladinho',
      name: 'abu',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris',
      price: 69.69,
      category: 'abu',
      amount: 69420,
      createdAt: '2019-07-04'
    },
    {
      id: 'ehpoggers',
      name: 'abuceta',
      description: 'abu',
      price: 69.69,
      category: 'abu',
      amount: 69420,
      createdAt: '2019-07-04'
    }
  ];
  
  return (
    <div className='container'>
      <h1>Stock Manager</h1>
      <div>
        <form className='product-form'>
          <label htmlFor='name'>Product:</label>
          <input
            type='text'
            id='ti-name'
            name='name'
            placeholder='insert name'
            required
          />

          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            id='ti-description'
            name='description'
            placeholder='insert description'
            required
          />

          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='ti-price'
            name='price'
            min='0.01'
            step='any'
            placeholder='insert price'
            required
          />

          <label htmlFor='category'>Category:</label>
          <select
            id='ti-category'
            name='category'
            required
          >
            <option value='Foods'>Foods</option>
            <option value='Beverages'>Beverages</option>
            <option value='Personal Hygiene'>Personal Hygiene</option>
            <option value='Cleaning Products'>Cleaning Products</option>
            <option value='Household Essentials'>Household Essentials</option>
            <option value='Pet Supplies'>Pet Supplies</option>
          </select>

          <label htmlFor='amount'>Amount:</label>
          <input
            type='number'
            id='ti-amount'
            name='amount'
            min='0'
            placeholder='insert amount'
            required
          />

          <input type='button' value='Send'/>
        </form>

        <form className='search-form'>
          <input
            type='text'
            id='ti-search'
            name='search'
            placeholder='search any product by name or category'
          />
          <button type='button'>
            <img src={Search} alt='Search button'/>
          </button>
        </form>

        <div className='filter-box'>
          {
            products.map((product) => (
              <div key={product.id} className='product-box'>
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Amount: {product.amount}</p>
                  <p>Added at: {product.createdAt}</p>
                </div>

                <div className='button-box'>
                  <button type='button'>
                    <img src={Pencil} alt='Edit option'/>
                  </button>
                  <button type='button'>
                    <img src={Trash} alt='Remove option'/>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
