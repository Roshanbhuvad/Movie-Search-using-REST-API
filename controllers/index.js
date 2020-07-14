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
module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
