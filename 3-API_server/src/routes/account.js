const express = require('express')
const crypto = require('crypto')
const { Account } = require('../lib/db/account.js')
const { jwt_verify } = require('../lib/middleware/middleware.js')
const router = express.Router()

/**
* @swagger
* definitions:
*   Account:
*     properties:
*       username:
*         type: string
*       password:
*         type: string
*       email:
*         type: string
*/
/**
* @swagger
* tags:
*   name: account
*   description: 帳戶資訊相關
*/
router.route('/')
    /**
    * @swagger
    * /account:
    *  get:
    *    description: 取得用戶資料
    *    tags: [account]
    *    responses:
    *      '200':
    *        description: 回應用戶 username, email
    *      '403':
    *        description: 尚未登入，無法取得
    *      '500':
    *        description: 伺服器錯誤
    *    security:
    *      - jwt: []
    */
    .get(jwt_verify, (req, res) => {
        const doct_id = req.jwt_decoded.id

        Account.findById(doct_id, 'username email', (err, account) => {
            if (err)
                return res.status(500).send({ message: 'Server error.' })
            if (account === undefined) {
                return res.status(403).send({ message: 'You don\'t have permission.' })
            }
            res.send({
                username: account.username,
                email: account.email
            })
        })
    })
    /**
    * @swagger
    * /account:
    *  post:
    *    description: 註冊用戶
    *    tags: [account]
    *    parameters:
    *       - name: username
    *         description: 使用者名稱
    *         in: formData
    *         required: true
    *         type: string
    *       - name: password
    *         description: 使用者密碼
    *         in: formData
    *         required: true
    *         type: string
    *       - name: email
    *         description: 使用者電子郵件
    *         in: formData
    *         required: false
    *         type: string
    *    responses:
    *      '201':
    *        description: 成功註冊用戶
    *      '403':
    *        description: 尚未登入，無法取得
    *      '500':
    *        description: 伺服器錯誤
    */
    .post((req, res) => {
        const { username, password, email } = req.body

        if (username === undefined || password === undefined) {
            return res.status(400).send({ message: 'Username and password are required.' })
        }

        Account.find({ username: username }, (err, account) => {
            if (err) {
                res.status(500).send({ message: 'Server error.' })
                return console.error(err)
            }

            if (account.length === 0) {
                const account = new Account({
                    username,
                    password: crypto.createHash('sha256').update(password).digest('hex'),
                    email
                })
                account.save((err) => {
                    if (err) {
                        res.status(500).send({ message: 'Server error.' })
                        return console.error(err)
                    }
                    res.status(201).send({ message: 'Create account successed!' })
                })
            } else {
                res.status(400).send({ message: 'This username was already used.' })
            }
        })
    })
    /**
    * @swagger
    * /account:
    *  put:
    *    description: 修改使用者電子郵件
    *    tags: [account]
    *    parameters:
    *       - name: email
    *         description: 欲更新之電子郵件
    *         in: formData
    *         required: true
    *         type: string
    *    responses:
    *      '201':
    *        description: 更新成功
    *      '400':
    *        description: 電子郵件欄位為空
    *      '500':
    *        description: 伺服器錯誤
    *    security:
    *      - jwt: []
    */
    .put(jwt_verify, (req, res) => {
        const doct_id = req.jwt_decoded.id
        const { email } = req.body

        if (email === undefined) {
            return res.status(400).send({ message: 'Email is required.' })
        }

        Account.updateOne({ _id: doct_id }, { email: email }, (err) => {
            if (err)
                return res.status(500).send({ message: 'Server error.' })
            return res.status(201).send({ message: 'Update successed.' })
        })
    })

module.exports = router