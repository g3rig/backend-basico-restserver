const { response } = require('express');

const usersGet = (req, res = response) => {

    const params = req.query;

    res.json({
        msg: "GET API - Controller",
        params
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "PUT API - Controller",
        id
    });
}

const usersPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: "POST API - Controller",
        body
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: "DELETE API - Controller"
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}