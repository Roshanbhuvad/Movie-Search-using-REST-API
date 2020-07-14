const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.get("/", (req, res) => res.send("Welcome"));

router.post("/movie", controllers.createMovie);
router.get("/movies", controllers.getAllMovies);
router.get("/movie/:movieId", controllers.getMovieById);
router.put("/movie/:movieId", controllers.updateMovie);
router.delete("/movie/:movieId", controllers.deleteMovie);

module.exports = router;
