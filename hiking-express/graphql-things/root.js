const jwt = require("jsonwebtoken");
const { resourceLimits } = require("worker_threads");
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');
const AuthSession = require('../models/auth-session-model');
const Tour = require('../models/tour-model');
const Review = require('../models/review-model');


//HELPERS

const JWT_SECRET = 'NEKA_SUPER_TAJNA_STVAR';

const tokenCreate = (user_id) => {
    const token = jwt.sign({ user_id: user_id },
        JWT_SECRET
    );
    return token;
};

const checkIsLoggedIn = async(token) => {
    console.log('checkIsLoggedIn helper');
    console.log(token);
    let is_logged_in = false;
    let user_id = null;
    const session = await AuthSession.findOne({
        token: token
    });
    console.log(session);
    if (session.user_id) {
        user_id = session.user_id;
        is_logged_in = true;
    }
    return {
        is_logged_in,
        user_id
    };
}



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

    authLogout: async(args, context) => {
        console.log('authLogout resolver');
        // console.log('args');
        // console.log(args);
        // const token = args.token;
        // console.log(token);
        const req = context;

        const token = req.headers['x-hiking-token'];

        // const token = args.token;
        console.log(token);

        await AuthSession.findOneAndDelete({
            token: token
        });
        return true;
    },




    myUserData: async(args, context) => {
        console.log('myUserData resolver');
        console.log('args');
        console.log(args);
        // console.log('context');
        // console.log(context);
        const req = context;
        console.log(req.headers);

        const token = req.headers['x-hiking-token'];

        // const token = args.token;
        console.log(token);

        // const session = await AuthSession.findOne({
        //     token: token
        // });
        // console.log(session);

        const auth = await checkIsLoggedIn(token);
        if (auth.is_logged_in) {
            const user_id = auth.user_id;
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
    tourCreate: async(args, context) => {
        console.log('tourCreate resolver');
        console.log('args');
        console.log(args);
        const req = context;
        const token = req.headers['x-hiking-token'];
        console.log(token);
        const auth = await checkIsLoggedIn(token);
        if (auth.is_logged_in) {
            const user_id = auth.user_id;

            const results = await Tour.create({
                user_id: user_id,
                name: args.name,
                description: args.description,
                date: args.date,
                difficulty: args.difficulty,
                trail_length: args.trail_length,
                max_participants: args.max_participants
            });
            console.log(results);
            return true;
        } else {
            // if not logged in can not create our
            return false;
        }
    },

    tourGetAll: async(args, context) => {
        console.log('tour getAll resolver');
        const results = await Tour.find({});
        return results;
    },
    reviewCreate: async(args, context) => {
        console.log('reviewCreate resolver');
        console.log('args');
        console.log(args);
        const req = context;
        const token = req.headers['x-hiking-token'];
        console.log(token);
        const auth = await checkIsLoggedIn(token);
        if (auth.is_logged_in) {
            const user_id = auth.user_id;

            const results = await Review.create({
                user_id: user_id,
                tour_id: args.tour_id,
                rating: args.rating,
                text: args.text
            });
            console.log(results);
            return true;
        } else {
            // if not logged in can not create our
            return false;
        }
    },
    reviewGetAll: async(args, context) => {
        console.log('review getAll resolver');
        const results = await Review.find({});
        return results;
    },

};

module.exports = root;