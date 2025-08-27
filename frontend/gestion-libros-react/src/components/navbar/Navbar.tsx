import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface NavbarProps {
  session: (state: boolean) => void;
  misLibros: (state: boolean) => void;
}

function Navbar({ session, misLibros }: NavbarProps) {
  const { userLoggedIn, logout } = useContext(AuthContext);
  const Disconnect = () => {
    logout();
    session(false); // Reset session state when logging out
    misLibros(false); // Reset misLibros state when logging out
   }
   
  return (
    <AppBar position="static">
      <Toolbar>
        {/**
         * 
         */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}></Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          { !userLoggedIn 
            ? <Button color="inherit" onClick={() => session(true)}>Iniciar Sesión</Button> 
            : (
              <>              
                <Button color="inherit" onClick={() => misLibros(true)}>Mis Libros</Button>
                <Button color="inherit" onClick={() => Disconnect()}>Desconectar</Button>            
              </>
            )
          }
        </Box>
        {/* Add responsive menu for smaller screens here */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;