const { default: mongoose } = require("mongoose")
const mongoos = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connection is successful");
    })
    .catch((err) => {
        console.log("Database connection is failed! " + err);
    })