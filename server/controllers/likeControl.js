    const db = require('../db');

    exports.createLike = (req, res) => {
        const photo_id = req.params.photo_id;
        const { user_id } = req.body
        
        db.query(
            'insert into likes (photo_id, user_id, date) values (?, ?, now())',
            [photo_id, user_id],
            (err, result) => {
                if (err) {
                    res.status(500).json({error: "error"})
                } else {
                    res.status(200).json(result)
                }
            }
        )
    }

    exports.getLikesByPhoto = (req, res) => {
        const photo_id = req.params.photo_id

        db.query('select * from likes where photo_id = ?',
            [photo_id],
            (err, result) =>{
                if (err) {
                    res.status(500).json({error: "error"})
                } else {
                    res.status(200).json(result)
                }
            }
        )
    } 

    exports.checkLike = (req, res) => {
        const { photoId, userId } = req.params;
    
        db.query(
            'SELECT COUNT(*) AS count FROM likes WHERE photo_id = ? AND user_id = ?',
            [photoId, userId],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    const count = result[0].count;
                    res.status(200).json({ liked: count > 0 });
                }
            }
        );
    };
    
    exports.deleteLike = (req, res) => {
        const { photoId, userId } = req.params;
    
        db.query(
            'DELETE FROM likes WHERE photo_id = ? AND user_id = ?',
            [photoId, userId],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({ error: "Like not found" });
                    } else {
                        res.status(200).json({ result });
                    }
                }
            }
        );
    };