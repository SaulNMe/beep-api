const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let beepSchema = new Schema({
    username:  {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    userId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Beep', beepSchema);