export function ClickAndResumeDirective(): angular.IDirective {
  return {
    restrict: 'A',
    scope: {
      clickAndResume: '&'
    },
    link: ClickAndResumeLink
  };
};

/** @ngInject */
export function ClickAndResumeLink($scope,element, attrs) {
  element.bind('click', function() {
    element.prop('disabled',true);
    $scope.clickAndResume().finally(function() {
      element.prop('disabled',false);
    })
  });
}
