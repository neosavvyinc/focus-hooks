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
    var currentGroup = undefined;
    var focusGroupCount = 0;

    var removeAllFocusedItems = function() {
        for ( var focusGroup in focusGroups) {
            focusGroups[focusGroup][currentFocusItemIndex[focusGroup]].removeClass('focused');
        }
    }


    var queueNextGroup = function() {

        currentGroup = currentGroup + 1;
        if( currentGroup > focusGroupCount - 1 )
        {
            currentGroup = 0;
        }

        removeAllFocusedItems();

        var currentItemToFocus = currentFocusItemIndex[currentGroup] === undefined ? 0 : currentFocusItemIndex[currentGroup];

        var itemToFocus = focusGroups[currentGroup][currentItemToFocus];
        itemToFocus.addClass('focused');


    }

    var queuePreviousGroup = function() {

        currentGroup = currentGroup - 1;
        if( currentGroup < 0 ) {
            currentGroup = focusGroupCount - 1;
        }

        removeAllFocusedItems();

        var currentItemToFocus = currentFocusItemIndex[currentGroup] === undefined ? 0 : currentFocusItemIndex[currentGroup];

        var itemToFocus = focusGroups[currentGroup][currentItemToFocus];
        itemToFocus.addClass('focused');


    }

    return {
        hasGroup: function( focusGroup ) {

            return focusGroups.hasOwnProperty(focusGroup);

        },
        addGroup: function( focusGroup ) {
            focusGroupCount++;

            if( !this.hasGroup(focusGroup) ) {
                focusGroups[focusGroup] = [];
                currentFocusItemIndex[focusGroup] = 0;

                if( currentGroup === undefined ) {
                    currentGroup = focusGroup;
                }
            }

        },
        addItemToGroup: function( focusGroup, element ) {

            var lengthOfFocusGroup = focusGroups[focusGroup].length;
            focusGroups[focusGroup][lengthOfFocusGroup] = element;

            if( focusGroup == currentGroup && lengthOfFocusGroup == 0 )
            {
                element.addClass('focused');
            }

        },
        forwardFocus: function( focusGroup ) {
            console.log("forwarding focus");

            if( focusGroup === currentGroup )
            {

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

            }

        },
        reverseFocus: function( focusGroup ) {
            console.log("reversing focus");

            if( focusGroup === currentGroup )
            {

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

            }
        },
        activateNextGroup: function( focusGroup ) {

            console.log('activate next==============================');

            setTimeout(queueNextGroup, 100);

        },
        activatePreviousGroup: function() {

            setTimeout(queuePreviousGroup, 100);

        },
        isGroupActive: function( managedGroup ) {
            return managedGroup === currentGroup;
        },
        dumpGroups: function() {

            for ( var group in focusGroups) {
                console.log(group);
                console.log(focusGroups[group].length);
            }


        }
    }

});
