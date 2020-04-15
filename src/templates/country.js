import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"

const Country = ({ pageContext }) => {
  console.log(pageContext);

  const { name, capital, languages } = pageContext.country;
  const continentName = pageContext.continent.name;
  console.log(continentName);

  return (
    <Layout>
      <div style={{marginTop: 50}}>
        <h2>{name} - {continentName}</h2>
        <div>Capital: {capital}</div>
        <div style={{marginTop: 50}}>
          <h3>List of languages:</h3>
          {languages.map((lang,i) => (
            <div key={i}>{lang.name}</div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Country;