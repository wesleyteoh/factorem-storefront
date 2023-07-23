const pool = require("../../config/database");

async function viewAllOrders(req, res) {
  const { email, userId } = req.body;
  try {
    // Validate payload email with internal email
    const verifyOriginEmail = await pool.query(
      "SELECT user_email FROM accounts WHERE user_email = $1 and user_id=$2",
      [email, userId]
    );
    const match = email === verifyOriginEmail.rows[0].user_email;
    if (match) {
      console.log("verified by db");
      res.json("working");
    } else throw new Error();
  } catch (err) {
    res.status(401).json("invalid request");
  }
}
module.exports = { viewAllOrders };
