const pool = require("../../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// require("dotenv").config();

async function getUsers(req, res) {
  try {
    // Execute the raw SQL query
    const { rows } = await pool.query("SELECT * FROM accounts");
    console.log("rows", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM accounts WHERE user_email = $1",
      [email]
    );
    console.log(user.rows);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO accounts(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const token = createJWT(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
function createJWT(user_id) {
  return jwt.sign({ user_id }, process.env.SECRET, {
    expiresIn: "24h",
  });
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM accounts WHERE user_email = $1",
      [email]
    );
    if (user.rows.length === 0) {
      throw new Error();
    }
    const match = await bcrypt.compare(password, user.rows[0].user_password);
    if (!match) {
      throw new Error();
    }
    const token = createJWT(user.rows[0].user_password);
    res.json({ token });
  } catch (err) {
    res.status(400).json("Incorrect email or password");
    console.log(err);
  }
};

module.exports = { getUsers, create, login };
