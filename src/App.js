// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import './styles/index.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main> {/* Optional: Wrap routes in main for semantics */}
          <Routes>
            <Route path="/" element={<PokemonList />} />
            {/* Route path includes a parameter ':pokemonName' */}
            <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
            {/* Add a catch-all or 404 route if needed */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;