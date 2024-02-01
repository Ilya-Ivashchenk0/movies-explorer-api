const Cors = require('cors')

const cors = () => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      origin: 'http://localhost:3500', // разрешенные домены
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // разрешенные методы
      credentials: true
    }
  }

  return {
    origin: 'https://movies-explorer-frontend.test-tasks.ru', // разрешенные домены
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // разрешенные методы
    credentials: true
  }
}

module.exports = Cors(cors())
