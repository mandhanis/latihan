const bodyParser = require("body-parser");
const express = require('express');
const cors =  require('cors');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const authControl = require("./controllers/authControl")
const userControl = require('./controllers/userControl');
const photoControl = require('./controllers/photoControl');
const likeControl = require('./controllers/likeControl');
const commentControl = require('./controllers/commentControl');
const albumControl = require('./controllers/albumControl');


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
        
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json())
const upload = multer({ storage: fileStorage, fileFilter: fileFilter })

app.use('/images', express.static(path .join(__dirname, '../images' )))

app.post('/register', authControl.register)
app.post('/login', authControl.login)

app.get('/get/user/:user_id', userControl.getUserById);
app.delete('/del/user/:user_id', userControl.deleteUser);

app.post('/post/photo', upload.single('file_location'), photoControl.createPhoto)
app.get('/get/photos/', photoControl.getPhotos);
app.get('/get/photos/new', photoControl.getPhotoNew);
app.get('/get/photo/:id', photoControl.getPhotoById);
app.get('/get/photo/user/:user_id', photoControl.getPhotoByUserId);
app.get('/get/photo/album/:album_id', photoControl.getPhotoByAlbumId);
app.put('/put/photo/:id', photoControl.putPhoto);
app.delete('/del/photo/:id', photoControl.deletePhoto);

app.get('/check/like/:photoId/:userId', likeControl.checkLike)
app.get('/get/like/:photo_id', likeControl.getLikesByPhoto)
app.post('/post/like/:photo_id', likeControl.createLike)
app.delete('/del/like/:photo_id/:user_id', likeControl.deleteLike)

app.get('/get/comment/:photo_id', commentControl.getCommentByPhotoId);
app.post('/post/comment', commentControl.createComment)
app.delete('/del/comment/:id', commentControl.deleteComment)

app.get('/get/album/:album_id', albumControl.getAlbumById)
app.get('/get/album/user/:user_id', albumControl.getAlbumByUserId)
app.post('/post/album', albumControl.createAlbum)
app.put('/put/album/:album_id', albumControl.editAlbum)
app.delete('/del/album/:album_id', albumControl.deleteAlbum)

app.listen(port, () => {
    console.log('connect');
});