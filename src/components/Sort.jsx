import React from 'react'

const Sort = ({setSortOption}) => {
  return (
    <div className='sort-container'>
        <label className='sort-label'>Sort By: </label>

        <select className='sort-select' onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="titleAZ">Title: A-Z</option>
            <option value="titleZA">Title: Z-A</option>
        </select>
    </div>
  )
}

export default Sort
