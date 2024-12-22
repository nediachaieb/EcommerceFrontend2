import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { editcategorie } from '../../../services/categorieservice';
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

export default function Editcategorie({ initialCategorie, modifCategorie }) {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categorie, setCategorie] = useState(initialCategorie);

  ////
  const handleSave = async (e) => {
    try {
      e.preventDefault()
      await editcategorie(categorie)
        .then(res => {
          handleClose()
          modifCategorie(res.data)
          vider()
        })

    } catch (error) {
      console.error('Erreur lors de l’enregistrement de l’categorie:', error);
    }

  };

  ///////////
  const vider = () => {

    setCategorie({})
  }

  /////////
  useEffect(() => {
    setFiles([
      {
        source: categorie.imagecategorie,
        options: { type: 'local' }
      }
    ])
    if (initialCategorie && initialCategorie.categorieID) {
      setCategorie({
        ...initialCategorie,
        categorieID: initialCategorie.categorieID._id || initialCategorie.categorieID,
      });
    }
  }, [initialCategorie]);

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
            setCategorie({ ...categorie, imagecategorie: data.url });
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
      <Button onClick={handleOpen}>Modifier</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Insérer une catégorie</h1>
          <Form onSubmit={handleSave}>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Nom de la catégorie</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom de la sous-catégorie"
                  value={categorie.nomcategorie}
                  onChange={(e) => setCategorie({ ...categorie, nomcategorie: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Image de categorie</Form.Label>
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
