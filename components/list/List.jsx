import styled from "@emotion/styled";
import React from "react";
import useData from "./useData";

const SORT_KEYS = {
  name: "name",
  hp: "hp",
  attack: "attack",
  defense: "defense"
};

const DEFAULT_FILTERS = {
  name: "",
  types: [],
  hpMin: "",
  hpMax: ""
};

export function List() {
  const [data, pokemonTypes] = useData();
  const [sort, setSort] = React.useState([SORT_KEYS.name, 1]);
  const [filter, setFilter] = React.useState(DEFAULT_FILTERS);

  console.log("Sorting on:", sort);

  //do some processing on the data based of state values and perhaps 'cache' the result
  const filteredData = React.useMemo(() => {
    let result = data;
    if (filter.name && filter.name.length >= 3) {
      result = result.filter((obj) => obj.name.english.toLowerCase().indexOf(filter.name.toLowerCase()) >= 0);
    }
    if (filter.types.length) {
      result = result.filter((obj) => filter.types.every((v) => obj.type.includes(v)));
    }
    if (filter.hpMin || filter.hpMax) {
      let min = filter.hpMin ? filter.hpMin : 0;
      let max = filter.hpMax ? filter.hpMax : Infinity;
      result = result.filter((obj) => obj.base.HP >= min && obj.base.HP <= max);
    }
    return result;
  }, [filter, data]);

  const processedData = React.useMemo(() => {
    let result = filteredData;
    result.sort(SORTERS[sort[0]]);
    if (sort[1] < 0) return result.reverse();
    return result;
  }, [sort, filteredData]);

  const changeSort = (key, dir) => {
    setSort([key, dir]);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div>
      <h1>Pokedex</h1>
      <FilterContainer>
        <h2>Filters</h2>
        <ul>
          <li>
            <label>Name</label>
            <article>
              <input
                type="text"
                placeholder="name"
                value={filter.name}
                onChange={(e) => {
                  setFilter((f) => {
                    return { ...f, name: e.target.value };
                  });
                }}
              />
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
                  setFilter((f) => ({
                    ...f,
                    types: selectedTypes
                  }));
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
                Min:{" "}
                <input
                  type="number"
                  value={filter.hpMin}
                  onChange={(e) => {
                    setFilter((f) => ({
                      ...f,
                      hpMin: e.target.value
                    }));
                  }}
                />
                Max:{" "}
                <input
                  type="number"
                  value={filter.hpMax}
                  onChange={(e) => {
                    setFilter((f) => ({
                      ...f,
                      hpMax: e.target.value
                    }));
                  }}
                />
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
            <SortHeader title="Name" activeSort={sort} sortKey={SORT_KEYS.name} changeSort={changeSort} />

            <th>Types</th>
            <SortHeader title="HP" activeSort={sort} sortKey={SORT_KEYS.hp} changeSort={changeSort} />
            <SortHeader title="Attack" activeSort={sort} sortKey={SORT_KEYS.attack} changeSort={changeSort} />
            <SortHeader title="Defense" activeSort={sort} sortKey={SORT_KEYS.defense} changeSort={changeSort} />
          </tr>
        </thead>
        <tbody>
          {processedData.map((pokemon) => (
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

function SortHeader({ title, changeSort, activeSort, sortKey }) {
  let active = activeSort[0] === sortKey;
  let dir = activeSort[1];

  let arrow = "";
  if (active) {
    arrow = dir > 0 ? "▲" : "▼";
  }

  return (
    <th
      className={`sortable ${active && "active"} ${dir > 0 ? "up" : "down"}`}
      onClick={() => {
        changeSort(sortKey, active ? dir * -1 : 1);
      }}
    >
      {title}
      {arrow}
    </th>
  );
}

const SORTERS = {
  [SORT_KEYS.name]: sortName,
  [SORT_KEYS.hp]: sortHP,
  [SORT_KEYS.attack]: sortAttack,
  [SORT_KEYS.defense]: sortDefense
};

function sortName(a, b) {
  var nameA = a.name.english.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.english.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}

function sortHP(a, b) {
  return a.base.HP - b.base.HP;
}

function sortAttack(a, b) {
  return a.base.Attack - b.base.Attack;
}

function sortDefense(a, b) {
  return a.base.Defense - b.base.Defense;
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

      &.down {
        cursor: n-resize;
      }
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
