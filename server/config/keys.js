
if (process.env.NODE_ENV === 'production') {
    module.exports = { 
        mongoURI: process.env.DATABASEURL,
        secret: process.env.SECRETKEY
    }
} else {
    module.exports = { 
        mongoURI: "mongodb://localhost:27017/mind-reminder",
        secret: 'yoursecret'
    }
}

// module.exports = { 
//     mongoURI: process.env.DATABASEURL || "mongodb://localhost:27017/mind-reminder",
//     secret: 'yoursecret'
// }