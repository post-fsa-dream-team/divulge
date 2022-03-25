const userPostRelationship = (req, res, next) => {
  // if userId === post.userId then approve and move forward...next()
  //else status(403).send('You are not authorized to perform this action');
  next();
};

module.exports = { userPostRelationship };
