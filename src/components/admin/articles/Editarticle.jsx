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
import { addarticle, editarticle } from '../../../services/articleservice';
import { fetchscategories } from '../../../services/scategorieservice';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
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

export default function Editarticle({ initialArticle, modifarticle }) {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [article, setArticle] = useState(initialArticle);
  const [scategories, setScategories] = useState([]);


  //////

  const getScategories = async () => {
    await fetchscategories().then(res => {
      setScategories(res.data)
    })
  };

  ////
  const handleSave = async (e) => {
    try {
      e.preventDefault()
      await editarticle(article)
        .then(res => {
          handleClose()
          modifarticle(res.data)
          vider()
        })

    } catch (error) {
      console.error('Erreur lors de l’enregistrement de l’article:', error);
    }

  };

  ///////////
  const vider = () => {

    setArticle({})
  }

  /////////
  useEffect(() => {
    getScategories();
    setFiles([
      {
        source: article.imageart,
        options: { type: 'local' }
      }
    ])
    if (initialArticle && initialArticle.scategorieID) {
      setArticle({
        ...initialArticle,
        scategorieID: initialArticle.scategorieID._id || initialArticle.scategorieID,
      });
    }
  }, [initialArticle]);

  //////////

  const serverOptions = () => {
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
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
            setArticle({ ...article, imageart: data.url });
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
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////affichage //////////
  return (
    <div>
      <Button className="btn btn-warning btn-sm" onClick={handleOpen}> <i className="fa-solid fa-pencil-alt"></i>Modifier un article</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Modifier un article</h1>
          <Form onSubmit={handleSave}>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Référence</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Référence"
                  value={article.reference}
                  onChange={(e) => setArticle({ ...article, reference: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Désignation</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Désignation"
                  value={article.designation}
                  onChange={(e) => setArticle({ ...article, designation: e.target.value })}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Marque"
                  value={article.marque}
                  onChange={(e) => setArticle({ ...article, marque: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Prix"
                  value={article.prix}
                  onChange={(e) => setArticle({ ...article, prix: e.target.value })}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Qté stock</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Qté stock"
                  value={article.qtestock}
                  onChange={(e) => setArticle({ ...article, qtestock: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Image</Form.Label>
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
                <Form.Label>Sous-catégorie</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={article.scategorieID}
                  onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })}
                >
                  <option value="">---- Sélectionner une sous-catégorie ----</option>
                  {scategories.map((scat, index) => (
                    <option key={index} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <div className="button-container mt-3">
              <button type="submit" className="btn btn-success" onClick={(e) => handleSave(e)}>
                <i className="fa-solid fa-save"></i> Enregistrer
              </button>
              <Button type="button" className="btn btn-warning"
                onClick={() => handleClose()}>Annuler</Button>
            </div>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
