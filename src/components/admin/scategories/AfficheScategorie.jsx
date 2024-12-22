import React from 'react';
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import "@fortawesome/fontawesome-free/css/all.css";
import Editscategorie from './EditScategorie';

const AfficheScategorie = ({ scategories, deleteScategorie, modifScategorie }) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'nomscategorie', // Clé correspondant au nom de la sous-catégorie
                header: 'Nom',
                size: 150,
            },
            {
                accessorKey: 'categorieID.nomcategorie', // Clé imbriquée pour la catégorie parente
                header: 'Catégorie parente',
                size: 150,
            },
            {
                accessorKey: 'imagescat', // Clé pour l'image
                header: 'Image',
                Cell: ({ cell }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        {/* Vérification si l'image existe et affichage */}
                        <img
                            alt=""
                            height={100}
                            src={cell.getValue()}
                            loading="lazy"
                            style={{ borderRadius: '20%' }}
                        />
                    </Box>
                ),
            },
            {
                accessorKey: '_id', // ID de la sous-catégorie, utilisé pour les actions
                header: 'Actions',
                size: 100,
                Cell: ({ cell, row }) => (
                    <div>
                        {/* Bouton de modification */}
                        <Editscategorie initialScategorie={cell.row.original} modifier />

                        {/* Bouton de suppression */}
                        <Button
                            onClick={(e) => {
                                deleteScategorie(cell.row.original._id, cell.row.original.nomscategorie, e);
                            }}
                            variant="danger"
                            size="md"
                            className="text-danger btn-link delete"
                        >
                            <i className="fa fa-trash" />
                        </Button>
                    </div>
                ),
            },
        ],
        [scategories],
    );

    const table = useMaterialReactTable({
        columns,
        data: scategories, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return (
        <div>
            <MaterialReactTable table={table}></MaterialReactTable>
        </div>
    );
};

export default AfficheScategorie;
