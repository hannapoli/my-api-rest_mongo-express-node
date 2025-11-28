const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { JWTgenerator } = require("../utils/jwt");

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existeUsuario = await User.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                message: "El usuario ya existe."
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const usuarioNuevo = {
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        }

        const usuario = new User(usuarioNuevo);
        const usuarioGuardado = await usuario.save();

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
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                message: "El usuario ya existe."
            });
        }
        return res.status(500).json({
            ok: false,
            message: "Error, no se ha podido crear el usuario. Consulte su administrador."
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email })
        if (!usuario) {
            res.status(400).json({
                ok: false,
                message: 'No hay usuario con ese email.',
            })
        };
        const passwordOk = bcrypt.compareSync(password, usuario.password);
        if (!passwordOk) {
            return res.status(401).json({
                ok: false,
                message: 'La contraseña no es válida',
            })
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error, no se ha podido crear el usuario. Consulte su administrador."
        });
    }
};

const renewToken = async (req, res) => {
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

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error: no se ha podido renovar el token. Consulte su administrador."
        });
    }
};

module.exports = { createUser, loginUser, renewToken };