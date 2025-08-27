import UpdateBook from './UpdateBook';
import '../Styles.css';

interface UpdateItemProps {
  onClose: () => void;
  itemId: number;
}

export default function UpModalContent({ onClose, itemId }: UpdateItemProps) {
  return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <h3>Editar Libro</h3>
            <button className='modal-close-button' onClick={onClose}>❌</button>
            <UpdateBook itemId={itemId} onUpdateSuccess={onClose} />
        </div>
    </div>
  );
}