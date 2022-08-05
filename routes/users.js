const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');


const { esRoleValido, emailExiste, existUserId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet)

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserId ),
    check('role').custom( esRoleValido ),
    validarCampos
], usersPut);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom( emailExiste ), // Dado que se evaluará solo un argumento del mismo nombre, no es necesario utilizar una función flecha
    //check('role', 'No es un rol válido').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
    check('role').custom( esRoleValido ),
    validarCampos
], usersPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserId ),
    validarCampos
], usersDelete);

module.exports = router;