const db = require('../db')

exports.createComment = (req, res) => {
    const { photo_id, user_id, comment } = req.body
    db.query(
        'insert into comments (photo_id, user_id, comment, date) values (?, ?, ?, now())',
        [photo_id, user_id, comment],
        (err, result) => {
            if (err) {
                res.status(500).json({error: "error"})
            } else {
                res.status(200).json(result)
            }
        }
    )
}

exports.getCommentByPhotoId = (req, res) =>{
    const photo_id = req.params.photo_id

    db.query(
        'select comments.*, users.username from `comments` INNER JOIN users on comments.user_id = users.user_id where photo_id = ?',
        [photo_id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: 'error'})
            } else {
                res.status(200).json(result)
            }
        }
    )
}

exports.deleteComment = (req, res) => {
    const id = req.params.id

    db.query(
        'delete from comments where id = ?',
        [id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: 'error'})
            } else {
                res.status(200).json(result)
            }
        }
    )
}