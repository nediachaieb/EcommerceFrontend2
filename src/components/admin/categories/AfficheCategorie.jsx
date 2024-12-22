import React from 'react';
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import "@fortawesome/fontawesome-free/css/all.css";
import Editcategorie from './Editcategorie';

const AfficheCategorie = ({ categories, deleteCategorie, modifCategorie }) => {
    const columns = useMemo(() => [
        {
            accessorKey: 'nomcategorie',
            header: 'Nom',
            size: 150,
        },
        {
            accessorKey: 'imagecategorie',
            header: 'Image',
            Cell: ({ cell }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
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
            accessorKey: '_id',
            header: 'Actions',
            size: 100,
            Cell: ({ cell }) => (
                <div>
                    {/* Bouton de modification */}
                    <Editcategorie initialCategorie={cell.row.original} modifier />

                    {/* Bouton de suppression */}
                    <Button
                        onClick={() => {
                            deleteCategorie(cell.row.original._id);
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
    ], [categories]);

    const table = useMaterialReactTable({
        columns,
        data: categories, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return (
        <div>
            <MaterialReactTable table={table}></MaterialReactTable>
        </div>
    );
};

export default AfficheCategorie;
