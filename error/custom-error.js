class APIError extends Error {
    constructor(message, status_code) {
        super(message);
        this.status_code = status_code;
    }
}

let createError = (message, status_code) => {
    if(status_code) {
        return new APIError(message, status_code);
    }
    return new APIError('Co loi xay ra phia may chu', 500);
};

module.exports = {
    createError,
    APIError,
};