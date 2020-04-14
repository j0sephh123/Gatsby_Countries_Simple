import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo"

const Continent = ({ pageContext }) => {
  console.log(pageContext);

  return (
    <Layout>
      <div>Custom variable: {pageContext.myCustomVariable} </div>
      <div>Continent Name: {pageContext.continent.name}</div>
      <div>Number of countries: {pageContext.countries.length}</div>
    </Layout>
  )
}

export default Continent;