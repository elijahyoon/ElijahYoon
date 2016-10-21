'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', ['firebase']);

// App controller
app.controller('EYCtrl', ['$scope', '$http', '$window', '$firebaseObject', '$firebaseAuth',
function($scope, $http, $window, $firebaseObject, $firebaseAuth) {

  // About blurb
  $scope.about = "Saved by grace, husband to Sara, Software Developer, " +
  "DC sports fan, and Silver Spring native. I enjoy good design, gadgets, " +
  "coding, and working out.";

  // Profile image paths
  var profileColor= "images/profile.jpg"
  var profileBW = "images/profile-bw.jpg"

  // Default image
  $scope.profile = profileBW;

  // Toggle profile images
  $scope.switchPic = function() {
    $scope.profile = $scope.colorize ? profileColor : profileBW;
  };

  // Open links on button press
  $scope.goTo = function(path) {
    $window.open(path);
  };

  // Don't show note by default
  $scope.showNote = false;

  // Diplay note
  $scope.openNote = function() {
    $scope.showNote = true;
  };

  // Hide note
  $scope.closeNotes = function() {
    $scope.showNote = false;
  };

  // Note text field disabled until load time
  $scope.noteDisabled = true;

  // Firebase anonymous auth
  // var auth = $firebaseAuth();
  // auth.$signInAnonymously().then(function(firebaseUser) {
  //   console.log("Signed in");
  // }).catch(function(error) {
  //   console.log("Authentication failed:", error);
  // });

  // Firebase data retrieval
  var ref = firebase.database().ref().child('note');
  var noteObj = $firebaseObject(ref);

  // Bind data after retrieval
  noteObj.$loaded().then(function() {
    $scope.note = noteObj.$value;
    if($scope.note != null && $scope.note !== "") {
      angular.element(document.querySelector('#notes-field')).addClass('is-dirty');
    }
    $scope.noteDisabled = false;
  });

  // Push changes to server
  $scope.saveNote = function() {
    $scope.noteDisabled = true;
    noteObj.$value = $scope.note;
    noteObj.$save().then(function(ref) {
      $scope.noteDisabled = false;
    }, function(error) {
      console.log("Error:", error);
    });
  };

}]);
