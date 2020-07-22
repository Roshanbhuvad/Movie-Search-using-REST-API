const models = require("../database/models");

const createMovie = async (req, res) => {
  try {
    const movie = await models.Movies.create(req.body);
    return res.status(201).json({
      movie,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllMovies = async (req, res) => {
  try {
    const movieName = req.query.movieName
      ? { movieName: req.query.movieName }
      : {};
    const pageNumber = req.query.page ? req.query.page : 1;
    const size = req.query.size ? req.query.size : 10;
    const searchString = req.query.searchString
      ? {
          name: {
            $regex: req.query.searchString,
            $options: "i",
          },
        }
      : {};
    const movies = await models.Movies.findAll({
      ...movieName,
      ...searchString,
    });

    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getMoviesWithUser = async (req, res) => {
  try {
    const movies = await models.Movies.findAll({
      include: [
        {
          model: models.Users,
          as: "user",
        },
      ],
    });
    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await models.Movies.findOne({
      where: { id: movieId },
      include: [
        {
          model: models.Users,
          as: "user",
        },
      ],
    });
    if (movie) {
      return res.status(200).json({ movie });
    }
    return res.status(404).send("Movie with specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const [updated] = await models.Movies.update(req.body, {
      where: { id: movieId },
    });
    if (updated) {
      const updatedMovie = await models.Movies.findOne({
        where: { id: movieId },
      });
      return res.status(200).json({ movie: updatedMovie });
    }
    throw new Error("Movie not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const deleted = await models.Movies.destroy({
      where: { id: movieId },
    });
    if (deleted) {
      return res.status(200).send("Movie deleted");
    }
    throw new Error("Movie not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//User controllers

const createUser = async (req, res) => {
  try {
    const user = await models.Users.create(req.body);
    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addWithMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.Users.create({
      movieId: req.body.movieId,
      movieName: req.body.movieName,
      genre: req.body.genre,
      released: req.body.released,
      rated: req.body.rated,
      IMDB: req.body.IMDB,
      director: req.body.director,
      writer: req.body.writer,
      actor: req.body.actor,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      include: [
        {
          model: models.Movies,
          as: "movie",
        },
      ],
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("user can't added");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.Users.findOne({
      where: { id: id },
      include: [
        {
          model: models.Movies,
          as: "movie",
        },
      ],
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.Users.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedUser = await models.Users.findOne({
        where: { id: id },
      });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.Users.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(200).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMoviesWithUser,
  getMovieById,
  updateMovie,
  deleteMovie,
  createUser,
  getUserById,
  addWithMovie,
  deleteUser,
  updateUser,
};
