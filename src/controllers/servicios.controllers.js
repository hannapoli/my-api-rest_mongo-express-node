const Servicio = require("../models/Servicio.model");

//Crear servicio:
const createService = async (req, res, next) => {
    try {
        const { nombre } = (req.body);
        const existe = await Servicio.findOne({ nombre });
        if (existe) {
            const err = new Error("El nombre del servicio ya existe.");
            err.status = 400;
            throw err;
        }
        const nuevoServicio = new Servicio(req.body);
        const servicioGuardado = await nuevoServicio.save();
        return res.status(201).json({
            ok: true,
            message: "Servicio creado correctamente.",
            data: servicioGuardado
        })
    } catch (err) {
        next(err);
    }
}

//Obtener todos los servicios:
const getAllServices = async (req, res, next) => {
    try {
        const servicios = await Servicio.find();
        if (servicios.length === 0) {
            return res.status(200).json({
                ok: true,
                message: "No hay ningún servicio registrado.",
                data: []
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Lista de servicios",
            data: servicios
        });
    } catch (err) {
        next(err);
    }
}

//Obtener un servicio por ID:
const getServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findById(id);
        if (!servicio) {
            const err = new Error("Servicio no encontrado.");
            err.status = 404;
            throw err;
        }
        return res.status(200).json({
            ok: true,
            message: "Servicio encontrado.",
            data: servicio
        });
    } catch (err) {
        next(err);
    }
}

//Actualizar un servicio por ID:
const modifyServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!servicio) {
            const err = new Error("Servicio no encontrado.");
            err.status = 404;
            throw err;
        }
        return res.status(200).json({
            ok: true,
            message: "Servicio actualizado correctamente",
            data: servicio
        });
    } catch (err) {
        next(err);
    }
}
//Eliminar un servicio por ID:
const deleteServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByIdAndDelete(id);
        if (!servicio) {
            const err = new Error("Servicio no encontrado.");
            err.status = 404;
            throw err;
        }
        return res.status(200).json({
            ok: true,
            message: "Servicio eliminado correctamente.",
            data: servicio
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    modifyServiceById,
    deleteServiceById
};