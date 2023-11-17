const rateLimit = require('express-rate-limit')

module.exports = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час (в миллисекундах)
  max: 1000, // максимальное количество запросов
  message: 'Слишком много запросов с вашего IP, попробуйте позже. Лимит составляет: 1000 запросов, в час.'
})
