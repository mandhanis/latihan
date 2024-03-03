const jwt = require("jsonwebtoken");
const db = require("../db");

exports.register = (req, res) => {
  const { username, password, email, fullname, address } = req.body;

  db.query(
    "insert into users (username, password, email, fullname, address) values (?, ?, ?, ?, ?)",
    [username, password, email, fullname, address],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "error" });
      } else {
        res.status(200).json({ message: "success", result });
      }
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "select * from users where username = ? and password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "user not found" });
      }
      const user = result[0];

      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        "danis123",
        {
          expiresIn: "1h",
        }
      );
      

      return res.status(200).json({ message: "login success", token });
    }
  );
};
