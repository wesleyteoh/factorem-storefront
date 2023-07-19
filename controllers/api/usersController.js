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
    // Destructure req,body
    const { name, email, password, contact } = req.body;
    // Check if user exists
    const user = await pool.query(
      "SELECT * FROM accounts WHERE user_email = $1",
      [email]
    );
    console.log(user.rows);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }
    // Bcrypt userpassword
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const bcryptPassword = await bcrypt.hash(password, salt);
    // Entering new user into db
    const newUser = await pool.query(
      "INSERT INTO accounts(user_name,user_email,user_password,user_date_created) VALUES ($1,$2,$3,now()) RETURNING *",
      [name, email, bcryptPassword]
    );
    await pool.query(
      "INSERT INTO account_details(account,user_contact) VALUES ((SELECT user_id FROM accounts WHERE user_email = $1),$2)",
      [email, contact]
    );
    // Generate JWT token
    const returnUser = await pool.query(
      "SELECT user_id,user_name,user_image,user_type FROM accounts WHERE user_email = $1",
      [email]
    );
    const token = createJWT(returnUser.rows[0]);
    // const token = createJWT(newUser.rows[0].user_id);
    res.json(token);
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
    console.log("loginUser", user.rows[0]);
    const returnUser = await pool.query(
      "SELECT user_id,user_name,user_image,user_type FROM accounts WHERE user_email = $1",
      [email]
    );
    const token = createJWT(returnUser.rows[0]);
    res.json(token);
  } catch (err) {
    res.status(400).json("Incorrect email or password");
    console.log(err);
  }
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

const getAccountDetails = async (req, res) => {
  try {
    const { email, user_id } = req.body;
    if (email == null) {
      throw new Error();
    }
    const details = await pool.query(
      "SELECT * FROM account_details WHERE account =$1",
      [user_id]
    );
    const verifyOriginEmail = await pool.query(
      "SELECT user_email FROM accounts WHERE user_email=$1",
      [email]
    );
    // To verify incoming email and id matches with db
    if (verifyOriginEmail.rows[0].user_email === email) {
      res.json(details.rows[0]);
    } else {
      res.status(401).json("unverified");
    }
  } catch (err) {
    res.status(401).json("Bad response");
    console.log(err);
  }
};

module.exports = { getUsers, create, login, checkToken, getAccountDetails };
