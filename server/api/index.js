//api entry
const router = require("express").Router();

//routers go after this line
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

//routers go before this line

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
