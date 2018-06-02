/** @ngInject */
export function MensajeFilter($filter) {
	return function(array, search, change) {		
		return $filter('filter')(array, search, true).map(function(obj) {
			return angular.extend(obj, change);
		});
	}
}
		