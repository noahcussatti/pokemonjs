var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});


// db connection event
mongoose.connection.once("open", function (cb) {
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});


module.exports = mongoose;