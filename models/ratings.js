var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    name : String,
    rating:{
        type:Number,
        default:0
    },
    created : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Rating', ratingSchema);
