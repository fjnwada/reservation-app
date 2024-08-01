const mongoose = require('mongoose');
// const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type : String, 
        require: true, 
        max:(60, 'ユーザー名は最大60文字まで')
    },
    email: {
        type : String,
        require: true,
        lowercase: true,
        unique: true,
        max:(60, '最大60文字まで')
    },
    password: {
        type : String,
        require: true,
        min:(6, '6文字以上で入力してください。'),
        max:(60, '最大60文字まで')
    },
});

UserSchema.methods.hashSamePassword = function(inputpassword){
    const user = this
    return bcrypt.compareSync(inputpassword, user.password)
}

UserSchema.pre('save', function(next){
    const user = this
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash
            next()
        });
    });
})

module.exports = mongoose.model('User', UserSchema)
