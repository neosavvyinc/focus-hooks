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

function MyCtrl3( $rootScope, $scope ) {

    var ids = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15'
    ];

    var currentFocusElemIndex = 0;




    var tabListener = function tabListener(event) {
        var code;
        var isShift = event.shiftKey ? true : false;

        if (event.which) {
            code = event.which;
        }

        if (code == 9 && isShift) {
            var currElem = $('#' + ids[currentFocusElemIndex]);
            if( currElem && currElem.hasClass('focused') )
            {
                currElem.removeClass('focused');
            }

            currentFocusElemIndex--;
            if( currentFocusElemIndex < 0 )
            {
                currentFocusElemIndex = ids.length - 1;
            }

            var nextElem = $('#' + ids[currentFocusElemIndex]);
            if( nextElem )
            {
                nextElem.addClass('focused');
            }

            event.preventDefault();
        }
        else if (code == 9) {
            var currElem = $('#' + ids[currentFocusElemIndex]);
            if( currElem && currElem.hasClass('focused') )
            {
                currElem.removeClass('focused');
            }

            currentFocusElemIndex++;
            if( currentFocusElemIndex > ids.length )
            {
                currentFocusElemIndex = 0;
            }

            var nextElem = $('#' + ids[currentFocusElemIndex]);
            if( nextElem )
            {
                nextElem.addClass('focused');
            }

            event.preventDefault();
        }

    }


    $rootScope.$on('$routeChangeStart', function(event, next, current){

        if( current.templateUrl == 'partials/partial3.html' && next.templateUrl != 'partials/partial3.html' ) {
            console.log('navigating away so getting rid of focus handler');
            $(document).unbind('keydown');
        }
        else if( next.templateUrl == 'partials/partial3.html' ) {
            console.log('navigating and add custom focus handler');
            $(document).keydown(tabListener);
        }
        else {
            $(document).keydown(tabListener);
        }
        currentFocusElemIndex = 0;


    })


    var addClickFocusListenersToIds = function() {
        var i = 0,
            maxLength = ids.length;

        for ( i ; i < maxLength ; i++ )
        {
            $("#"+ids[i]).addEventListener("click", function(){
                clearFocus()

            })
        }
    }

    $(document).keydown(tabListener);


}
MyCtrl3.$inject = ['$rootScope', '$scope'];


function MyCtrl4($scope) {

    $scope.items = [ 1, 2, 3, 4, 5, 6, 7];

}
MyCtrl4.$inject = ['$scope'];


