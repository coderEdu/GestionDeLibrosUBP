import MyTableComponent from './table/MyTableComponent';
import './style.css';

function MyBooks() {  
  return (
    <>
      <h3 className='mtop'>Listado de Libros</h3>
      <MyTableComponent />
    </>
  )
}

export default MyBooks;