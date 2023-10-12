const baseUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3000'
  }
  return 'https://api.ilya-mesto.nomoredomainsrocks.ru'
}

const dbUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return 'mongodb://localhost:27017/bitfilmsdb'
  }
  return process.env.DB_URL
}

module.exports = {
  baseUrl: baseUrl(),
  dbUrl: dbUrl()
}
