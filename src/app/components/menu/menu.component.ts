import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: MenuItem[] = [
    { label: 'Home', routerLink: '/', icon: 'pi pi-fw pi-th-large' },
    { label: 'Banco', routerLink: '/banco', icon: 'pi pi-fw pi-home' },
  ];

  constructor() { }
}
