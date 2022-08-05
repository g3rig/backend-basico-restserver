// Configuración de la conexión a la base de datos

const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        // mongoose.connect regresa una promesa de tipo mongoose
        // como está dentro de una función async se le puede poner un await
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log( 'Base de datos online' );

    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error a la hora de iniciar la base de datos' );
    }

}

module.exports = {
    dbConnection
}