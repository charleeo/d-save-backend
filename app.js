const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('./startups/logging')();
require('./startups/config');

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const commentsRoute = require('./routes/comments');
const imageRoute = require('./routes/images');
const gatewayRoute = require('./routes/acount_info');
const app = express();



app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: false}));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/comments", commentsRoute);
app.use("/images", imageRoute);
app.use('/gateway',gatewayRoute)
module.exports = app;
