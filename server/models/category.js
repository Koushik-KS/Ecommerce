const { default: mongoose } = require('mongoose');
const mangoose=require('mongoose');
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    images:[
        {
        type:String,
        require:true
        }
    ],
    color:{
        type:String,
        require:true
    }
})

exports.Category=mongoose.model('Category',categorySchema);