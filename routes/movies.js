const express = require('express');

const moviesRoute = express.Router();
const { deleteMovie, createMovie, getMovie } = require('../controllers/movies');
const { movieIdValidation, movieDataValidation } = require('../middlewares/validation');

moviesRoute.get('/', getMovie);

moviesRoute.delete('/:movieId', movieIdValidation, deleteMovie);
moviesRoute.post('/', movieDataValidation, createMovie);

module.exports = moviesRoute;
