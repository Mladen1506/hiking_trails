const config = {};

config.TOKEN_HEADER_KEY = 'x-hiking-token';
config.JWT_SECRET = 'NEKA_SUPER_TAJNA_STVAR';
config.MONGOOSE_CONNECT_URL = 'mongodb+srv://hiking:test@cluster0.2zjtu.mongodb.net/hiking_db1?retryWrites=true&w=majority';
config.BACKEND_PORT = '3001';


module.exports = config;