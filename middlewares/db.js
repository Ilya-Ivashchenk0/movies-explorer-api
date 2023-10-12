const mongoose = require('mongoose')

const BD_URL = process.env.DB_URL || 'mongodb://localhost:27017/bitfilmsdb'

mongoose.connect(BD_URL, { useNewUrlParser: true })
mongoose.connection.on('connected', () => console.log('\x1b[93mMongoDB is connected to the server.\x1b[0m'))
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err))
