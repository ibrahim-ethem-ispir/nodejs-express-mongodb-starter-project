class APIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode || 400
    }
}

module.exports = APIError