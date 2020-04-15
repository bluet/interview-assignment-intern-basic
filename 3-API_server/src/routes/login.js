const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { Account } = require('../lib/db/account.js')
const router = express.Router()

/**
* @swagger
* definitions:
*   Login:
*     required:
*       - username
*       - password
*     properties:
*       username:
*         type: string
*       password:
*         type: string
*/
/**
* @swagger
* tags:
*   name: login
*   description: 使用者登入
*/
/**
* @swagger
* /login:
*   post:
*     description: 登入帳戶
*     tags: [login]
*     produces:
*       - application/json
*     parameters:
*       - name: username
*         description: 使用者名稱.
*         in: formData
*         required: true
*         type: string
*       - name: password
*         description: 使用者密碼.
*         in: formData
*         required: true
*         type: string
*     responses:
*       200:
*         description: 登入
*         schema:
*           type: object
*       400:
*         description: 資料有誤
*         schema:
*           type: object
*       500:
*         description: 伺服器錯誤
*         schema:
*           type: object
*/
/**
* @swagger
* securityDefinitions:
*   jwt:
*       type: "apiKey"
*       name: "Authorization"
*       in: "header"
*/

router.route('/').post((req, res) => {
    const { username, password } = req.body

    if (username === undefined || password === undefined) {
        res.status(400).send({ message: 'Username and password are required.' })
    }

    Account.findOne({ username }, (err, account) => {
        if (err) {
            console.log(err)
            return res.status(500).send({ message: 'Server error.' })
        }
        if (account === null) {
            res.status(400).send({ message: 'Username or password error.' })
        } else {
            const hash = crypto.createHash('sha256').update(password).digest('hex')
            if (hash === account.password) {
                const token = jwt.sign({ id: account._id }, 'bluetnogg')
                const cookie_options = {
                    maxAge: 1000 * 60 * 30,
                    httpOnly: true
                }
                res.cookie('auth', token, cookie_options)
                res.send({
                    message: 'Login successed!'
                })
            } else {
                res.status(400).send({ message: 'Username or password error.' })
            }
        }
    })
})

module.exports = router