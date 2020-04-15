const express = require('express')
const { Account } = require('../lib/db/account.js')
const { jwt_verify } = require('../lib/middleware/middleware.js')
const router = express.Router()

/**
* @swagger
* definitions:
*   pet:
*     properties:
*       pet:
*         type: string
*/
/**
* @swagger
* tags:
*   name: pet
*   description: 用戶寵物相關
*/
router.use(jwt_verify)
router.route('/')
    /**
    * @swagger
    * /pet:
    *  get:
    *    description: 取得用戶寵物
    *    tags: [pet]
    *    responses:
    *      '200':
    *        description: 成功
    *      '400':
    *        description: 用戶尚未設定寵物
    *    security:
    *      - jwt: []
    */
    .get((req, res) => {
        const doct_id = req.jwt_decoded.id

        Account.findOne({ _id: doct_id }, 'pet', (err, account) => {
            if (account.pet === undefined) {
                res.status(400).send({ message: 'You don\'t have pet.' })
            } else {
                res.status(200).send({ pet: account.pet })
            }
        })
    })
    /**
    * @swagger
    * /pet:
    *  post:
    *    description: 設定使用者寵物
    *    tags: [pet]
    *    parameters:
    *       - name: pet
    *         description: 設定寵物名稱
    *         in: formData
    *         required: true
    *         type: string
    *    responses:
    *      '201':
    *        description: 設定成功
    *      '400':
    *        description: 未帶有寵物參數
    *      '500':
    *        description: 伺服器錯誤
    */
    .post((req, res) => {
        const doct_id = req.jwt_decoded.id
        const { pet } = req.body

        if (pet === undefined) {
            return res.status(400).send({ message: 'Pet is required.' })
        }

        Account.findOne({ _id: doct_id }, 'pet', (err, account) => {
            if (account.pet === undefined) {
                Account.updateOne({ _id: doct_id }, { pet }, (err) => {
                    if (err)
                        return res.status(500).send({ message: 'Server error.' })
                    res.status(201).send({ message: 'Create pet successed.' })
                })
            } else {
                res.status(400).send({ message: 'You can\'t create pet again.' })
            }
        })
    })
    /**
    * @swagger
    * /pet:
    *  put:
    *    description: 更新使用者寵物
    *    tags: [pet]
    *    parameters:
    *       - name: pet
    *         description: 修改寵物之名稱
    *         in: formData
    *         required: true
    *         type: string
    *    responses:
    *      '201':
    *        description: 更新成功
    *      '400':
    *        description: 該使用者未設有寵物，無法更新
    *      '500':
    *        description: 伺服器錯誤
    */
    .put((req, res) => {
        const doct_id = req.jwt_decoded.id
        const { pet } = req.body

        if (pet === undefined) {
            return res.status(400).send({ message: 'Pet is required.' })
        }

        Account.findOne({ _id: doct_id }, 'pet', (err, account) => {
            if (account.pet === undefined) {
                return res.status(400).send({ message: 'You need to create pet first.' })
            } else {
                Account.updateOne({ _id: doct_id }, { pet }, (err) => {
                    if (err)
                        return res.status(500).send({ message: 'Server error.' })
                    res.status(201).send({ message: 'Edit pet successed.' })
                })
            }
        })
    })

module.exports = router 