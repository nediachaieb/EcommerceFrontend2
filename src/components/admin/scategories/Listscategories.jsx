import React, { useEffect, useState } from 'react';
import { fetchscategories, deletescategorie } from '../../../services/scategorieservice';
import { confirmAlert } from 'react-confirm-alert'; // Import de la confirmation
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS de confirmation
import ReactLoading from "react-loading";
import InsertScategorie from './InsertScategorie';
import AfficheScategorie from './AfficheScategorie';

const Listscategories = () => {
  const [scategories, setScategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des sous-catégories
  const getScategories = async () => {
    try {
      const res = await fetchscategories();
      setScategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des sous-catégories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getScategories();
  }, []);

  if (loading) {
    return (
      <center>
        <ReactLoading type="spokes" color="blue" height={300} width={200} />
      </center>
    );
  }

  // Suppression d'une sous-catégorie
  const deleteScategorie = (scategorieId, name) => {
    confirmAlert({
      title: "Confirmation de suppression",
      message: `Voulez-vous supprimer la sous-catégorie : ${name} ?`,
      buttons: [
        {
          label: 'Oui',
          onClick: () => deletescategorie(scategorieId)
            .then(() => {
              setScategories(scategories.filter((scategorie) => scategorie._id !== scategorieId));
              console.log("Sous-catégorie supprimée avec succès");
            })
            .catch((error) => console.error("Erreur lors de la suppression:", error)),
        },
        {
          label: 'Non',
        },
      ],
    });
  };

  // Ajout d'une nouvelle sous-catégorie
  const ajoutScategorie = (scategorie) => {
    setScategories([scategorie, ...scategories]);
  };

  // Modification d'une sous-catégorie
  const modifScategorie = (scategorie) => {
    setScategories(
      scategorie.map((item) =>
        item._id === scategorie._id ? scategorie : item
      )
    );
  };


  return (
    <div>
      <InsertScategorie ajoutScategorie={ajoutScategorie} />
      <AfficheScategorie
        scategories={scategories}
        deleteScategorie={deleteScategorie}
        modifScategorie={modifScategorie}
      />
    </div>
  );
};

export default Listscategories;
