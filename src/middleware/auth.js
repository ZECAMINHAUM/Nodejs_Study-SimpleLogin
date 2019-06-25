const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        req.tokendois = req.headers['authorization'];
        next();
    }else{
        return res.json(403).res({ success: false });
    }
}

module.exports = verifyToken;