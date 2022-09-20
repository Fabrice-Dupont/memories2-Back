const router = require('express').Router()

const postRouter = require('./posts.routes')
const creatorRouter = require('./creator.routes')

router.use('/posts', postRouter)
router.use('/creator', creatorRouter)

module.exports = router
