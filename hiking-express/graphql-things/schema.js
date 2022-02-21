var { buildSchema } = require('graphql');

// graphql
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  
  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    testContext(something: String): String
    testResolver: String
  }
`);

module.exports = schema;

/*
tours: [Tour]
reviews: [String]
*/