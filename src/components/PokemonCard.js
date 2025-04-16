// src/components/PokemonCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PokemonList.css';

function PokemonCard({ pokemon: { name, url } }) {
  const pokemonId = url.split('/').at(-2);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Link to={`/pokemon/${name}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <img src={imageUrl} alt={name} loading="lazy" />
        <p>{name[0].toUpperCase() + name.slice(1)}</p>
      </div>
    </Link>
  );
}

export default PokemonCard;
