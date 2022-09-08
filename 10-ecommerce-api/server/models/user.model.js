const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator"); //for validation
const bcrypt = require("bcryptjs"); //for hashing passwords

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLengt: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//hashing password
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));

  //if we are modifying the password, then only hash it otherwise just return
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//comparing passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

/* //**For email validation, we can either use match option or define mongoose custom validators

--> using match option (email regex)
email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email']
},

--> custom validation 
    validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email'
    }

    for custom validation, we use validate property, which further has validator and message
    --> the validator takes a func, and based on that func returns the message
    --> here we are using validator(a npm package) to create email vaidation
*/

/* //**Check if email already exist
--> one by setting `unique: true` in defining Schema
--> other in controller 
*/
