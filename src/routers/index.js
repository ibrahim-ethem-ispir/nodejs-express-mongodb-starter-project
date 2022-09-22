const router = require("express").Router()

const auth = require("./auth.routes")

router.use(auth)


module.exports = router