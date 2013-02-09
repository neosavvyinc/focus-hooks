'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function AccordianController($scope) {
    $scope.values = ["Adam is awesome",
        "Trevor is awesomer",
        "Dana is pretty nifty too"]
}
