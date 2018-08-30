var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  repeatPassword: {
    type: String
  }

});

//hash the password before sending
UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

var User = mongoose.model('User', UserSchema);
module.exports = User;