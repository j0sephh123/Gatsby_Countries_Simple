const axios = require("axios");
const fs = require('fs').promises;

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const myCustomArray = [
    {
      name: "8th continent",
      countries: [
        {
          name: "Country1",
          capital: "Capital1",
        },
        {
          name: "Country2",
          capital: "Capital2",
        },
        {
          name: "Country3",
          capital: "Capital3",
        },
      ]
    }
  ];

  await graphql(`
    {
      custom_api {
        continents {
          name
          countries {
            name
            capital
            currency
            languages {
              name
            }
          }
        }
      }
    }
    `).then(async (result) => {
      
      result.data.custom_api.continents.map(continent => {

        // Create pages for continents
        createPage({
          path: `/${continent.name.toLowerCase()}/`,
          component: require.resolve(`./src/templates/continent.js`),
          context: {
            myCustomVariable: 5,
            countries: continent.countries,
            continent,
          },
        });

        // Iterate countries
        continent.countries.forEach(country => {
          createPage({
            path: `/${continent.name.toLowerCase()}/${country.name.toLowerCase()}/`,
            component: require.resolve(`./src/templates/country.js`),
            context: {
              myCustomVariable: 10,
              country,
              continent,
            },
          });
        });
      });

      

    });
}
