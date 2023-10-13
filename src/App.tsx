import { useEffect, useState } from 'react';
import axios from 'axios';
import { MediaCard } from './MediaCard';
import { BasicTextFields } from './Pesquisa';
import styles from './App.module.css';

interface PokemonData {
  name: string;
  url: string;
}



export function App() {
  const [filterPokemon, setFilterPokemon] = useState("");
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: any }>({}); // Usamos um objeto

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((response) => {
        setPokemonList(response.data.results);

        const detailPromises = response.data.results.map((pokemon: PokemonData) =>
          axios.get(pokemon.url)
        );

        Promise.all(detailPromises)
          .then((detailResponses) => {
            const details = detailResponses.reduce((acc, response) => {
              acc[response.data.name] = response.data;
              return acc;
            }, {} as { [key: string]: any });
            setPokemonDetails(details);
          })
          .catch((error) => console.error('Erro ao buscar detalhes dos Pokémon:', error));
      })
      .catch((error) => console.error('Erro na chamada à API principal:', error));
  }, []);

  useEffect(() => {
    if (filterPokemon.trim() === "") {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filterPokemon.toLowerCase())
      );
      setFilteredPokemonList(filteredPokemon);
    }
  }, [filterPokemon, pokemonList]);

  const [filteredPokemonList, setFilteredPokemonList] = useState<PokemonData[]>([]);

  return (
    <div>
      <h1 className={styles.titulo}>Pokedex</h1>
      <div className={styles.pesquisa}>
        <BasicTextFields filteredPokemon={setFilterPokemon} />
      </div>
      <div className={styles.cards}>
        {filteredPokemonList.map((pokemon, index) => (
          <MediaCard key={index} name={pokemon.name} details={pokemonDetails[pokemon.name]} />
        ))}
      </div>
    </div>
  );
}

// import { useEffect, useState } from 'react'
// import axios from 'axios';
// import { MediaCard } from './MediaCard';
// import styles from './App.module.css';

// interface PokemonData {
//   name: string;
//   url: string;
// }

// export function App() {
//   const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
//   const [pokemonDetails, setPokemonDetails] = useState<any[]>([]); // Use um tipo adequado para os detalhes

//   useEffect(() => {
//     axios
//       .get('https://pokeapi.co/api/v2/pokemon?limit=100') // Exemplo com limite de 10 Pokémon
//       .then((response) => {
//         setPokemonList(response.data.results);

//         // Mapeie a lista de Pokémon para buscar os detalhes de cada um
//         const detailPromises = response.data.results.map((pokemon: PokemonData) =>
//           axios.get(pokemon.url)
//         );

//         // Espere que todas as chamadas sejam concluídas
//         Promise.all(detailPromises)
//           .then((detailResponses) => {
//             const details = detailResponses.map((response) => response.data);
//             setPokemonDetails(details);
//           })
//           .catch((error) => console.error('Erro ao buscar detalhes dos Pokémon:', error));
//       })
//       .catch((error) => console.error('Erro na chamada à API principal:', error));
//   }, []);

//   return (
//     <div className={styles.cards}>

//       {pokemonList.map((pokemon, index) => (
//         <MediaCard key={index} name={pokemon.name} details={pokemonDetails[index]} />
//       ))}
//     </div>
//   );
// }
