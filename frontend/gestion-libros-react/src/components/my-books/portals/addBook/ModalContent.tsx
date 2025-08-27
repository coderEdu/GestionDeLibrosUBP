import NewBookForm from './NewBookForm';
import '../Styles.css';

interface ModalContentProps {
  onClose: () => void;
}

export default function ModalContent({ onClose }: ModalContentProps) {
  return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <h3>Nuevo Libro</h3>
            <NewBookForm />
            <button className='modal-close-button' onClick={onClose}>❌</button>
        </div>
    </div>
  );
}