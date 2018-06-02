export interface NavBarItem {
  id: number;
  label: string;
  sref: string;
  roles: string[];
  sideBarItems: SideBarItem[];
}

export interface SideBarItem {
  label: string;
  sref: string;1
  roles: string[];
}
