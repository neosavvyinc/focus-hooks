'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []).
  value('version', '0.1');

services.factory("focusManager", function () {

    var focusGroups = {
    };
    var currentFocusItemIndex = {
    };

    return {
        hasGroup: function( focusGroup ) {

            return focusGroups.hasOwnProperty(focusGroup);

        },
        addGroup: function( focusGroup ) {

            if( !this.hasGroup(focusGroup) ) {
                focusGroups[focusGroup] = [];
            }

        },
        addItemToGroup: function( focusGroup, element ) {

            var lengthOfFocusGroup = focusGroups[focusGroup].length;
            focusGroups[focusGroup][lengthOfFocusGroup] = element;

        },
        forwardFocus: function( focusGroup ) {
            console.log("forwarding focus");
        },
        reverseFocus: function( focusGroup ) {
            console.log("reversing focus");
        },
        dumpGroups: function() {

            for ( var group in focusGroups) {
                console.log(group);
                console.log(focusGroups[group].length);
            }


        }
    }

});
