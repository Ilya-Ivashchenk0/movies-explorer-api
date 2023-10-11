require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const loggs = require('req-loggs')
const cors = require('./middlewares/cors')
const baseUrl = require('./utils/checkProd')
const { requestLogger, errorLogger } = require('./middlewares/logger')

const PORT = process.env.PORT || 3000
const BD_URL = process.env.DB_URL || 'mongodb://localhost:27017/bitfilmsdb'

mongoose.connect(BD_URL, { useNewUrlParser: true })
mongoose.connection.on('connected', () => console.log('MongoDB is connected to the server.'))
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors)
app.use(requestLogger)

app.use('/', require('./routes'))

app.use(errorLogger)

app.use(loggs)

app.listen(PORT, () => console.log(`\x1b[34mServer started && listening on:\x1b[0m \x1b[31m${baseUrl}\x1b[0m`))
