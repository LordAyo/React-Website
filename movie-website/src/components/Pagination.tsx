import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (data: { selected: number }) => {
    onPageChange(data.selected + 1); // Adjust for 0-based index
  };

  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination-container"}
        pageClassName={"pagination-page"}
        activeClassName={"pagination-active"}
        previousClassName={"pagination-previous"}
        nextClassName={"pagination-next"}
        disabledClassName={"pagination-disabled"}
      />
    </div>
  );
};

export default Pagination;
