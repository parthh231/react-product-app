import React from 'react'

const Filter = ({ setCategory }) => {
  return (
    <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
    </select>
  );
};

export default Filter;
