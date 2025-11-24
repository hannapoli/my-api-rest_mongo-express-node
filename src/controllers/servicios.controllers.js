const Servicio = require("../models/servicio.model");

//Crear servicio:
const createService = async (req, res) => {
    const cliente = new Cliente()
    //capturar el body
    try {
        // Acceder a la base de datos con el metodo correspondiente del model pasandole el body
        //en caso de que este todo bien tendre que retormar la respuesta
        /* 
            respuesta.status(xxx).json({})
            //controlar el error si este objeto ya existe
        */
    } catch (error) {
        //Gestionar si hay error
        /* 
              respuesta.status(500).json({})
        */
    }
}

//Obtener todos los servicios:
const getAllServices = () => {

    try {
        // Acceder a la base de datos con el metodo correspondiente del model
        //en caso de que este todo bien tendre que retormar la respuesta
        /* 
            respuesta.status(xxx).json({})
        */
    } catch (error) {
        //Gestionar si hay error
        /* 
              respuesta.status(500).json({})
        */
    }

}

//Obtener un servicio por ID:
const getServiceById = () => {

    //buscar el id el los params del endPoint

    try {



        // Acceder a la base de datos con el metodo correspondiente del model
        //en caso de que este todo bien tendre que retormar la respuesta


        //comprobar si existe

        /* 
            si existe responder

            respuesta.status(404).json({
            })
        
        */

        /* si no existe 
                respuesta.status().json()
        */


    } catch (error) {
        //Gestionar si hay error
        /* 
              respuesta.status(500).json({})
        */
    }

}

//Actualizar un servicio por ID:
const modifyServiceById = () => {

    //buscar el id el los params del endPoint

    try {

        // Acceder a la base de datos con el metodo correspondiente del modelpara buscar el servicio por su id

        //comprobar si existe

        /* 
        // Acceder a la base de datos con el metodo correspondiente del model para editar su id

            si existe responder

            respuesta.status(xxx).json({
            })
        
        */

        /* si no existe 
                respuesta.status().json()
        */


    } catch (error) {
        //Gestionar si hay error
        /* 
              respuesta.status(500).json({})
        */
    }

}

//Eliminar un servicio por ID:
const deleteServiceById = () => {

    //buscar el id el los params del endPoint

    try {
        // Acceder a la base de datos con el metodo correspondiente del modelpara buscar el servicio por su id


        //comprobar si existe

        /* 
        // Acceder a la base de datos con el metodo correspondiente del model para eliminar su id

            si existe responder

            respuesta.status(xxx).json({
            })
        
        */

        /* si no existe 
                respuesta.status().json()
        */


    } catch (error) {
        //Gestionar si hay error
        /* 
              respuesta.status(500).json({})
        */
    }

}

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    modifyServiceById,
    deleteServiceById
};