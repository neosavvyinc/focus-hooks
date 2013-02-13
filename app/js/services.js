'use strict';


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
        focusOnFirstFocusableItem(itemToFocus);

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
        focusOnFirstFocusableItem(itemToFocus);


    }

    var focusOnFirstFocusableItem = function (divName) {
        console.log("div: " + divName.attr('id'));
        var first = $("#"+ divName.attr('id') + " :input:first");
        first.focus();
        console.log("first input div item: " + first.attr("id"));
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
                focusOnFirstFocusableItem(element);
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

                var elementToFocus = focusGroups[focusGroup][currentFocusItemIndex[focusGroup]];
                elementToFocus.addClass('focused');

                focusOnFirstFocusableItem(elementToFocus);
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

                var elementToFocus = focusGroups[focusGroup][currentFocusItemIndex[focusGroup]];
                elementToFocus.addClass('focused');
                focusOnFirstFocusableItem(elementToFocus);

            }
        },
        activateNextGroup: function( focusGroup ) {

            console.log('activate next==============================');

            setTimeout(queueNextGroup, 100);

        },
        activatePreviousGroup: function() {

            setTimeout(queuePreviousGroup, 100);

        },
        setFocusForGroup:function( managedGroup, element ) {

//            currentGroup = managedGroup;

            var group, key, item, idx;

            removeAllFocusedItems();

            group = focusGroups[managedGroup];

            var indexIntoGroup = 0;
            for ( key in group ) {
                indexIntoGroup = indexIntoGroup + 1;
                item = focusGroups[managedGroup][key];
                if( item.attr('id') === element.attr('id') ) {
                    item.addClass('focused');
                }

            }


        },
        isGroupActive: function( managedGroup ) {
            return managedGroup === currentGroup;
        }
    }

});
