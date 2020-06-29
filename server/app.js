const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(express.urlencoded({
    extended: false
}));
// Json Body Middleware
app.use(express.json());
app.use(cors());
// Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

// Bring in the Database Config
const db = require('./config/keys').mongoURI;
// Run this for development "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
mongoose.connect(db, 
    {   
        useFindAndModify: false,
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log(`Database connected successfully ${db}`);
    }).catch((err) => {
        console.log(`Unable to connect with the database ${err}`)
    });


// app.get("/", (req, res) => {
//     res.send("<h1>Hello from the otherside</h1>")
// });

// Bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users);

// Bring in the Reminders route
const reminders = require('./routes/api/reminders');
app.use('/api/reminders', reminders);

// Bring in the Reviews route
const reviews = require('./routes/api/reviews');
app.use('/api/reviews', reviews);

app.get('*', (req, res) => {
    console.log(path.join(__dirname, 'public/index.html'));
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// // Handle production 
// if(process.env.NODE_ENV === 'production') {
//     // Static folder 
//     app.use(express.static(__dirname + '/public'));

//     // Handle Single Page Application
//     app.get(/.*/, (req, res) => {
//         res.sendFile(__dirname + '/public/index.html');
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));