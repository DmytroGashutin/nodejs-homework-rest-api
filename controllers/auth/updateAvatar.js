const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');


const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    try {
        const { path: tempUpload, filename } = req.file;
        const { _id } = req.user;
        const [extention] = filename.split(".").reverse();
        const avatarName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const avatarImage = await Jimp.read(resultUpload);
        await avatarImage.resize(250, 250).write(resultUpload);
        // await avatarImage.write(resultUpload);
        const avatarUrl = path.join("avatars", resultUpload);
        await User.findByIdAndUpdate(_id, { avatarUrl });
        res.json({
            avatarUrl,
        })

    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}


module.exports = updateAvatar;