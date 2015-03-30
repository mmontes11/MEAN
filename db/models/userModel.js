var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;
 
// User schema
var User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});
 
// Bcrypt middleware on UserSchema
User.pre('save', function(next) {
  var user = this;
 
  if (!user.isModified('password')) return next();
 
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
 
    bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});
 
//Password verification
User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

//Define Model
var userModel = mongoose.model('User', User);

//Export Model
exports.userModel = userModel;