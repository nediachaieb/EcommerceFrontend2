import React from 'react'
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import "@fortawesome/fontawesome-free/css/all.css";
import Editarticle from './Editarticle';

const Affichearticle = ({ articles, deleteProduct, modifarticle }) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'reference', //access nested data with dot notation
                header: 'Reference',
                size: 80,
            },
            {
                accessorKey: 'designation',
                header: 'designation',
                size: 150,
            },
            {
                accessorKey: 'prix',
                header: 'prix',
                size: 150,
            },
            {
                accessorKey: 'marque', //normal accessorKey
                header: 'marque',
                size: 200,
            },
            {
                accessorKey: 'qtestock',
                header: 'stock',
                size: 150,
            },
            {
                accessorKey: 'imageart', //access nested data with dot notation
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

                    </Box>),
            },
            {
                accessorKey: '_id',
                header: 'actions',
                size: 100,
                Cell: ({ cell, row }) => (
                    <div >
                        <Editarticle initialArticle={cell.row.original} modifier />

                        <Button
                            onClick={(e) => {
                                deleteProduct(cell.row.original._id, cell.row.original.reference, e);
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
        [articles],
    );

    const table = useMaterialReactTable({
        columns,
        data: articles, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });
    return (
        <div>
            <MaterialReactTable table={table}>

            </MaterialReactTable>
        </div>
    )
}

export default Affichearticle
