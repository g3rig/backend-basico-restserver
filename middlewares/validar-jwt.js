const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async ( req = request, res = response, next ) => {

    // Obtención del token en el header llamado x-token (el nombre puede ser personalizado)
    const token = req.header('x-token');

    // Si no existe token envía status 401
    /* El código de error HTTP 401 indica que la petición (request) no ha sido ejecutada
    porque carece de credenciales válidas de autenticación para el recurso solicitado. */
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }


    // Validación del JWT
    try {
        // Se obtiene el uid del payload
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde al uid
        const user = await User.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: "Usuario no existe en BD"
            })
        }

        // Verificar si el uid (usuario) tiene estado en true
        if( !user.status ) {
            return res.status(401).json({
                msg: "Usuario no válido - status use: false"
            })
        }
        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            msg: 'Token no válido'
        })

    }

}

module.exports = {
    validarJWT
}