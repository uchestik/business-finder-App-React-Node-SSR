var mongoose = require('mongoose');

var businessSchema = new mongoose.Schema({
    name : String,
    description : String,
    zipcode : {
        type : Number
        // required: true,
    },
    ratings:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        },
        name : String,
        rating:{
            type:Number,
            default:0,
            min:0,
            max:5
        },
        created : {type : Date, default : Date.now}
    }],
    created : {type : Date, default : Date.now}
});

module.exports = mongoose.model('business', businessSchema);