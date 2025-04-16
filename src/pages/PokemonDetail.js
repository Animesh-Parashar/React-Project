// src/pages/PokemonDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PokemonDetail.css';

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setPokemonDetails(null);
      setSpeciesDetails(null);

      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = res.data;
        setPokemonDetails(data);

        if (data.species?.url) {
          try {
            const speciesRes = await axios.get(data.species.url);
            setSpeciesDetails(speciesRes.data);
          } catch (speciesErr) {
            console.warn(`Could not fetch species: ${speciesErr.message}`);
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response && err.response.status === 404) {
          setError(`Pokémon "${pokemonName}" not found.`);
        } else {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemonName]);

  const englishDesc = speciesDetails?.flavor_text_entries?.find(
    (entry) => entry.language.name === 'en'
  )?.flavor_text?.replace(/[\n\f\r]/g, ' ') || 'No description available.';

  if (isLoading) return <p className="status-message">Loading Pokémon details...</p>;

  if (error) {
    return (
      <div className="pokemon-detail-container">
        <Link to="/" className="back-link">← Back to List</Link>
        <p className="status-message error-message">Error: {error}</p>
      </div>
    );
  }

  if (!pokemonDetails) {
    return <p className="status-message">Could not load Pokémon details.</p>;
  }

  const { name, id, height, weight, types, abilities, stats, sprites } = pokemonDetails;
  const imageUrl = sprites?.other?.['official-artwork']?.front_default || sprites?.front_default;

  return (
    <div className="pokemon-detail-container">
      <Link to="/" className="back-link">← Back to List</Link>
      <h1>{name[0].toUpperCase() + name.slice(1)}</h1>
      <img src={imageUrl} alt={name} className="pokemon-detail-image" />

      <div className="detail-section description-section">
        <h2>Description</h2>
        <p>{englishDesc}</p>
      </div>

      <div className="detail-section">
        <h2>Information</h2>
        <p><strong>ID:</strong> #{id}</p>
        <p><strong>Height:</strong> {height / 10} m</p>
        <p><strong>Weight:</strong> {weight / 10} kg</p>
      </div>

      <div className="detail-section">
        <h2>Types</h2>
        <ul>
          {types.map(({ slot, type }) => (
            <li key={slot} className={`type-tag type-${type.name}`}>
              {type.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h2>Abilities</h2>
        <ul>
          {abilities.map(({ ability }) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h2>Base Stats</h2>
        <ul>
          {stats.map(({ stat, base_stat }) => (
            <li key={stat.name}>
              <strong>{stat.name.replace('-', ' ')}:</strong> {base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
