const axios = require("axios");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

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
          path: `/${continent.name.toLowerCase()}/`, // url
          component: require.resolve(`./src/templates/continent.js`), // which file to use
          context: { // data that the component receives in props.pageContext
            myCustomVariable: 5,
            countries: continent.countries,
            continent,
          },
        });

        // Iterate countries
        continent.countries.forEach(country => {
          createPage({
            path: `/${continent.name.toLowerCase()}/${country.name.toLowerCase()}/`, // url
            component: require.resolve(`./src/templates/country.js`), // which file to use
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
