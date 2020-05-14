const router = require('express').Router;

// Importing the model
const studentModel = require('../models/student');

// Students route
router.get('/students', function(req, res) {
  studentModel.find({}).sort({ name: 1 }).exec(function(err, result) {
    var studentObjects = [];

    result.forEach(function(doc) {
      studentObjects.push(doc.toObject());
    });

    res.render('students', { title: 'Students', students: studentObjects });
  });
});

// Inserts a student in the database
router.post('/addStudent', function(req, res) {
  var student = new studentModel({
    name: req.body.name,
    id: req.body.id,
    img: `img/${req.body.gender}.png`
  });

  student.save(function(err, student) {
    var result;

    if (err) {
      console.log(err.errors);

      result = { success: false, message: "Student was not created!" }
      res.send(result);
    } else {
      console.log("Successfully added student!");
      console.log(student);

      result = { success: true, message: "Student created!" }

      res.send(result);
    }
  });
});

// Finds the students matching the name query from the database and returns the array
router.post('/searchStudents', function(req, res) {
  var pattern = "^" + req.body.name;
  studentModel.find({ name: { $regex: pattern } }, function(err, students) {
    console.log(students);
    res.send(students);
  });

});

// Updates a student to a set id number
router.post('/updateStudent', function(req, res) {
  var query = {
    name: req.body.name
  };

  var update = {
    $set: { id: '109' }
  };

  studentModel.findOneAndUpdate(query, update, { new: true }, function(err, user) {
    if (err) throw err;
    console.log(user);
    res.send(user);
  });
});

module.exports = router;