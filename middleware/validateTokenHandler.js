const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401);
            throw new Error("Token is required");
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Could not verify token");
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Authorization header is missing or invalid");
    }
});

module.exports = validateToken;