import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
          const response = await axios.get('http://localhost:5000/auth/protected', {
            headers: {
              'Authorization': `Bearer ${token}`, // Include JWT token in header
            },
            withCredentials: true, // Include cookies in requests (if needed)
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error.response?.data || error.message);
          setError('Failed to fetch data');
        }
      };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedRoute;
