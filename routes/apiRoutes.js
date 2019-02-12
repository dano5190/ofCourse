var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  app.post("/api/resume", function(req, res) {
    console.log("Resume Data: ");
    console.log(req.body);

   // var dbQuery = "INSERT INTO resumes (info, summary, education, employment, refs) VALUES (?,?,?,?,?)";

    /*db.query(dbQuery, [req.body.info, req.body.summary, req.body.education, req.body.employment, req.body.refs], function(err, result) {
      if (err) throw err;
      console.log("Resume Successfully Saved!");
      res.end();
    });*/
    db.Resume.create(req.body).then(function(newResume){
      res.json(newResume);
    });
  });
};
