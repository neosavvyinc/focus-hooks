'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('editableDropdown', function () {
    return {
        restrict:'E',
        replace:true,
        templateUrl:"directive/editable-dropdown-template.html",
        scope:{
            items:'=items',
            additionalControlClasses:"@additionalControlClasses",
            selectedItem:"=",
            inputIdValue:"@",
            dropdownIdValue:"@"
        },
        link:function (scope, element, attrs) {

            scope.$watch('items', function (newValue) {
                if (newValue && newValue.length) {
                    scope.selectedItem = newValue[0];
                } else {
                    scope.selectedItem = "No Value Provided";
                }
            });

            //Action Handlers
            scope.onClickItem = function (item) {
                scope.selectedItem = item;
            };

            //Initialization
            if (!scope.additionalControlClasses) {
                scope.additionalControlClasses = "span2";
            }
        }
    }
}).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
    .directive('collapsibleSection', function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl:"directive/collapsible-section-template.html",
        scope: {
            id:"="
        },
        controller: function($scope) {

            $scope.toggle = function() {
                if( $scope.collapsibleItemStyle.height == '170px' )
                {
                    $scope.collapsibleItemStyle = {height: '0px'}
                }
                else
                {
                    $scope.collapsibleItemStyle = {height: '170px'}
                }
            }

            $scope.collapsibleItemStyle = {height :'0px'};

        },
        link:function (scope, element, attrs) {

        }
    }

    })
    .directive('focusGroup', function( focusManager ) {

        return {
            restrict: 'A',
            replace: true,
            scope: {
                focusGroup:"="
            },
            controller: function($scope) {

                $scope.focusGroups = [];


            },
            link:function (scope, element, attrs, controller) {
                console.log("focus group: " + scope.focusGroup);
                console.log("id: " + attrs.id);

                if( focusManager.hasGroup(scope.focusGroup) ) {
                    focusManager.addItemToGroup( scope.focusGroup, element );
                }
                else
                {
                    focusManager.addGroup( scope.focusGroup );
                    focusManager.addItemToGroup( scope.focusGroup, element );
                }

                var focusListener = function() {
                    console.log("focus listener");
                    focusManager.setFocusForGroup(scope.focusGroup, element);
                }

                var focusOutListener = function() {
                    element.removeClass('focused');
                }

                element.focusin(focusListener);
                element.focusout(focusOutListener);

            }
        }

    })
    .directive('focusGroupManager', function( focusManager ) {

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                managedGroup:"="
            },
            link:function (scope, element, attrs) {

                var keyListener = function(){


                    var code;
                    var isShift = event.shiftKey ? true : false;

                    if (event.which) {
                        code = event.which;
                    }

                    if( focusManager.isGroupActive(scope.managedGroup) )
                    {
                        if( code == 37 ) {//&& isShift ) {
                            focusManager.reverseFocus(scope.managedGroup);
                            event.preventDefault();
                        }
                        else if( code == 39 ) {
                            focusManager.forwardFocus(scope.managedGroup);
                            event.preventDefault();
                        }
                        else if( code == 40 ) {
                            //down arrow
                            focusManager.activateNextGroup();
                        }
                        else if ( code == 38 ) {
                            //up arrow
                            focusManager.activatePreviousGroup();
                        }
                    }

                    if( code == 39 || code == 40 || code == 38 || code == 37) {
                        event.preventDefault();
                    }

                }

                $(document).keydown(keyListener);


            }
        }

    });;