function envSetup() {
    const env = process.env.NODE_ENV || 'development';

    if(env === 'test') {
        process.env.DB_URL = 'mongodb://localhost:27017/test';
    }
    else if(env === 'development') {
        process.env.DB_URL = 'mongodb://localhost:27017/test';
    }
}

module.exports = {envSetup};