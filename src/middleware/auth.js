// Middleware for authenticating JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

const authenticateTokenSocket = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (token == null) return next(new Error("Authentication error"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(new Error("Authentication error"));

        socket.user = user;
        console.log("Socket authenticated", socket.id, socket.user);
        next();
    });
}

// Path: middleware\auth.js
module.exports = { authenticateToken, authenticateTokenSocket };
