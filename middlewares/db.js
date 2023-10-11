const mongoose = require('mongoose')

const BD_URL = process.env.DB_URL || 'mongodb://localhost:27017/bitfilmsdb'

mongoose.connect(BD_URL, { useNewUrlParser: true })
mongoose.connection.on('connected', () => console.log('MongoDB is connected to the server.'))
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err))
