const express = require("express");
const fs = require("fs");
const router = express.Router();
const dataFilePath = "./data.json";
const { readDataFromFile, writeDataToFile } = require("./red");


// Endpoint pour lister tous les films
router.get("/films", (req, res) => {
  const films = readDataFromFile();
  console.log(films);
  res.json(films);
});

// Endpoint pour créer un film
router.post("/films", (req, res) => {
  const { title, year, genre, director, actors, synopsis, location, thumbnail } = req.body;
  const film = {
    title,
    year,
    genre,
    director,
    actors,
    synopsis,
    location,
    thumbnail,
  };
  const films = readDataFromFile();
  films.push(film);
  writeDataToFile(films);
  res.json({ message: "Film added successfully" });
});

// Endpoint pour supprimer un film
router.delete("/films/:title", (req, res) => {
  const title = req.params.title;
  const films = readDataFromFile();
  const filteredFilms = films.filter((film) => film.title !== title);
  writeDataToFile(filteredFilms);
  res.json({ message: "Film deleted successfully" });

});



// Endpoint pour modifier un film
router.put("/films/:title", (req, res) => {
  const title = req.params.title;
  const { year, genre, director, actors, synopsis, location, thumbnail } = req.body;
  const films = readDataFromFile();
  const updatedFilms = films.map((film) => {
    if (film.title === title) {
      return {

        title,
        year,
        genre,
        director,
        actors,
        synopsis,
        location,
        thumbnail,
      };
    }
    return film;
  });
  writeDataToFile(updatedFilms);
  res.json({ message: "Film updated successfully" });
});
  

module.exports = router;
