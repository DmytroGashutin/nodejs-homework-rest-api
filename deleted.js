// const express = require('express')

// const cors = require('cors')
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs/promises');


// const { router } = require('./app');
// const { nanoid } = require('nanoid');
// const app = express();

// app.use(cors());
// app.use(express.static('public'));
// const tempDir = path.join(__dirname, 'temp');

// const avatars = [];


// const multerConfig = multer.diskStorage({
//     destination: tempDir,
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage:multerConfig,
// })

// const avatarsDir = path.join(__dirname, 'public', 'avatar');

// app.post('/api/contacts', upload.single('cover'), async (req, res) => {
//     try {
        
    
//         const { path: tempUpload, filename } = req.file;
//         const resultUpload = path.join(avatarsDir, filename);
//         await fs.rename(tempUpload, resultUpload);
//         const { title, authors } = req.body;
//         const cover = path.join( 'avatars', filename);
//         const newAvatar = {
//             id: nanoid(),
//             title,
//             authors,
//             cover,
//         }
//         avatars.push(newAvatar);
//         res.status(201).json(newAvatar);
//     } catch (error) {
//         await fs.unlink(req.file.path);
//     }
// })  

// router.get('/api/contacts', async (req, res) => {
//     res.json(contacts)
// })