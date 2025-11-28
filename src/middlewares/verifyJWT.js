const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

    const token = req.headers["authorization"]?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            ok: false,
            message: "No hay token en la petición."
        })
    };
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const userToken = {
            uid: payload.uid,
            name: payload.name,
            role: payload.role
        };

        req.userToken = userToken;

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            message: "Error: token no válido."
        })
    }

    next();
}

module.exports = { verifyJWT };