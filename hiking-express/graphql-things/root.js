const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');


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
        // If context is not provided, the request object is passed as the context.
        console.log('context');
        console.log(context);
        console.log('context.headers');
        console.log(context.headers);
        console.log('args');
        console.log(args);
        return 'We just tested arguments for resolver';
    },
    napraviGlupost: async() => {
        //test if mongdb works 
        const results = await Glupost.create({
            nesto: 'test',
            nesto2: 'test2'
        });
        console.log(results);
        return "MongDb Successful";
    },
    authRegister: async(args, context) => {
        console.log('authRegister resolver')
        console.log('args');
        console.log(args);
        // args accepted
        //test if mongdb works 
        if (args.password === args.password2) {
            const results = await User.create({
                username: args.username,
                password: args.password
            });

            console.log(results); // results retutned by mongodb

            return 'Returning response from authRegister'
        } else {
            return 'Error: Password must match!'
        }
    }
};

module.exports = root;