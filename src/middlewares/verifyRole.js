const verifyRole = (rolDeAcceso) => {
    return (req, res, next) => {
        try {
            const { role, name } = req.userToken;
            // console.log(role, name);
            if (!role || role !== rolDeAcceso) {
                return res.status(403).json({
                    ok: false,
                    message: "Error: el acceso está restringido."
                });
            };
            console.log(`Hola, ${name}, bienvenid@ a la sección de ${role}.`)
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error de verificación del acceso."
            })
        }

    }
}

module.exports = { verifyRole };