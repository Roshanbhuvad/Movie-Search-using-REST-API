const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.get("/", (req, res) => res.send("Welcome"));

router.post("/movie", controllers.createMovie);
router.get("/movies", controllers.getAllMovies);
router.get("/watchlist", controllers.getMoviesWithUser);
router.get("/movie/:movieId", controllers.getMovieById);
router.put("/movie/:movieId", controllers.updateMovie);
router.delete("/movie/:movieId", controllers.deleteMovie);

router.post("/user", controllers.createUser);
router.get("/user/:id", controllers.getUserById);
router.post("/user/addWithMovie", controllers.addWithMovie);
router.put("/user/:id", controllers.updateUser);
router.delete("/user/:id", controllers.deleteUser);

module.exports = router;
