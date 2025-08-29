import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar'
import SmallBook from './components/smallbook/SmallBook'
import Login from './components/login/Login';
import MyBooks from './components/my-books/MyBooks';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './App.css'

function App() {
  const {userLoggedIn} = useContext(AuthContext);
  const [btnSessPressed, setBtnSessPressed] = useState<boolean>(false);
  const [misLibrosPressed, setMisLibrosPressed] = useState<boolean>(false);
  
  const session = (state: boolean) => {
    setBtnSessPressed(state);
  }

  const myBooks = (state: boolean) => {
    setMisLibrosPressed(state);
  }

  return (
    <>
      <Header />
      <Navbar session={session} misLibros={myBooks} />
      <main>
        {/* <SmallBook /> */}   
        <div>
          {!userLoggedIn && !btnSessPressed ? <SmallBook /> : null}
          {!userLoggedIn && btnSessPressed ? <Login /> : null}
          {userLoggedIn && misLibrosPressed ? <MyBooks /> : null}
        </div>
      </main>
    </>
  )
}

export default App
