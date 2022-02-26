const jwt = require("jsonwebtoken");
const { resourceLimits } = require("worker_threads");
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');
const AuthSession = require('../models/auth-session-model');


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
            await AuthSession.create({
                user_id: user_id,
                token: token
            });
            // return token;
            return token;
        } else {
            return 'Error: User with these credentials does not exists!'
        }
    },
    myUserData: async(args, context) => {
        console.log('myUserData resolver');
        console.log('args');
        console.log(args);
        const token = args.token;
        console.log(token);
        const session = await AuthSession.findOne({
            token: token
        });
        console.log(session);
        if (session.user_id) {
            const user_id = session.user_id;
            const user = await User.findOne({
                _id: user_id,
            });
            console.log(user);
            if (user && user._id && user.username) {
                return {
                    _id: user._id,
                    is_success: true,
                    username: user.username,
                };
            }

        }
    },
};

module.exports = root;