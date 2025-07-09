import React from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
const Paginationcomponent = ({ pagecount, onpress }) => {
  const { t } = useTranslation();
  const handlePageClick = (data) => {
    onpress(data.selected + 1);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <ReactPaginate
        breakLabel="..."
        nextLabel={`${t("pagination.next_label")} >`}
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        pageCount={pagecount}
        previousLabel={`< ${t("pagination.previous_label")}`}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        forcePage={0}
      />
    </div>
  );
};

export default Paginationcomponent;
