import React from "react";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const Pagination = ({
  itemsPerPage,
  setItemsPerPage,
  pageCount,
  currentPage,
  handlePageClick,
  handleItemsPerPageChange
}) => {
  return (
    <Row className="pagination-row">
      <Col xl={6} className="my-4">
        <div className="d-flex align-items-center">
          <div className="mr-2">
            <label>Items per page:</label>
          </div>
          <div className="mx-2">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="form-control"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </Col>
      <Col xl={6}>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Col>
    </Row>
  );
};

export default Pagination;
