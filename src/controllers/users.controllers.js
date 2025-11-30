const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { JWTgenerator } = require("../utils/jwt");

const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existeUsuario = await User.findOne({ email });
        if (existeUsuario) {
            const err = new Error("El usuario ya existe.");
            err.status = 400;
            throw err;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usuarioNuevo = {
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        }

        const usuarioGuardado = await User.create(usuarioNuevo);

        const payload = {
            uid: usuarioGuardado._id,
            name: usuarioGuardado.name,
            role: usuarioGuardado.role
        }

        const token = await JWTgenerator(payload);

        return res.status(201).json({
            ok: true,
            message: "Usuario creado correctamente.",
            user: usuarioGuardado,
            token: token
        })
    } catch (err) {
        next(err)
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email })
        if (!usuario) {
            const err = new Error("No hay usuario con este email.");
            err.status = 400;
            throw err;
        };
        const passwordOk = await bcrypt.compare(password, usuario.password);
        if (!passwordOk) {
            const err = new Error("La contraseña no es válida.");
            err.status = 401;
            throw err;
        }

        const payload = {
            uid: usuario._id,
            name: usuario.name,
            role: usuario.role
        }

        const token = await JWTgenerator(payload);

        const user = {
            uid: usuario._id,
            name: usuario.name,
            email: email
        }
        return res.status(200).json({
            ok: true,
            message: "Login de usuario.",
            user: user,
            token: token
        })
    } catch (err) {
        next(err);
    }
};

const renewToken = async (req, res, next) => {
    try {
        const { uid, name, role } = req.userToken;

        const payload = {
            uid,
            name,
            role
        }

        const token = await JWTgenerator(payload);

        const usuario = await User.findById(uid);

        return res.status(200).json({
            ok: true,
            message: 'El token está renovado.',
            user: {
                uid: usuario._id,
                name: usuario.name,
                role: usuario.role
            },
            token
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { createUser, loginUser, renewToken };