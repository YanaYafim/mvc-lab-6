const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));

const errorRoutes = require('./routes/error');
app.use('*', errorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});