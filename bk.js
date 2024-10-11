// src/pages/pokemon.js

import React, { useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import PokemonPage from "@/components/Page";


export default function PokemonIndex() {
    const [cnt, setCnt] = useState(1)
    const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<PokemonPage page={i} key={i} />)
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pokémon Index</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pages}
      </ul>
      <button onClick={() => setCnt(cnt + 1)}>Load More</button>
    </div>
  );
}


/**
 * function App () {
  const [cnt, setCnt] = useState(1)
 
  const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<Page index={i} key={i} />)
  }
 
  return <div>
    {pages}
    <button onClick={() => setCnt(cnt + 1)}>Load More</button>
  </div>
}
 */