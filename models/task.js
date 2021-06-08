const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    date:{
        type: Date,
        required:true,
        default: Date.now
    },
    completed:{
        type: Boolean,
        required:true,
        default:false
    }

})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task