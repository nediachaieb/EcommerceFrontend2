/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addscategorie } from '../../../services/scategorieservice';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { fetchcategories } from '../../../services/categorieservice';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Insertscategorie({ ajoutScategorie }) {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [scategorie, setScategorie] = useState({});
  const [categories, setCategories] = useState([]);

  // Fonction pour ouvrir/fermer la modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Récupérer les catégories principales
  const getCategories = async () => {
    await fetchcategories().then(res => {
      setCategories(res.data);
    });
  };

  // Sauvegarder la nouvelle sous-catégorie
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addscategorie(scategorie)
        .then(res => {
          handleClose();
          ajoutScategorie(res.data); // Passer la sous-catégorie ajoutée à la fonction parent
          vider();
        });
    } catch (error) {
      console.error('Erreur lors de l’enregistrement de la sous-catégorie:', error);
    }
  };

  // Réinitialiser les champs
  const vider = () => {
    setScategorie({});
  };

  useEffect(() => {
    getCategories(); // Charger les catégories au démarrage
  }, []);
  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'essat2025');
        data.append('cloud_name', 'dl0up9fgv');
        data.append('publicid', file.name);
        axios.post('https://api.cloudinary.com/v1_1/dl0up9fgv/image/upload', data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setScategorie({ ...scategorie, imagescat: data.url });
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  return (
    <div>
      <Button onClick={handleOpen}>Ajouter une sous-catégorie</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Insérer une sous-catégorie</h1>
          <Form onSubmit={handleSave}>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Nom de la sous-catégorie</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom de la sous-catégorie"
                  value={scategorie.nomscategorie}
                  onChange={(e) => setScategorie({ ...scategorie, nomscategorie: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Image de Scategorie</Form.Label>
                <label htmlFor="prix">Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                  <FilePond

                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={serverOptions()}
                    name="file"
                  />
                </div>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md="12">
                <Form.Label>Catégorie principale</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={scategorie.categorieID}
                  onChange={(e) => setScategorie({ ...scategorie, categorieID: e.target.value })}
                >
                  <option value="">---- Sélectionner une catégorie principale ----</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat._id}>
                      {cat.nomcategorie}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>

            <div className="button-container mt-3">
              <Button type="submit" className="btn btn-success">
                <i className="fa-solid fa-save"></i> Enregistrer
              </Button>
              <Button type="button" className="btn btn-warning" onClick={handleClose}>
                Annuler
              </Button>
            </div>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
