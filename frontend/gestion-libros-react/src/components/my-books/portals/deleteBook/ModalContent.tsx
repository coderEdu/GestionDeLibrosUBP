import { ConfirmDeleteBook } from './ConfirmDeleteBook';
import '../Styles.css';

interface ModalContentProps {
  onClose: () => void;
  id: number;
}

export default function ModalContent({ onClose, id }: ModalContentProps) {
  return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <h3>Eliminar Libro</h3>
            {/* <DeleteBook id={id} /> */}
            <button className='modal-close-button' onClick={onClose}>❌</button>
            <p>Está seguro de querer eliminar el libro? {id}</p>
            <div>
                <button onClick={() => ConfirmDeleteBook(id)}>Si</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    </div>
  );
}