const mongoose = require('mongoose');
const goalScheme = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        reqired:true
    },


    text:{
        type:String,
        required:[true,'Please add a name']
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model('Goal',goalScheme);