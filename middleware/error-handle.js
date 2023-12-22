const { createError, APIError} = require('../error/custom-error.js');

let errorHandle = (err, req, res, next) => {
    if(err instanceof APIError) 
        res.status(err.status_code).send(err.message);
    else
        res.status(500).send('co loi xay ra phia may chu');
}

module.exports = {
    errorHandle,
};