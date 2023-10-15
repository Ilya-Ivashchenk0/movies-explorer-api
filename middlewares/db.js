const mongoose = require('mongoose')
const { dbUrl } = require('../utils/checkProd')

mongoose.connect(dbUrl, { useNewUrlParser: true })
mongoose.connection.on('connected', () => console.log('\x1b[93mMongoDB is connected to the server.\x1b[0m'))
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err))
