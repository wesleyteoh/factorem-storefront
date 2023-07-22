// module.exports = function (req, res, next) {
//   if (!req.user) return res.status(401).json("Unauthorized");
//   // protect PUT/DELETE requests for routes that use params.userId, locked to JWT
//   if (req.params.userId && req.method !== "GET") {
//     if (req.user._id !== req.params.userId)
//       return res.status(401).json("Unauthorized");
//   }

//   next();
// };
module.exports = function (req, res, next) {
  console.log(req.body);
  // if (!req.user) return res.status(401).json("Unauthorized");
  if (!req.body.user) return res.status(401).json("Unauthorized");
  next();
};
