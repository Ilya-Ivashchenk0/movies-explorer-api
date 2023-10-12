require('dotenv').config()
require('./middlewares/db')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const loggs = require('req-loggs')
const { errors } = require('celebrate')
const centralErrors = require('./errors/centralErrors')
const cors = require('./middlewares/cors')
const baseUrl = require('./utils/checkProd')
const helmet = require('./middlewares/helmet')
const rateLimit = require('./middlewares/rateLimit')
const defaultErrorMessage = require('./utils/constsMessages')
const DefaultError = require('./errors/default-error')
const { requestLogger, errorLogger } = require('./middlewares/logger')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet)
app.use(rateLimit)

app.use(cors)
app.use(requestLogger)
app.use(loggs)

app.use('/', require('./routes'))

app.use((err, req, res, next) => {
  throw new DefaultError(defaultErrorMessage)
})

app.use(errors())
app.use(errorLogger)

app.use(centralErrors)

app.listen(PORT, () => console.log(`\x1b[95mServer started && listening on:\x1b[0m \x1b[94m${baseUrl}\x1b[0m`))
