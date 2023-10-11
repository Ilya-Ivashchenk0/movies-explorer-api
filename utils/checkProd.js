const baseUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3000'
  }
  return 'https://api.ilya-mesto.nomoredomainsrocks.ru'
}

module.exports = baseUrl()
