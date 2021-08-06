const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError('Ошибка, отсутствуют сохраненные фильмы');
    })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((newMovie) => res
      .send(newMovie))
    .catch(() => {
      throw new BadRequestError('Ошибка добавления фильма');
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return card.remove()
          .then(() => res.send({ message: 'Фильм удален' }));
      }
      throw new ForbiddenError('Ошибка, не возможно удалить чужой фильм');
    })
    .catch(() => { throw new NotFoundError('Ошибка, данный фильм не найден'); })
    .catch(next);
};

module.exports = {
  getMovie, createMovie, deleteMovie,
};
