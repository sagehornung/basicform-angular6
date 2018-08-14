var app = angular.module('app', []);

app.controller('form', function MyForm($scope, $http) {
  $scope.test = 'Hello worls';

  $scope.model = {};
  $scope.searchStr = '';

  $scope.foundPeople = false;
  init();

  $scope.submitForm = function() {
    clearErrs();
    console.log($scope.model);

    if(notValid()) {
      console.log('in Not valid');
      return;
    }
    else {
      $http.post('http://localhost:8080/api/person', $scope.model).then(data => {
        console.log('DATA ', data);
        $scope.model = {};
        clearErrs();
      });
    }
  };

  function init() {
    $http.get('http://localhost:8080/api/person').then(data => {
      console.log('DATA ', data)
    });
  }

  function notValid() {
    var e = false;
    if(!$scope.model.first) {
      $scope.firstErr = true;
      e = true;
    }
    if(!$scope.model.last) {
      $scope.lastErr = true;
      e = true;
    }
    if(!$scope.model.address) {
      $scope.addErr = true;
      e = true;
    }
    console.log('Email', validateEmail($scope.model.email));
    if(!validateEmail($scope.model.email)) {
      $scope.emailErr = true;
      e = true;
    }
    var pattern = /^[0-9]{10}$/;
    if(!pattern.test($scope.model.phone)) {
      $scope.phErr = true;
      e = true;
    }
    console.log('e', e);
    return e;
  }

  function clearErrs(){
    $scope.firstErr = false;
    $scope.lastErr = false;
    $scope.phErr = false;
    $scope.addErr = false;
    $scope.emailErr = false;
  }
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  $scope.search = function() {
    $scope.foundPeople = false;
    $http.post('http://localhost:8080/api/search', {search: $scope.searchStr}).then(res => {
      console.log('Search Data', res.data);
      $scope.persons = res.data;
      console.log('Persons', $scope.persons);
      if($scope.persons.length > 0){
        $scope.foundPeople = true;
      }
    });
  };

  function validateEdit(index){
    $scope.persons[index].firstErr = false;
    $scope.persons[index].lastErr = false;
    $scope.persons[index].phErr = false;
    $scope.persons[index].addErr = false;
    $scope.persons[index].emailErr = false;
    var e = false;
    if(!$scope.persons[index].first) {
      $scope.persons[index].firstErr = true;
      e = true;
    }
    if(!$scope.persons[index].last) {
      $scope.persons[index].lastErr = true;
      e = true;
    }
    if(!$scope.persons[index].address) {
      $scope.persons[index].addErr = true;
      e = true;
    }
    console.log('Email', validateEmail($scope.model.email));
    if(!validateEmail($scope.persons[index].email)) {
      $scope.persons[index].emailErr = true;
      e = true;
    }
    var pattern = /^[0-9]{10}$/;
    if(!pattern.test($scope.persons[index].phone)) {
      $scope.persons[index].phErr = true;
      e = true;
    }
    console.log('e', e);
    return e;
  }

  $scope.edit = function(index) {
    if(!validateEdit(index)){
      $http.put('http://localhost:8080/api/person', $scope.persons[index]).then(data => {
        console.log('Edited DATA ', data);

      });
    }

  }

});
