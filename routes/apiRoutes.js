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

    db.Resume.create(req.body).then(function(newResume){
      res.json(newResume);
    });
  });

//Pulls data from the database

  app.get("/api/resume/:username", function(req, res){
    db.Resume.findOne({
      where:{
        username: req.params.username
      }
    }).then(function(foundR){
      res.json(foundR);
    });
  });

  //Email Node Module Route
  app.get("/api/email/:username", function(req, res){

    db.Resume.findOne({
      where:{
        username: req.params.username
      }
    }).then(function(foundR){
      if (!foundR) {
        console.log("No user with that name is saved in the database.")
        return
      }

          //Nodemailer 
      var nodemailer = require('nodemailer');
      // var hbs = require('nodemailer-express-handlebars')
      
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'uwstudent7@gmail.com',
          pass: 'Password7!' 
        }
      });
      
      const mailOptions = {
        from: 'ofCourse@gmail.com',
        to: "uwstudent7@gmail.com",
        subject: 'Attached is my resume for consideration',
        html: "I'd love to be considered for the position. Please review my resume and contact me with any questions you may have." + JSON.stringify(foundR.dataValues)
      };
            
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
  });
};
