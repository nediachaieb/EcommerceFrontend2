import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import de la confirmation
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS de confirmation
import ReactLoading from "react-loading";
import { fetchcategories } from '../../../services/categorieservice';
import { deletecategorie } from '../../../services/categorieservice';
import Insertcategorie from './Insertcategorie';
import AfficheCategorie from './AfficheCategorie';

const Listcategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des catégories
  const getCategories = async () => {
    try {
      const res = await fetchcategories();
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <center>
        <ReactLoading type="spokes" color="blue" height={300} width={200} />
      </center>
    );
  }

  // Suppression d'une catégorie
  const deleteCategorie = (categorieId, name) => {
    confirmAlert({
      title: "Confirmation de suppression",
      message: `Voulez-vous supprimer la sous-catégorie : ${name} ?`,
      buttons: [
        {
          label: 'Oui',
          onClick: () => deletecategorie(categorieId)
            .then(() => {
              setCategories(categories.filter((categorie) => categorie._id !== categorieId));
              console.log("catégorie supprimée avec succès");
            })
            .catch((error) => console.error("Erreur lors de la suppression:", error)),
        },
        {
          label: 'Non',
        },
      ],
    });
  };

  // Ajout d'une nouvelle catégorie
  const ajoutCategorie = (categorie) => {
    setCategories([categorie, ...categories]);
  };

  // Modification d'une catégorie
  const modifCategorie = (categorie) => {
    setCategories(
      categorie.map((item) =>
        item._id === categorie._id ? categorie : item
      )
    );
  };


  return (
    <div>
      <Insertcategorie ajoutCategorie={ajoutCategorie} />
      <AfficheCategorie
        categories={categories}
        deleteCategorie={deleteCategorie}
        modifCategorie={modifCategorie}
      />
    </div>
  );
};

export default Listcategories;
