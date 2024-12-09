import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (data: { selected: number }) => {
    onPageChange(data.selected + 1); // Adjust 0-based index to 1-based page numbering
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination-item"}
        pageLinkClassName={"pagination-link"}
        previousClassName={"pagination-previous"}
        nextClassName={"pagination-next"}
        activeClassName={"pagination-active"}
        disabledClassName={"pagination-disabled"}
      />
    </div>
  );
};

export default Pagination;
