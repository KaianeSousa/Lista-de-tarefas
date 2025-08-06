import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class SidebarComponent {
  menuItems = [
    { label: 'Tarefas', active: true },
    { label: 'Dashboard', active: false },
    { label: 'Sair', active: false }
  ];

  sidebarVisible = false; 
  
  onMenuItemClick(item: any) {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;

    if (window.innerWidth <= 768) {
      this.sidebarVisible = false;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
