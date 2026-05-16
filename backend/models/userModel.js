const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rooms: {
        type: [{type: String}]
    }
});



userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    const saltRounds = 2;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
})

module.exports = mongoose.model('Users', userSchema)