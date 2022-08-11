const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req, res = response) => {

    const { limit = 5, from  = 0 } = req.query;
    const query = { status: true };

    /* const users = await User.find( query )
    .skip( from ) // Paginación desde que objeto se quiere mostrar
    .limit( limit ); // Limite de objetos que se muestran

    const totalUsers = await User.countDocuments( query ); */

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
        .skip( from )
        .limit( limit )
    ]);

    res.json({
        total,
        users
        /* totalUsers,
        user */
    });
}

// PUT

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    // ToDo: Validar id en la BD
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json({
        user
    });
}

// POST

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //ENCRIPTAR LA CONTRASEÑA
    // El salt es básicamente el número de "vueltas" que se quieren realizar para hacer más complicado el método de encriptación
    const salt = bcryptjs.genSaltSync();
    // El hash es para encriptarlo en una sola vía
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en base de datos
    await user.save();

    res.json({
        user
    });
}

// DELETE

const usersDelete = async(req, res) => {

    const { id } = req.params;

    /* // Borrado físico
    const user = await User.findByIdAndDelete( id ); */

    // Borrado recomendado
    const user = await User.findByIdAndUpdate( id, {status: false} );

    const userAunthentiqued = req.user;

    res.json({
        user,
        //uid
        //userAunthentiqued
    });

}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}