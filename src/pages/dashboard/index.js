import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {

  const [ spots, setSpots ] = useState([]);

  // dentro do array, vão as variáveis que você quer ficar "observando"
  // sempre quando elas sofrerem alterações, a função será executada
  // o array vazio é para ser executado apenas uma vez
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get(
        '/dashboard',
        {
          headers: { user_id }
        }
      );
      
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">

        {spots.length !== 0 ? spots.map(spot => 
          (
            <li key={spot._id}>
              <header style={{
                backgroundImage: `url(${spot.thumbnail_url})`
              }}></header>
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
            </li>
          )
        ) : <strong>Nenhum spot :(</strong> }
      </ul>

      <Link to="/new">
        <button className="btn">
          cadastrar novo spot
        </button>
      </Link>
    </>
  );
}
