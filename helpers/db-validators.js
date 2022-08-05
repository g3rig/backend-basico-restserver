const Role = require('../models/role');
const User = require('../models/user');

// Validación si el rol es válido
const esRoleValido = async( role = '' ) => {
    const existeRole = await Role.findOne({ role });
    if( !existeRole ) {
        throw new Error( `El rol ${role} no está registrado en la base de datos` );
    }
}

// Validación si el correo existe
const emailExiste = async( email = '' ) => {
    const exist = await User.findOne({ email });
    if( exist ) {
        throw new Error( `El email ${email} ya esta registrado en la base de datos` );
    }
}

// Validar ID
const existUserId = async( id = '' ) => {
    const existUser = await User.findOne({ id });
    if( !existUser ) {
        throw new Error( `El usuario no existe` );
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existUserId
}