'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');

      angular.scenario.dsl('$', function() {
          return function(selector, label) {
              this.dsl.using(selector, label);
              return this.addFutureAction("$('" + this.label + "')", function($window, $document, done) {
                  try {
                      done(null, $document.elements());
                  } catch (e) {
                      done(null, null);
                  }
              });
          };
      });

      angular.scenario.matcher('toHaveClass', function(expected) {
          return this.actual && this.actual.hasClass(expected);
      });
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser().navigateTo('#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 1/);
    });

    iit('should have an invisible item', function() {
//        expect(element('#invisibleStuff').text()).toMatch(/This is an invisible item/);
//
//        expect(element('#invisibleStuff').css('display')).toMatch('none');
//        expect(element('#visibleStuff').css('display')).toMatch('inline');
//        expect(element('[ng-view] p:first').css('display')).toMatch('');

        expect(element('#invisibleStuff.active').count()).toBe(1);

        expect(element('#invisibleStuff').attr('checked').not().to)
    })

  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});
