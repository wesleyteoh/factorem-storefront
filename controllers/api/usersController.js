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
    // const newUser = await pool.query(
    await pool.query(
      "INSERT INTO accounts(user_name,user_email,user_password,user_date_created) VALUES ($1,$2,$3,now()) RETURNING *",
      [name, email, bcryptPassword]
    );
    await pool.query(
      "INSERT INTO account_details(account,user_contact) VALUES ((SELECT user_id FROM accounts WHERE user_email = $1),$2)",
      [email, contact]
    );
    // Generate JWT token
    const returnUser = await pool.query(
      "SELECT user_id,user_name,user_image,user_type,user_email FROM accounts WHERE user_email = $1",
      [email]
    );
    const token = createJWT(returnUser.rows[0]);
    const userId = returnUser.rows[0].user_id;
    console.log("user_id", userId);
    let getCart = await pool.query(
      "SELECT * FROM orders WHERE order_paid=false and buyer_id=$1",
      [userId]
    );
    if (getCart.rows[0] == null) {
      console.log("no cart found, creating new cart");
      getCart = await pool.query(
        "INSERT INTO orders(order_date_created,buyer_id,order_status,order_paid) VALUES(now(),(SELECT user_id FROM accounts WHERE user_id = $1),(SELECT shipping_category_id FROM shipping_category where shipping_type = 'Order Placed'),FALSE )  RETURNING *",
        [userId]
      );
    }
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
      "SELECT user_id,user_name,user_image,user_type,user_email FROM accounts WHERE user_email = $1",
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
    const { user_email, user_id } = req.body;
    if (user_email == null) {
      throw new Error();
    }
    const details = await pool.query(
      "SELECT * FROM account_details WHERE account =$1",
      [user_id]
    );
    const verifyOriginEmail = await pool.query(
      "SELECT user_email FROM accounts WHERE user_email=$1",
      [user_email]
    );
    // To verify incoming email and id matches with db
    if (verifyOriginEmail.rows[0].user_email === user_email) {
      res.json(details.rows[0]);
    } else {
      res.status(401).json("unverified");
    }
  } catch (err) {
    res.status(401).json("Bad response");
    console.log(err);
  }
};

const updateAccountDetails = async (req, res) => {
  try {
    const {
      payloadAccount,
      payloadContact,
      payloadAddress1,
      payloadAddress2,
      payloadCity,
      payloadCountry,
      payloadPostal,
    } = req.body;

    // const updated =
    await pool.query(
      `UPDATE account_details 
      SET user_address_line1 = $2,
      user_address_line2 = $3,
      user_city = $4,
      user_country= $5,
      user_postal_code = $6,
      user_contact = $7
      WHERE account =$1`,
      [
        payloadAccount,
        payloadAddress1,
        payloadAddress2,
        payloadCity,
        payloadCountry,
        payloadPostal,
        payloadContact,
      ]
    );
    res.json("updated");
  } catch (err) {
    res.json(err);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { user_id, email, confirm, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM accounts WHERE user_email = $1 AND user_id=$2",
      [email, user_id]
    );
    if (user.rows.length === 0) {
      throw new Error();
    }
    const match = await bcrypt.compare(confirm, user.rows[0].user_password);
    if (!match) {
      throw new Error();
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const bcryptPassword = await bcrypt.hash(password, salt);
    await pool.query(
      "UPDATE accounts SET user_password=$1 WHERE user_email = $2 AND user_id=$3",
      [bcryptPassword, email, user_id]
    );
    res.json("password updated");
    // console.log("user", user);
  } catch (err) {
    res.status(400).json("Incorrect email or password");
  }
};

module.exports = {
  getUsers,
  create,
  login,
  checkToken,
  getAccountDetails,
  updateAccountDetails,
  updatePassword,
};
