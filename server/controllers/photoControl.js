const db = require('../db');

exports.createPhoto = (req, res) => {
    const { title, caption, album_id, user_id} = req.body
    const file_location = req.file.path
    db.query(
        'insert into photos (title, caption, post_date, file_location, album_id, user_id) values (?, ?, now(), ?, ?, ?)',
        [title, caption, file_location, album_id, user_id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json({message: "success", result});
                
            }
        }
    )
};

exports.getPhotos = (req, res) => {
    db.query(
        'select * from photos',
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json(result);
                
            }
        }
    )
}

exports.getPhotoById = (req, res) => {
    const id = req.params.id;

    db.query(
        'select photos.*, users.username from photos inner join users on photos.user_id = users.user_id where photos.id = ?',
        [id],
        ((err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json(result[0]);
                
            }
        })
    )
}

exports.getPhotoNew= (req, res) => {

    db.query(
        'select photos.*, users.username from photos INNER JOIN users on photos.user_id = users.user_id order by photos.id desc',
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json(result);
                
            }
        }
    )
}

exports.getPhotoByUserId = (req, res) => {
    const user_id = req.params.user_id;

    db.query(
        'select * from photos where user_id = ?',
        [user_id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json(result);
                
            }
        }
    )
}
exports.getPhotoByAlbumId = (req, res) => {
    const album_id = req.params.album_id;

    db.query(
        'select * from photos where album_id = ?',
        [album_id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json(result);
                
            }
        }
    )
}

exports.putPhoto = (req, res) => {
    const id = req.params.id;
    const { title, caption, post_date, file_location, album_id, user_id} = req.body;

    db.query(
        'update photos set title = ?, caption = ?, post_date = ?, file_location = ?, album_id = ?, user_id = ? where id = ?',
        [title, caption, post_date, file_location, album_id, user_id, id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"});
            } else {
                res.status(200).json({message: "success", result});
                
            }
        }
    )
}

exports.deletePhoto = (req, res) => {
    const id = req.params.id;

    db.query(
        'delete from photos where id = ?',
        [id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: 'error'})
            } else {
                res.status(200).json({result})
            }
        }
    )
}
