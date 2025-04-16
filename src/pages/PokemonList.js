// src/pages/PokemonList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import '../styles/PokemonList.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=25');
        setPokemonList(res.data.results);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, []);

  if (isLoading) return <p className="status-message">Loading Pokémon...</p>;
  if (error) return <p className="status-message error-message">Error: {error}</p>;

  return (
    <div className="pokemon-list-container">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
