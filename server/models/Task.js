const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    complete: {
        type: Boolean,
        default: false
    },
    dueDate:{
        type:Date,
    }
    // important, taskDate
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema);