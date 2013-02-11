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
                currentFocusItemIndex[focusGroup] = 0;
            }

        },
        addItemToGroup: function( focusGroup, element ) {

            var lengthOfFocusGroup = focusGroups[focusGroup].length;
            focusGroups[focusGroup][lengthOfFocusGroup] = element;

            if( lengthOfFocusGroup == 0 ) {
                element.addClass('focused');
            }

        },
        forwardFocus: function( focusGroup ) {
            console.log("forwarding focus");

            if( !currentFocusItemIndex.hasOwnProperty(focusGroup) ) {
                currentFocusItemIndex[focusGroup] = 0;
            }

            focusGroups[focusGroup][currentFocusItemIndex[focusGroup]].removeClass('focused');

            currentFocusItemIndex[focusGroup] = currentFocusItemIndex[focusGroup] + 1;

            if( currentFocusItemIndex[focusGroup] >=  focusGroups[focusGroup].length) {
                currentFocusItemIndex[focusGroup] = 0;
            }

            console.log("currentFocusIndex: " + currentFocusItemIndex[focusGroup]);

            focusGroups[focusGroup][currentFocusItemIndex[focusGroup]].addClass('focused');

        },
        reverseFocus: function( focusGroup ) {
            console.log("reversing focus");

            if( !currentFocusItemIndex.hasOwnProperty(focusGroup) ) {
                currentFocusItemIndex[focusGroup] = focusGroups[focusGroup].length;
            }

            focusGroups[focusGroup][currentFocusItemIndex[focusGroup]].removeClass('focused');

            currentFocusItemIndex[focusGroup] = currentFocusItemIndex[focusGroup] - 1;

            if( currentFocusItemIndex[focusGroup] < 0 ) {
                currentFocusItemIndex[focusGroup] = focusGroups[focusGroup].length - 1;
            }

            console.log("currentFocusIndex: " + currentFocusItemIndex[focusGroup]);

            focusGroups[focusGroup][currentFocusItemIndex[focusGroup]].addClass('focused');
        },
        dumpGroups: function() {

            for ( var group in focusGroups) {
                console.log(group);
                console.log(focusGroups[group].length);
            }


        }
    }

});
