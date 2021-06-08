import React from "react";

export default function useData() {
  const [data, setData] = React.useState([]);
  const [pokemonTypes, setPokemonTypes] = React.useState([]);
  React.useEffect(() => {
    console.log("Fetching data");
    fetch("/pokedex.json")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setPokemonTypes(
          Array.from(
            json.reduce((types, pokemon) => {
              types.add(...pokemon.type);
              return types;
            }, new Set())
          )
        );
      });
  }, []);

  return [data, pokemonTypes];
}
