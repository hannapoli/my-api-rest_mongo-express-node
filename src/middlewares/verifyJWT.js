const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

    const token = req.headers["authorization"]?.split(' ')[1];

    if (!token) {
        const err = new Error("No hay token en la petición.");
        err.status = 403;
        return next(err);
    };
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const userToken = {
            uid: payload.uid,
            name: payload.name,
            role: payload.role
        };

        req.userToken = userToken;
        next();

    } catch (error) {
        error.status = 401;
        return next(err);
    }
}

module.exports = { verifyJWT };