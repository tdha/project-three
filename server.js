const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users')); // Put API routes here, before the 'catch all' route

app.get('/*', function (req, res) { // respond to paths we don't recognise by sending the React index.html
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express running on http:/localhost:${ port}`);
});