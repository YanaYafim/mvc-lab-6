const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3001;

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

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const bookRoutes = require('./routes/book');
app.use('/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
