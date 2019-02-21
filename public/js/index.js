// //Nodemailer 
// var nodemailer = require('nodemailer');
// var hbs = require('nodemailer-express-handlebars')

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'uwstudent7@gmail.com',
//       pass: 'Password7!'   
//      }
// });

// const mailOptions = {
//   from: 'uwstudent7@gmail.com',
//   to: 'Password7!',
//   subject: 'Sending Email using Node.js',
//   html: '<p> This is my resume</p>'
// };

// transporter.sendMail(mailOptions, function(eror, info){
//   if (error) {
//     console.log(error);
//   }else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

//var resInfo = $("#info");
var resName = $("#username");
var resEmail =$("#email");
var resPhone = $("#phone");
var resSummary = $("#summary");
var resEdu = $("#education");
var resEmp = $("#employment");
var resRefs = $("#refs");
var buildRes = $("#build");
var resBody = $("#display");
var $sendEmailBtn = $("#send-email");

var searchRes = $("#search-res");
var resToFind = $("#res-name");
var foundRes = $("#displaySaved");
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  saveResume: function(resume){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/resume",
      data: JSON.stringify(resume)
    });
  },
  getResume: function(rName){
    return $.ajax({
      url: "api/resume/" + rName,
      type: "GET",
    });
  },
  sendEmail: function(rName){
    return $.ajax({
      url: "api/email/" + rName,
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

var buildResume = function(event){
  console.log("This was clicked!!!!!");
  event.preventDefault();

  var resume = {
   // info: resInfo.val().trim(),
   username: resName.val(),
   email: resEmail.val(),
   phone: resPhone.val(),
    summary: resSummary.val(),
    education: resEdu.val(),
    employment: resEmp.val(),
    refs: resRefs.val()
  };

  API.saveResume(resume).then(function(){
    console.log("Resume was Saved!");
  });
  /*
var $resume = $("<p>");

var $info = $("<p>").text(resume.username + "    ");
$info.append(resume.email + "    ");
$info.append(resume.phone);
$resume.append($info);
$resume.append("<p>___________________________________________________________</p>");

var $summary = $("<p>").text(resume.summary);
$resume.append($summary);

var $education = $("<p>").text(resume.education);
$resume.append($education);

var $employment = $("<p>").text(resume.employment);
$resume.append($employment);

var $refs = $("<p>").text(resume.refs);
$resume.append($refs);

  resBody.empty();*/
 // resBody.append($resume);

  resBody.empty();
    resBody.append("<p><h6>" + resume.username + "</h6></p>");
    resBody.append("<p><h6>" + resume.email + "</h6></p>");
    resBody.append("<p><h6>" + resume.phone + "</h6></p>");
    resBody.append("<p></p>");
    resBody.append(resume.summary);
    resBody.append("<p><h3><u>Education                                         </u></h3></p>");
    resBody.append(resume.education);
    resBody.append("<p><h3><u>Employment                                         </u></h3></p>");
    resBody.append(resume.employment);
    resBody.append("<p><h3><u>References                                       </u></h3></p>");
    resBody.append(resume.refs);
};

var findResume = function(event){
  console.log("The Resume was found!!!");
  event.preventDefault();

  API.getResume(resToFind.val()).then(function(data){
 
    foundRes.empty();

    if(!data){
      foundRes.append("<p> Sorry, but that resume was not found. </p>");
    } else{
    foundRes.append("<p><h6>" + data.username + "</h6></p>");
    foundRes.append("<p><h6>" + data.email + "</h6></p>");
    foundRes.append("<p><h6>" + data.phone + "</h6></p>");
    foundRes.append("<p></p>");
    foundRes.append(data.summary);
    foundRes.append("<p><h3><u>Education                                         </u></h3></p>");
    foundRes.append(data.education);
    foundRes.append("<p><h3><u>Employment                                         </u></h3></p>");
    foundRes.append(data.employment);
    foundRes.append("<p><h3><u>References                                       </u></h3></p>");
    foundRes.append(data.refs);
    }
  });
};

var handleEmailSend = function(event) {
  API.sendEmail(resName.val().trim())
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

$exampleList.on("click", ".delete", handleDeleteBtnClick);
buildRes.on("click", buildResume);
searchRes.on("click", findResume);

$sendEmailBtn.on("click", handleEmailSend);

/*$(".please-work").on("click", function(){
  console.log("this is noise!");
});*/