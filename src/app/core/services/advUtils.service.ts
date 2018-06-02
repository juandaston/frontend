export class AdvUtils {

	/** @ngInject */
	constructor() {
	}

	public isNull (object: any): boolean {
		if (angular.equals(object, "") || angular.equals(object, null) || angular.equals(object, undefined)) {
			return true;
		}
		return false;
	}

  public isEmpty(obj) {
    return (angular.equals('', obj) || angular.equals({}, obj) || angular.equals([], obj) || angular.equals(undefined, obj) || this.isNull(obj) );
  };

  public safeTrim (object: string): string {
    if (angular.equals(object, "") || angular.equals(object, null) || angular.equals(object, undefined)) {
      return "";
    } else {
      return object.trim();
    }
  }

}
