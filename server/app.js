const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const app = express();
const PORT = 3005;
const mongoose = require('mongoose');

mongoose.connect('mongodb://test3:test3@cluster0.ruvyu.mongodb.net/grapQlPractice?');

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', err => console.log(`Connected to DBI`));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server Started!');
})
