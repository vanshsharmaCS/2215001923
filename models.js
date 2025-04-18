const mongoose = require('mongoose');
const { Schema } = mongoose;
//  make user list database
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
const User = mongoose.model('User', userSchema);


