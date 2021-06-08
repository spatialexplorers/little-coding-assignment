import styled from "@emotion/styled";
import React from "react";
import useData from "./useData";

export function List() {
  const data = useData();
  const [sort, setSort] = React.useState("");

  // this could be cached somehow
  const pokemonTypes = Array.from(
    data.reduce((types, pokemon) => {
      types.add(...pokemon.type);
      return types;
    }, new Set())
  );

  //do some processing on the data based of state values and perhaps 'cache' the result
  const filteredData = data;
  const sortedData = filteredData;

  //actions
  const changeSort = (s) => {
    setSort(s);
  };

  const resetFilters = () => {
    console.log("Resetting filters");
  };

  console.log("Sorting on:", sort);

  return (
    <div>
      <h1>Pokedex</h1>
      <FilterContainer>
        <h2>Filters</h2>
        <ul>
          <li>
            <label>Name</label>
            <article>
              <input type="text" placeholder="name" />
            </article>
          </li>
          <li>
            <label>Types</label>
            <article>
              <select
                multiple
                onChange={(e) => {
                  let selectedTypes = Array.from(e.currentTarget.options)
                    .filter((op) => op.selected)
                    .map((op) => op.value);
                  console.log(selectedTypes);
                }}
              >
                {pokemonTypes.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
            </article>
          </li>
          <li>
            <label>HP</label>
            <article>
              <div className="range">
                Min: <input type="number" />
                Max: <input type="number" />
              </div>
            </article>
          </li>
        </ul>
        <Button className="alt" onClick={resetFilters}>
          Reset filters
        </Button>
      </FilterContainer>
      <Table>
        <thead>
          <tr>
            <th className={`sortable ${sort === "name" && "active"}`} onClick={() => changeSort("name")}>
              Name
              {/* ▲ ▼ */}
            </th>
            <th>Types</th>
            <th className={`sortable ${sort === "hp" && "active"}`} onClick={() => changeSort("hp")}>
              HP
            </th>
            <th className={`sortable ${sort === "attack" && "active"}`} onClick={() => changeSort("attack")}>
              Attack
            </th>
            <th className={`sortable ${sort === "defense" && "active"}`} onClick={() => changeSort("defense")}>
              Defense
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.name.english}</td>
              <td>{pokemon.type.join(",")}</td>
              <td>{pokemon.base.HP}</td>
              <td>{pokemon.base.Attack}</td>
              <td>{pokemon.base.Defense}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const FilterContainer = styled.section`
  border-radius: 6px;
  border: 1px solid #eee;
  padding: 16px;
  margin-bottom: 32px;
  h2 {
    font-size: 14px;
    margin: 0 0 16px 0;
    padding: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid black;
      label {
        flex: 0 0 100px;
      }

      article {
        flex: 1 1 auto;

        input,
        select {
          font-size: 16px;
          padding: 2px 8px;
          min-width: 400px;
        }

        .range {
          input {
            min-width: 80px;
          }
        }
      }
    }
  }
`;

const Table = styled.table`
  width: 100%;

  th {
    text-align: left;
    padding: 4px 8px;

    &.sortable {
      cursor: s-resize;
      /* cursor: n-resize */
      text-decoration: underline;
    }

    &.active {
      color: blue;
    }
  }
  tr {
    td {
      padding: 4px 8px;
    }

    &:nth-of-type(odd) {
      td {
        background-color: #eee;
      }
    }
  }
`;

const Button = styled.button`
  border-radius: 4px;
  background-color: midnightblue;
  color: #fff;
  border: 0;
  padding: 8px 16px;
  margin-right: 4px;

  &.alt {
    background-color: darkgray;
  }
`;
