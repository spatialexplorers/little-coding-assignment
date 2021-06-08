import React from "react";

export default function useData() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    console.log("Fetching data");
    fetch("/pokedex.json")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return data;
}
