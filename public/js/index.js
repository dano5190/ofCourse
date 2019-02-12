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
var $resume = $("<p>");

var $info = $("<p>").text(resume.username + "\n");
$info.append(resume.email + "\n");
$info.append(resume.phone + "\n");
$resume.append($info);

var $summary = $("<p>").text("__________________________________________________________________________ \n" + resume.summary);
$resume.append($summary);

var $education = $("<p>").text(resume.education);
$resume.append($education);

var $employment = $("<p>").text(resume.employment);
$resume.append($employment);

var $refs = $("<p>").text(resume.refs);
$resume.append($refs);

  resBody.empty();
  resBody.append($resume);
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
buildRes.on("click", buildResume);
/*$(".please-work").on("click", function(){
  console.log("this is noise!");
});*/