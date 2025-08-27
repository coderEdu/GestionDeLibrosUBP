import Book from '../../assets/book-png.jpg'
import './book.css'

function SmallBook() {
  return (
    <div className='book'>
      <img src={Book} alt="" />
    </div>
  )
}

export default SmallBook