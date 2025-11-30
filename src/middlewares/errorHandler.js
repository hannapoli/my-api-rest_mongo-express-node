const errorHandler = (err, req, res, next) => {
    console.log(err);
     if (err.code === 11000) {
            return res.status(400).json({
                ok: false,
                message: "El registro ya existe."
            });
        };

        if (err.status) {
            return res.status(err.status).json({
                ok: false,
                message: err.message
            })
        };

        return res.status(500).json({
            ok: false,
            message: "Error del servidor. Consulte su administrador."
        });
}

module.exports = { errorHandler };