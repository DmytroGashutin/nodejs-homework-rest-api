const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');


const { User } = require('../../models/user');

const { RequestError, sendEmail } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ email, password: hashPassword, avatarUrl,verificationToken });
    const mail = {
        to: email,
        subject: "Confirmation of registration",
        html: `<a href='https://localhost:5656/api/auth/verify/${verificationToken}' target = "_blank">Confirm registration<a/>`
    };
    await sendEmail(mail)
    res.status(201).json({
        email: result.email,
        
    })
}



module.exports = register;