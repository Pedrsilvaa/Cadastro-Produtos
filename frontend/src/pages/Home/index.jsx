
import React, { useState, useEffect } from 'react';
import './style.css';
import Trash from '../../assets/trash.svg';
import Pencil from '../../assets/pencil.svg';
import Search from '../../assets/search.svg';
import Swal from 'sweetalert2';
import getProducts from '../../services/getProducts.js';
import getProductById from '../../services/getProductById.js';
import createProduct from '../../services/createProduct.js';
import editProduct from '../../services/editProduct.js';
import removeProduct from '../../services/removeProduct.js';

function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.00);
  const [category, setCategory] = useState('Foods');
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    }
    catch(error) {
      Swal.fire({
        title: 'An error has occurred',
        text: error.response?.data || 'An unexpected error has occurred, please try again.',
        icon: 'error',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#0056b3',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice(0.00);
    setCategory('Foods');
    setAmount(0);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price,
      category,
      amount
    };
    let response = '';

    try {
      if(editingId) {
        response = await editProduct(editingId, product);
      }
      else {
        response = await createProduct(product);
      }

      Swal.fire({
        title: 'Successfully completed',
        text: response,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true
      });

      await fetchProducts();
      resetForm();
    }
    catch(error) {
      Swal.fire({
        title: 'An error has occurred',
        text: error.response?.data || 'An unexpected error has occurred, please try again.',
        icon: 'error',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#0056b3',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if(search.trim() === '') {
      fetchProducts();
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );

    setProducts(filtered);
  };

  const handleRemove = async (e) => {
    const id = e.currentTarget.value;

    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'You can\'t undo this action.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#0056b3',
        cancelButtonColor: '#CCCCCC'
      });
      
      if(confirmation.isConfirmed) {
        const response = await removeProduct(id);

        Swal.fire({
          title: 'Successfully completed',
          text: response,
          icon: 'success',
          timer: 3000,
          timerProgressBar: true
        });

        await fetchProducts();
      }
    }
    catch(error) {
      Swal.fire({
        title: 'An error has occurred',
        text: error.response?.data || 'An unexpected error has occurred, please try again.',
        icon: 'error',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#0056b3',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  const handleEdit = async (e) => {
    const id = e.currentTarget.value;

    try {
      const product = await getProductById(id);

      if(product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setAmount(product.amount);
        setEditingId(product._id);
      }
    }
    catch(error) {
      Swal.fire({
        title: 'An error has occurred',
        text: error.response?.data || 'An unexpected error has occurred, please try again.',
        icon: 'error',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#0056b3',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className='container'>
      <h1>Stock Manager</h1>
      <div>
        <form className='product-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Product:</label>
          <input
            type='text'
            id='ti-name'
            name='name'
            placeholder='insert name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            id='ti-description'
            name='description'
            placeholder='insert description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label htmlFor='category'>Category:</label>
          <select
            id='ti-category'
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button type='submit'>Send</button>
        </form>

        <form className='search-form' onSubmit={handleSearch}>
          <input
            type='text'
            id='ti-search'
            name='search'
            placeholder='search any product by name or category'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit'>
            <img src={Search} alt='Search button'/>
          </button>
        </form>

        <div className='filter-box'>
          {
            products && products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className='product-box'>
                  <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Amount: {product.amount}</p>
                    <p>Added at: {product.createdAt}</p>
                  </div>

                  <div className='button-box'>
                    <button type='button' onClick={handleEdit} value={product._id}>
                      <img src={Pencil} alt='Edit option'/>
                    </button>
                    <button type='button' onClick={handleRemove} value={product._id}>
                      <img src={Trash} alt='Remove option'/>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
