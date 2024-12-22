import React, { useEffect, useState } from 'react'
import { fetcharticles, fetcharticlesPagination } from '../../services/articleservice'
import Card from './card'
import "@fortawesome/fontawesome-free/css/all.css";
import Pagination from './Pagination';
const Listarticlecard = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentpage, setCurrentpage] = useState(1)
  const [limit, setLimit] = useState(18)
  const [totalpages, setTotalpages] = useState(20)


  //////////////
  const getarticles = async (currentpage, limit) => {
    try {
      const res = await fetcharticlesPagination(currentpage, limit)
      setArticles(res.data.articles)
      setTotalpages(Math.ceil(res.data.tot / limit))
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(true)
    }
  }

  //////////

  useEffect(() => { getarticles(currentpage, limit) },
    [currentpage, limit]) /// dependences

  //////
  const handlePrevPage = () => {
    if (currentpage > 1) {
      setCurrentpage(currentpage - 1);
    }
  };

  //////
  const handleNextPage = () => {
    if (currentpage < totalpages) {
      setCurrentpage(currentpage + 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentpage(page);
  };
  ///////////

  return (
    <>
      <div className='card-container'>

        {articles.map((art, index) =>
          <Card key={index} article={art} />

        )}
      </div>
      <Pagination handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
        totalpages={totalpages}
        currentpage={currentpage}
      />


    </>
  )
}

export default Listarticlecard
