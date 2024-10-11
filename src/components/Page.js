// src/pages/pokemon.js

import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const pageSize = 20;

export function getOffSet(page) {

    console.log((page * pageSize))
    return (page * pageSize);
}

export default function PokemonPage({
    page = 1
}) {
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${getOffSet(page)}`,
    fetcher
  );
  console.log(`https://pokeapi.co/api/v2/pokemon?offset=${getOffSet(page)}`)

  if (error) return <div>An error has occurred.</div>;

  return (
      <>
        {isLoading
          ? Array.from({ length: pageSize }).map((_, index) => (
              <li key={index} className="border p-4 rounded-lg flex flex-col items-center">
                <Skeleton circle={true} height={96} width={96} />
                <Skeleton width={80} height={20} className="mt-2" />
              </li>
            ))
          : data.results.map((pokemon, index) => {
            const id = pokemon.url.split("/")[6];
            return (
                <li key={pokemon.name} className="border p-4 rounded-lg flex flex-col items-center">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={pokemon.name}
                    width={96}
                    height={96}
                  />
                  <span className="mt-2 capitalize">{pokemon.name}</span>
                </li>
              )
          })}
      </>
  );
}