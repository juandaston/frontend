import { routes } from './layout.routes';

import { RootDirective } from './components/root/root.directive';
import { NavbarDirective } from './components/navbar/navbar.directive';
import { SidebarDirective } from './components/sidebar/sidebar.directive';
import { LoginDirective } from "./components/login/login.directive";

export default angular.module('consultorio.layout', [])
  .config(routes)
  .directive('login', LoginDirective)
  .directive('consultorioRoot', RootDirective)
  .directive('consultorioNavbar', NavbarDirective)
  .directive('consultorioSidebar', SidebarDirective);
