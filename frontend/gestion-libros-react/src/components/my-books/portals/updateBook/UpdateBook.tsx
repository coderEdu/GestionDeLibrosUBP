import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  titulo: string;
  descripcion: string;
  propietario: number;
}

interface UpdateItemProps {
  itemId: number;
  onUpdateSuccess: () => void; // Callback after successful update
}

const UpdateBook: React.FC<UpdateItemProps> = ({ itemId, onUpdateSuccess }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try { 
        const response = await axios.get<Item>(`http://127.0.0.1:8000/libros/libro/${itemId}`);
        setItem(response.data);
      } catch (err) {
        setError('Failed to load item.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (item) {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    try {
      await axios.put(`http://127.0.0.1:8000/libros/libro/${itemId}`, item);
      onUpdateSuccess(); // Notify parent component of success
    } catch (err) {
      setError('Failed to update item.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Titulo:</label>
        <input type="text" id="titulo" name="titulo" value={item.titulo} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="descripcion">Descripcion:</label>
        <textarea id="descripcion" name="descripcion" value={item.descripcion} onChange={handleChange} />
      </div>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default UpdateBook;