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

const jwtToken = () => {
  if (process.env.NODE_ENV !== 'production') {
    return 'b0642d70b8b9e5b547d6f01eb2bedda65672fea8f0ec527ce88164e49ab628c5'
  }
  return process.env.JWT_SECRET
}

module.exports = {
  baseUrl: baseUrl(),
  dbUrl: dbUrl(),
  jwtToken: jwtToken()
}
