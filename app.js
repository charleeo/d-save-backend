const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('./startups/logging')();
require('./startups/config');

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const commentsRoute = require('./routes/comments');
const imageRoute = require('./routes/images');
const gatewayInfo = require('./routes/gateway_info');
const savingsAndInvestments = require('./routes/savings_and_Investments');
const reservedAccountDetails = require("./routes/acount_info");
const forReact = require('./routes/for_react');
const transfer = require('./routes/transfer_routes');
const investmentSummary = require('./routes/investment_summary');
const getBanksCode = require('./routes/get_banks_code');
const withdrawalHistories = require('./routes/withdrawalsHistories')

const app = express();



app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: false}));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

app.use("/posts", postsRoute);
app.use("/disburse", transfer);
app.use("/user", userRoute);
app.use("/comments", commentsRoute);
app.use("/images", imageRoute);
app.use('/gateway',gatewayInfo);
app.use('/savings-investments',  savingsAndInvestments);
app.use('/reserved-account', reservedAccountDetails);
app.use('/invest', investmentSummary);
app.use('/banks',getBanksCode)
app.use('/keys',forReact);
app.use('/withdrawals', withdrawalHistories)
module.exports = app;
