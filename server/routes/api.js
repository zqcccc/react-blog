const router = require('koa-router')()
const jwt = require('koa-jwt')
const CONFIG = require('../config')
const controller = require('../controller')

const verify = jwt({secret: CONFIG.secret})

router.prefix('/api')

router
  .get('/article', controller.article.getList)
  .get('/article/:id', controller.article.getArt)
  .post('/article', controller.article.postArt)
  .put('/article/:id', controller.article.putArt)
  .delete('/article/:id', controller.article.deleteArt)

  .get('/tag', controller.tag.getTags)
  .post('/tag', controller.tag.postTag)
  .put('/tag/:id', controller.tag.putTag)
  .delete('/tag/:id', controller.tag.deleteTag)

  .get('/comment', controller.comment.getAllComments)
  .get('/comment/:id', controller.comment.getComments)
  .post('/comment', controller.comment.postComment)
  .delete('/comment/:id', verify, controller.comment.deleteComment)

  .post('/register', controller.user.register)
  .post('/login', controller.user.login)

  .get('/test', controller.article.test)

module.exports = router
