const postsRoute = require('../routes/posts');
const userRoute = require('../routes/user');
const commentsRoute = require('../routes/comments');
const imageRoute = require('../routes/images');
const gatewayRoute = require('../routes/acount_info');

module.exports= function(app){
  app.use("/posts", postsRoute);
  app.use("/user", userRoute);
  app.use("/comments", commentsRoute);
  app.use("/images", imageRoute);
  app.use('/gateway',gatewayRoute)
}