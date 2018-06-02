export function SidebarDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      showSidebar:'=show',
      ready: '&onReady'
    },
    templateUrl: 'app/layout/components/sidebar/sidebar.html',
    controller: SidebarController,
    controllerAs: 'vm',
    bindToController: true,
    priority: 100
  };
};

/** @ngInject */
export function SidebarController($scope, $timeout, $filter) {
  var vm = this;
  vm.showSidebar = false;
  $scope.$on('UPDATE_SIDEBAR_CHILD', function(event, navBarItem) {
    vm.sidebarItems = angular.isDefined(navBarItem.sideBar) ? navBarItem.sideBar : [];
    vm.sidebarItems = $filter('orderBy')(vm.sidebarItems, 'prioridad');
    vm.showSidebar = (vm.sidebarItems.length > 0);
  });

  vm.ready();
}
