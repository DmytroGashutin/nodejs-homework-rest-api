const { Schema, model } = require('mongoose');
const Joi = require('joi'); 


const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    
    avatarUrl: {
        type: String,
        required: true,
    },
    
    token: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  
     
}, { versionKey: false, timestamps: true });
 

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
})

const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});


const schemas = {
    registerSchema,
    loginSchema,
}

const User = model('user', userSchema);


module.exports = {
    User,
    schemas,
    verifyEmailSchema,
}