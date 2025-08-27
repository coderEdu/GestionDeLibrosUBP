import React, { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  titulo: string;
  descripcion: string;
  propietario: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ titulo: '', descripcion: '', propietario: '2' });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post<any>('http://127.0.0.1:8000/libros/', formData);
      setMessage('Form submitted successfully!');
      console.log('Response:', response.data);
      // Optionally, clear the form:
      setFormData({ titulo: '', descripcion: '', propietario: '2' }); 
    } catch (error) {
      setMessage('Error submitting form.');
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Titulo:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripcion:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Agregar</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default MyForm;