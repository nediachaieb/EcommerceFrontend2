import { useEffect, useState } from 'react';
import { deletearticle, fetcharticles } from '../../../services/articleservice';

import ReactLoading from "react-loading";
import Affichearticle from './Affichearticle';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Insertarticle from './Insertarticle';

const ListArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getarticles = async () => {
    try {
      const res = await fetcharticles()
      setArticles(res.data)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setArticles(res, data)
      setLoading(true)
    }
  }
  useEffect(() => { getarticles() }, [])

  if (loading) {
    return (
      <center>
        <ReactLoading type="spokes" color="blue" height={300} width={200} />
      </center>
    );
  }
  const deleteProduct = (productId, ref) => {
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: 'Oui',
          onClick: () => deletearticle(productId)
            .then(res => setArticles(articles.filter((article) => article._id !== productId)))

            //.then(console.log("suppression effectuée avec success"))
            .catch(error => console.log(error))
        },
        {
          label: 'Non',
        }
      ]
    });
  }
  ///////
  const ajoutarticle = (article) => {
    setArticles([article, ...articles])

  }

  //////
  const modifarticle = (article) => {
    setArticles(article.map((item) => item._id === article._id ? article : item))

  }
  return (
    <div>
      <Insertarticle ajoutarticle={ajoutarticle} />
      <Affichearticle articles={articles} deleteProduct={deleteProduct} modifarticle={modifarticle}></Affichearticle>
    </div>
  )
}




export default ListArticles;
