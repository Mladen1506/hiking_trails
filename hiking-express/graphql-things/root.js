const Glupost = require('../models/glupost-model');


// GRAPPHQL RESOLVERS

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    random: () => {
        return Math.random();
    },
    testContext: (args, context) => {
        console.log('testContext(args, context) If context is not provided, the request object is passed as the context.');
        console.log('args');
        console.log(args);
        // If context is not provided, the request object is passed as the context.
        console.log('context');
        console.log(context);
        console.log('context.headers');
        console.log(context.headers);
        return 'We just tested arguments for resolver';
    },
    napraviGlupost: async() => {
        //test if mongdb works 
        const results = await Glupost.create({
            nesto: 'test',
            nesto2: 'test2'
        })
        console.log(results);
        return "MongDb Successful";
    }
};

module.exports = root;