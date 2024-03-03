const db = require('../db');

exports.getUserById = (req, res) => {
    const user_id = req.params.user_id;

    db.query(
        'select * from users where user_id = ?',
        [user_id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: 'error'})
            } else {
                res.status(200).json(result[0])
            }
        }
    )
}

exports.deleteUser = (req, res) => {
    const user_id = req.params.user_id;

    db.query(
        'delete from users where user_id = ?',
        [user_id],
        (err, result) => {
            if (err) {
                res.status(500).json({error: 'error'})
            } else {
                res.status(200).json({result})
            }
        }
    )
}