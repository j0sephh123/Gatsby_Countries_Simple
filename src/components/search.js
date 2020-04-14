import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby'

const container = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: "column",
  alignItems: "center",
}
const searchResults = {
  display: 'flex',
}
const inputStyle = {
  width: '50%',
}

const Search = () => {
  const [input, setInput] = useState('');

  const data = useStaticQuery(graphql`
   {
      custom_api {
        countries {
          name
          continent {
            name
          }
        }
      }
    }
  `)

  
  // console.log(data.custom_api.countries);
  let { countries } = data.custom_api;

  return (
    <div style={container}>
      <input
        style={inputStyle}
        placeholder="Filter countries"
        onChange={e => setInput(e.target.value)}
        value={input}
      />
      <div style={searchResults}>
        {input.length === 0 ? null : <div>
            {countries
              .filter(c => c.name.toLowerCase().indexOf(input.toLowerCase()) > -1)
              .slice(0, 10)
              .map(country => {
              return (
                <div key={country.name}>
                  <Link to={`/${country.continent.name.toLowerCase()}/${country.name.toLowerCase()}/`}>{country.name}</Link>
                </div>
              )
            })}
        </div>
        }
      </div>
    </div>
  )
}

export default Search