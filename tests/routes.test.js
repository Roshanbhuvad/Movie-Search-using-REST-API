const request = require("supertest");
const app = require("../server");
describe("Movies Endpoints", () => {
  it("should create a new movie", async () => {
    const res = await request(app).post("/api/movie").send({
      movieId: "TT883246",
      movieName: "mission impossible:fallout",
      genre: "thriller",
      released: "2018-02-20",
      rated: "rated",
      IMDB: 9.4,
      director: "Christoper McQuuarrie",
      writer: "jake myers",
      actor: "tom cruise",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("movie");
  });
});
