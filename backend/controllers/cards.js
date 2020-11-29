const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const Card = require('../models/card');

const getCards = async (req, res, next) => {
  try {
    const Cards = await Card.find({});
    res.status(200).send(Cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const newCard = await Card.create({ name, link, owner });
    res.status(200).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Ошибка валидации! Некорректный url'));
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const delCard = await Card.findByIdAndRemove({ _id: req.params.cardId });
    if (!delCard) {
      throw new NotFoundError('Карточка не найдена');
    } else if (delCard.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалить карточку другого пользователя');
    }
    res.status(200).send({ message: `Карточка удалена ${delCard}` });
  } catch (error) {
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!likedCard) throw new NotFoundError('Карточка не найдена');
    res.status(200).send(likedCard);
  } catch (error) {
    next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const unlikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!unlikedCard) throw new NotFoundError('Карточка не найдена');
    res.status(200).send(unlikedCard);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
