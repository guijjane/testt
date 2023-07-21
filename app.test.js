const request = require("supertest");
const app = require("./app");
//const fs = require("fs");
const data =require("./data.json")

describe("FilmDB API", () => {
  // beforeEach(() => {
  //   // Nettoyer les données avant chaque test
  //   fs.writeFileSync("./data.json", "[]");
  // });
  it("should fetch all films", async () => {
    const res = await request(app).get("/api/films");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
  });
  
  ////////////////////////////////////////////////
  //test d'ajout
  it("should create a film", async () => {
    const film = {
      title: "Film 1",
      year: 2022,
      genre: "Action",
      director: "Director 1",
      actors: "Actor 1, Actor 2",
      synopsis: "Synopsis 1",
      location: "/path/to/video/file1.mp4",
      thumbnail: "/path/to/thumbnail1.jpg",
    };
    const res = await request(app).post("/api/films").send(film);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film added successfully");
  });
  
  it("should create a film", async () => {
    const film = {
      title: "Film 6",
      year: 2050,
      genre: "SEDNESS",
      director: "DRISS",
      actors: "safi, safa",
      synopsis: "Synophyr 3",
      location: "/path/to/video/file1.mp4",
      thumbnail: "/path/to/thumbnail1.jpg",
    };
    const res = await request(app).post("/api/films").send(film);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film added successfully");
  });
  it("should create a film", async () => {
    const film = {
      title: "Film 7",
      year: 2050,
      genre: "HHHHH",
      director: "MMMMM",
      actors: "safia, safai",
      synopsis: "Synophyr 3",
      location: "/path/to/video/file1.mp4",
      thumbnail: "/path/to/thumbnail1.jpg",
    };
    const res = await request(app).post("/api/films").send(film);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film added successfully");
  });
  
///////////////////////////////////////////////////////////////
//test de delete
  it("should delete a film", async () => { 
    const filmTitleToDelete = "Film 4";
    // Envoyez une requête DELETE à l'endpoint "/api/films" avec le titre du film à supprimer
    const deleteRes = await request(app).delete(`/api/films/${filmTitleToDelete}`);
    //expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe("Film deleted successfully");
    // Ensuite, vérifiez que le film a été supprimé en envoyant une requête GET à l'endpoint "/api/films"
    const getRes = await request(app).get("/api/films");
    //expect(getRes.status).toBe(200);
    // Assurez-vous que le film avec le titre spécifié n'est plus présent dans la liste des films retournée
    //expect(getRes.body).not.toContainEqual(expect.objectContaining({ title: filmTitleToDelete }));
  });

  ////////////////////////////////////////////////
//test de update 
  it("should update a film", async () => {
    const filmTitleToUpdate = "Film 7"; // Remplacez "123" par l'ID du film que vous souhaitez mettre à jour
    const updatedFilmData = {
      title: "forestgump",
      year: 1990,
      genre: "drama",
      director: "abdelilah",
      actors: ["DRIss", "SOUHail"],
      synopsis: "THIS",
      location: "emplacement",
      thumbnail: "miniature",
    };
  
    const res = await request(app)
      .put(`/api/films/${filmTitleToUpdate}`)
      .send(updatedFilmData);
  
    //expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film updated successfully");
  
    //Vous pouvez également vérifier que le film a été mis à jour en récupérant le film par son ID et en vérifiant ses propriétés
    const getFilmRes = await request(app).get(`/api/films/${filmTitleToUpdate}`);
    //expect(getFilmRes.status).toBe(200);
    //expect(getFilmRes.body.title).toBe(updatedFilmData.title);
    //expect(getFilmRes.body.year).toBe(updatedFilmData.year);
    
  });

});



