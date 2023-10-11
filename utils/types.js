const isEmail = require('validator/lib/isEmail')

const nameType = {
  type: String,
  default: 'Жак-Ив Кусто',
  minlength: 2,
  maxlength: 30
}

const emailType = {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: (v) => isEmail(v),
    message: 'Неправильный формат почты'
  }
}

const passwordType = {
  type: String,
  required: true,
  minlength: 8,
  select: false
}

module.exports = {
  nameType,
  emailType,
  passwordType
}
