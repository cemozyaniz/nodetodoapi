const mongoose = require("mongoose")

const todoScheme = new mongoose.Schema({
    name : {
        type: String,
        requried: true,
        trim : true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    isComplete : {
        type: Boolean,
        default: false
    }
},
{
    collection: "Todo", timestapms: true
}
)
const todo = mongoose.model("Todo", todoScheme)

module.exports = todo