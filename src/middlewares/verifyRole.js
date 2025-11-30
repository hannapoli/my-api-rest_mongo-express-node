const verifyRole = (rolDeAcceso) => {
    return (req, res, next) => {
        try {
            const { role, name } = req.userToken;
            if (!role || role !== rolDeAcceso) {
                const err = new Error("Error: el acceso está restringido.");
                err.status = 403;
                throw err;
            };
            console.log(`Hola, ${name}, bienvenid@ a la sección de ${role}.`)
            next();
        } catch (error) {
            next(error);
        }

    }
}

module.exports = { verifyRole };