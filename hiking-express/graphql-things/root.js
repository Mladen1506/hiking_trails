const jwt = require("jsonwebtoken");
const { resourceLimits } = require("worker_threads");
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');


//HELPERS

const JWT_SECRET = 'NEKA_SUPER_TAJNA_STVAR';

const tokenCreate = (user_id) => {
    const token = jwt.sign({ user_id: user_id },
        JWT_SECRET
    );
    return token;
};

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
    },
    authLogin: async(args, context) => {
        console.log('authLogin resolver');
        console.log('args');
        console.log(args);
        // first check, does in db users exists user with same username and password
        const results = await User.findOne({
            username: args.username,
            password: args.password
        });
        console.log(results);
        if (results && results._id) {
            const user_id = results._id;
            console.log('user_id', user_id);
            const token = tokenCreate(user_id);
            console.log('token', token);
            // return token;
            return token;
        } else {
            return 'Error: User with these credentials does not exists!'
        }
    },
};

module.exports = root;