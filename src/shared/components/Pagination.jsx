import React from 'react';

function Pagination({totalBookings, bookingsPerPage, currentPage, changePage}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil (totalBookings / bookingsPerPage); i++) {
    pageNumbers.push (i);
  }
  return (
    <nav className="float-right">
      <ul className="pagination border ">
        {pageNumbers.map (number => (
          <li
            className={`page-item px-3 py-1 border  border-right-1 ${number === currentPage ? 'bg-primary text-white' : ''}`}
            key={number}
            onClick={() => changePage (number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
