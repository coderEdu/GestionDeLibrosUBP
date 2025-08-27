import axios from 'axios';

 export const ConfirmDeleteBook = async (id: Number) => {
    try {
        // Send the DELETE request to your backend API
        await axios.delete(`http://127.0.0.1:8000/libros/libro/${id}`);

        // Update the local state to remove the deleted item
        // Assuming 'items' is your state variable holding the list of items
        // setItems(prevItems => prevItems.filter(item => item.id !== id));

    } catch (error) {
        console.error("Error deleting item:", error);
        // Handle error, e.g., show an error message to the user
    }
};