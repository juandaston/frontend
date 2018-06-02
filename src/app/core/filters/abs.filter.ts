/** @ngInject */
export function AbsFilter() {

	return function(val) {
		return Math.abs(val);
	}
	
}