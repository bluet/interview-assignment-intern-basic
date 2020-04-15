const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const accounts = require('./routes/account.js')
const login = require('./routes/login.js')
const pets = require('./routes/pet.js')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/account', accounts)
app.use('/api/login', login)
app.use('/api/pet', pets)

app.listen(3000, () => console.log(`
API-server   running at http://localhost:3000/api
API-docs     running at http://localhost:3000/api-docs
swagger.json running at http://localhost:3000/api-docs.json
`))

const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const options = {
    definition: {
        info: {
            title: 'BT is cool.',
            version: '1.0.0',
        },
        host: 'localhost:3000',
		basePath: '/api'
    },
    apis: ['src/routes/*.js'],

}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})
