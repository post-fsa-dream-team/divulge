//api entry
const router = require("express").Router();

//routers go after this line





//routers go before this line

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
