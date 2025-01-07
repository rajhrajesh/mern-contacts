const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: [true, 'Add a username']
    },
    email: {
        type: 'string',
        required: true,
        unique: [true, 'Add a email']
    },
    password: {
        type: 'string',
        required: [true, 'Add a password']
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);