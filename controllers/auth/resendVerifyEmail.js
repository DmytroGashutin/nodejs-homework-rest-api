const { RequestError,sendEmail } = require('../../helpers');
const { User } = require('../../models/user');


const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(404, 'Not found');
    }
    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    };
    const mail = {
        to: email,
        subject: "Confirmation of registration",
        html: `<a href='https://localhost:5656/api/auth/verify/${verificationToken}' target = "_blank">Confirm registration<a/>`
    };
    await sendEmail(mail);
    res.json({
        message:"Verification email sent"
    })
}

module.exports = resendVerifyEmail;