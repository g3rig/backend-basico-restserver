const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user');
const generarJWT = require('../helpers/generateJWT');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await Usuario.findOne({ email });
        if( !user ) {
            return res.status(400).json({
                msg: 'Usuario incorrect'
            });
        }


        // Verificar si el usuario está activo
        if( !user.status ) {
            return res.status(400).json({
                msg: 'Usuario status false'
            })
        }

        // Verificar password
        const validarPassword = bcryptjs.compareSync( password, user.password );
        if( !validarPassword ) {
            return res.status(400).json({
                msg: 'Password incorrect'
            })
        }

        //Generar el JWT
        const token = await generarJWT( user.id );


        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }

}

module.exports = {
    login
}