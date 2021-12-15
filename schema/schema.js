const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

const directorsJson = [
    { "name": "Quentin Tarantino", "age": 55 },
    { "name": "Paul Mazursky", "age": 88 }
]

const moviesJson = [
    { "name": "Snatch", "genre": "Criminal", "directorId": "61b897fb0b9fbec95d695135" },
    { "name": "Sopranos", "genre": "Criminal", "directorId": "61b8a1ce5fd639816ec6aea0" },
    { "name": "Once and Again", "genre": "drama", "directorId": "61b8a1ce5fd639816ec6aea0" },
    { "name": "Coast to coast", "genre": "Soap opera", "directorId": "61b8a1ce5fd639816ec6aea0" },
];

 const movies = [
     {
         id: '1',
         name: 'Snatch',
         genre: 'Criminal',
         directorId: '1'
     },
     {
         id: '2',
         name: 'Kill Bill',
         genre: 'Comedy',
         directorId: '2'
     },
     {
         id: '3',
         name: 'Transformers',
         genre: 'Action',
         directorId: '2'
     }
 ];

const directors = [
    { id: '2', name: 'Quentin Tarantino', age: 55 },
    { id: '1', name: 'Steve Jobs', age: 69 },
];

 const MovieType = new GraphQLObjectType({
     name: 'Movie',
     fields: () => ({
         id: { type: GraphQLID },
         name: { type: GraphQLString },
         genre: { type: GraphQLString },
         directors: {
             type: DirectorType,
             resolve(parent, args) {
                 // return directors.find(director => director.id === parent.id)
             }
         }
     })
 })

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //return movies.filter(movie => movie.directorId === parent.id)
            }
        }
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
               // return movies.find(movie => movie.id === args.id)
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
               // return directors.find(director => director.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})
