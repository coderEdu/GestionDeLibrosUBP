import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Paper, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { GridColDef } from '@mui/x-data-grid';
import NewBook from '../portals/addBook/NewBookBtn';
import ModalContent from '../portals/deleteBook/ModalContent';
import UpModalContent from '../portals/updateBook/UpModalContent';

interface UserData {
  id: number
  titulo: string
  descripcion: string
  propietario: number
}

let selected_id: number = 0;

const MyTableComponent: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [showUpdateModal, setUpdateShowModal] = useState(false);

  // ...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/libros/2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: UserData[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selected_id]); // Empty dependency array ensures it runs only once on mount

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handleDelete = (id: number) => {
    selected_id = id;
    setDeleteShowModal(true);
  };  

  const handleUpdate = (id: number) => {
    selected_id = id;
    setUpdateShowModal(true);
  }; 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titulo', headerName: 'Titulo', width: 150 },
    { field: 'descripcion', headerName: 'Descripcion', width: 500 },
    {
        field: "actions",
        headerName: "Acciones",
        type: "number",
        width: 180,
        renderCell: (params) => (
        <Box>
            <Button
                variant="outlined"
                size="small"
                color='success'
                onClick={() => handleUpdate(params.row.id)} // Aquí va la lógica del botón
            >
            Editar
            </Button>
            {' '} {/* Espacio entre botones si son varios */}
            <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => handleDelete(params.row.id)}
            >
            Eliminar
            </Button>
        </Box>
        ),
    }
  ];

  const rows = data.map((item) => ({
    id: item.id,
    titulo: item.titulo,
    descripcion: item.descripcion,
    acciones: (
    <div>
        <button style={{ marginRight: '8px' }}>Editar</button>
        <button>Eliminar</button>
    </div>)
  }));

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
        <NewBook /> {/* Botón para abrir el modal */}
        <Paper sx={{ height: 467, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10]}
            sx={{ border: 0, borderRadius: 2, backgroundColor: '#ffffffff' }}
        />
        </Paper>
        {showDeleteModal && createPortal(
            <ModalContent onClose={() => setDeleteShowModal(false)} id={selected_id} />,
            document.body
        )}
        {showUpdateModal && createPortal(
            <UpModalContent onClose={() => setUpdateShowModal(false)} itemId={selected_id} />,
            document.body
        )}
    </div>
  )
};

export default MyTableComponent;