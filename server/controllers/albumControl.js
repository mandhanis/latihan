const db = require("../db");

exports.createAlbum = (req, res) => {
  const { album_name, desc, user_id } = req.body;

  db.query(
    "insert into albums(album_name, `desc`, create_date, user_id) values (?, ?, NOW(), ?)",
    [album_name, desc, user_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.editAlbum = (req, res) => {
  const album_id = req.params.album_id;
  const { album_name, desc, create_date, user_id } = req.body;

  db.query(
    "update albums set album_name = ?, `desc` = ?, create_date = ?, user_id = ? where album_id = ?",
    [album_name, desc, create_date, user_id, album_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.getAlbumByUserId = (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "select * from albums where user_id = ?",
    [user_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.getAlbumById = (req, res) => {
  const album_id = req.params.album_id;

  db.query(
    "select * from albums where album_id = ?",
    [album_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result[0]);
      }
    }
  );
};

exports.deleteAlbum = (req, res) => {
  const album_id = req.params.album_id;

  db.query(
    "delete from albums where album_id = ?",
    [album_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    }
  );
};
