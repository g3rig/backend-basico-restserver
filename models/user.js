// Creación de modelo con Mongoose
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    email: {
        type: String,
        required: [ true, 'El email es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'El password es obligatorio' ]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [ true, 'El rol es obligatorio' ],
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});

/**
 * Sobreescritura función .toJson
 * Debe utilizar una funcion normal y no una función flecha
 * Esta función hará que al entregar una respuesta, se definan lo que quiero mostrar.
 * En este caso se quito en el mensaje __v y la password
 */
UserSchema.methods.toJSON = function() {

    const { __v, password, _id,...user } = this.toObject();
    user.uid = _id;
    return user;

}

module.exports = model( 'User', UserSchema );