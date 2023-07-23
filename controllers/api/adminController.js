const pool = require("../../config/database");

async function viewAllOrders(req, res) {
  const { email, userId } = req.body;
  // Validate payload email with internal email
  const verifyOriginEmail = await pool.query(
    "SELECT user_email FROM accounts WHERE user_email = $1 and user_id=$2",
    [email, userId]
  );
  if (verifyOriginEmail) {
    console.log("verified by db");
  }
}
module.exports = { viewAllOrders };
