import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signUpUser = async (formData) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await fetch(`${apiUrl}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signUpUser, loading, error };
};

export default useSignup;
