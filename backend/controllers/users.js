const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

const getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(200).send({
      message: 'Пользователь зарегестрирован',
      _id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    if (error.name === 'MongoError') {
      next(new ConflictError('Пользователь с таким email уже зарегестрирован'));
    }
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const upUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).send(upUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message.replace('Validation failed: ', '')));
    }
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const upUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).send(upUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message.replace('Validation failed: ', '')));
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.status(200).send({ token, name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserMe,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  loginUser,
};
