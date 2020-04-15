const jwt = require('jsonwebtoken')
const jwt_verify = (req, res, next) => {
    const token = req.cookies['auth']
    if (token) {
        jwt.verify(token, 'bluetnogg', (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'Authenticate faild.' })
            } else {
                req.jwt_decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({ message: 'No provided token.' })
    }
}

module.exports = {
    jwt_verify
}