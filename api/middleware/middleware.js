const user = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toString()}] ${req.method} to ${req.url} from ${req.get("host")}`
  )
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("Checking ID")
  const { id } = req.params
  user.getById(id)
  .then(user => {
    if (user) {  
      req.arr = user
      next()
    } else {
      next({ status: 404, message: "user not found" })
    }
  })
  .catch(next)

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
 if (!name) {
   next({ status: 400, message: 'missing required name field'})
 } else {
   next()
 }

}

function validatePost(req, res, next) {
// DO YOUR MAGIC
const { text } = req.body
if (!text) {
  next({ status: 400 , message: "missing text field" })
} else {
  next()
}
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost }
