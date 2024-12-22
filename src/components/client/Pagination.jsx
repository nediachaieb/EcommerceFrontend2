import React from 'react'

const Pagination = ({ handlePrevPage, handleNextPage, handlePageChange, totalpages, currentpage }) => {
    return (
        <div className="pagination">
            <button onClick={() => handlePrevPage()} disabled={currentpage === 1}>Previous</button>
            {Array.from({ length: totalpages }, (_, index) => (
                <button

                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentpage === index + 1}
                    className={currentpage === index + 1 ? 'page-link active' : ''}
                >
                    {index + 1}
                </button>
            ))}

            <button onClick={() => handleNextPage()} disabled={currentpage === totalpages}>

                Next
            </button>
        </div>

    )
}


export default Pagination
