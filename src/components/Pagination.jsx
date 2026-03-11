import React from 'react'

const Pagination = ({total, perPage, setCurrentPage}) => {
    const pages = Math.ceil(total / perPage)
  return (
    <div className='align-center justify-center'>
        {Array.from({length:pages}, (_,i) => (
            <button key={i} onClick={() => setCurrentPage(i+1)}>
                {i+1}
            </button>
        ))}
    </div>
  );
};

export default Pagination;
