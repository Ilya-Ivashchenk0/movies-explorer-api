const rateLimit = require('express-rate-limit')

module.exports = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час (в миллисекундах)
  max: 3000, // максимальное количество запросов
  message: 'Слишком много запросов с вашего IP, попробуйте позже. Лимит составляет: 3000 запросов, в час.'
})
