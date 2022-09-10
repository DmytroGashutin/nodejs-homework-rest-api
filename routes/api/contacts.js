const express = require('express')

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const {authenticate, validationBody, isValidId } = require('../../middlewars');

const {schemas} = require('../../models/contact');

const router = express.Router()

router.get('/',authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:id',isValidId, ctrlWrapper(ctrl.getById));

router.post('/',authenticate, validationBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.put('/:id', isValidId,validationBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', isValidId, validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete('/:id',isValidId, ctrlWrapper(ctrl.removeById));



module.exports = router
