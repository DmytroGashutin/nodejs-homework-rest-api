const { isValidObjectId } = require('mongoose');

const { RequestError } = require('../helpers');

const isValidId = (req, res, next) => {
    const { id } = req.params;
    const isCorrectId = isValidObjectId(id);
    if (!isCorrectId) {
        const error = RequestError(400, `${id} in not corrent id format`);
        next(error);
    }
    next();

}

module.exports = isValidId;