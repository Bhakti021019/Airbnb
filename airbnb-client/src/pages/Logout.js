import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Redirect to login
  }, [setUser, navigate]);

  return null; // Or add a loader/spinner if you like
}

export default Logout;