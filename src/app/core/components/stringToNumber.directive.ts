export function StringToNumberDirective(): any {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      //noinspection TypeScriptUnresolvedVariable
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });

      //noinspection TypeScriptUnresolvedVariable
      ngModel.$formatters.push(function(value) {
        return parseInt(value, 10);
      });
    }
  };
};
