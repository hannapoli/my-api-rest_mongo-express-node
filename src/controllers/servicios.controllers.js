const Servicio = require("../models/Servicio.model");

//Crear servicio:
const createService = async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        const servicioGuardado = await nuevoServicio.save();
        return res.status(201).json({
            ok: true,
            message: "Servicio creado correctamente.",
            data: servicioGuardado
        })
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                message: "El nombre del servicio ya existe."
            });
        }
        return res.status(500).json({
            ok: false,
            message: "Error, no se ha podido crear el servicio. Consulte su administrador."
        });
    }
}

//Obtener todos los servicios:
const getAllServices = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        if (servicios.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "No hay ningún servicio registrado."
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Lista de servicios",
            data: servicios
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error, no se han podido obtener los servicios. Consulte su administrador."
        });
    }
}

//Obtener un servicio por ID:
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findById(id);
        if (!servicio) {
            return res.status(404).json({
                ok: false,
                message: "Servicio no encontrado."
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Servicio encontrado.",
            data: servicio
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error, no se han podido obtener el servicio. Consulte su administrador."
        });
    }
}

//Actualizar un servicio por ID:
const modifyServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByIdAndUpdate(id, req.body, { new: true })
        if (!servicio) {
            return res.status(404).json({
                ok: false,
                message: "Servicio no encontrado."
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Servicio actualizado correctamente",
            data: servicio
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error, no se han podido modificar el servicio. Consulte su administrador."
        });
    }
}
//Eliminar un servicio por ID:
const deleteServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByIdAndDelete(id);
        if (!servicio) {
            return res.status(404).json({
                ok: false,
                message: "Servicio no encontrado."
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Servicio eliminado correctamente.",
            data: servicio
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error, no se han podido eliminar el servicio. Consulte su administrador."
        });
    }
}

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    modifyServiceById,
    deleteServiceById
};