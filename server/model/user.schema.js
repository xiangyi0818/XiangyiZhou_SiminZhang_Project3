const bcrypt = require('bcryptjs');
const Schema = require('mongoose').Schema;
const userSchema = new Schema({
// mongoose automically gives this an _id attribute of ObjectId
// newsId: String,
username:{ type: String, index: true },
password:String,
// this explicitly declares what collection we're using
}, { collection: 'user',versionKey: false  });

// Save is a MongoDB API, that is called by 'create'
userSchema.pre("save", function(next) {
    // this logic below allows us to protect the password
    // in the case of a user update, but
    // where the password
    if(!this.isModified("password")) {
    return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};
exports.userSchema = userSchema;
