const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {

    return new Promise((resolve, reject) => {

        // Se guarda el user.id en el payload
        const payload = { uid };

        // Instrucción para generar un JWT
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log( err );
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }

        })

    })

}

module.exports = generarJWT;