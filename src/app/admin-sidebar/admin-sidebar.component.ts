import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  show = true;
  name: string;

  closeSidebar() {
    this.show = !this.show;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

}
