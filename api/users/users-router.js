const express = require("express");
const usermod = require("./users-model");
const postmod = require("../posts/posts-model.js");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {
  validateUserId,
  validatePost,
  validateUser,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  usermod
    .get()
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.arr);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usermod
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usermod
    .update(req.params.id, req.body)
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  usermod
    .remove(req.params.id)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  usermod
    .getUserPosts(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const newPost = {...req.body, user_id: req.params.id}
  postmod
    .insert(newPost)
    .then((post) => res.status(200).json(post))
    .catch(next);
});
// eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res
    .status(err.status || 500)
    .json({ message: err.message, customMessage: "Error with the users!" });
});

// do not forget to export the router

module.exports = router;
