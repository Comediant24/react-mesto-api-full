const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongodb');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Имя слишком короткое'],
    maxlength: [30, 'Имя слишком длинное'],
  },
  link: {
    type: String,
    required: [true, 'У пользователя должен быть аватар'],
    validate: {
      validator(v) {
        return /(:?(?:https?:\/\/)?(?:www\.)?)?[-a-z0-9]+\.\w/g.test(v);
      },
      message: 'Некорректный url',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: [ObjectId],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.new,
  },
});

module.exports = model('card', cardSchema);
