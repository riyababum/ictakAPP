const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema=new Schema({
    batchName:{
        type:String,
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        required:true
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    owner:{
        type:Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("batches", batchSchema);