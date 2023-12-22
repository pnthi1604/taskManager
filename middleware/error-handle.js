let errorHandle = (err, req, res, next) => {
    let {status_code, message} = err;
    if(status_code && message)
        res.status(status_code).send(message);
    else next(err);
}

module.exports = {
    errorHandle,
};