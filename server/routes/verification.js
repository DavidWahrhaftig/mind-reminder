// FORMAT OF TOKEN 
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']; // needs to be 'authorization' and not 'Authorization'

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // Get token 
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        console.log("forbidden 1");
        res.sendStatus(403);
    }
}

module.exports = verifyToken;