const pool = require("../../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    // res.json(user.rows);
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      // `INSERT INTO accounts(user_name,user_email,user_password) VALUES (${name},${email},${bcryptPassword}) RETURNING *`
      "INSERT INTO accounts(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );

    res.json(newUser);
    // await User.create(req.body);
    // const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    // await Account.create({ user: user._id });
    // const token = createJWT(user);
    // res.status(201).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = { getUsers, create };
