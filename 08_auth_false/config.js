const env = process.env.NODE_ENV || "development";

if(env === "development") {
    process.env.DB_URL = 'mongodb://localhost:27017/auth';
}
else if( env === "test" ) {
    process.env.DB_URL = 'mongodb://localhost:27017/test';
}